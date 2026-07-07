import { Apple, Download, FolderOpen, HardDrive, Trash2 } from "lucide-react";
import { useState } from "react";
import { type CleanResult, type DeleteProgress, deleteItems } from "../lib/clean";
import { cn } from "../lib/cn";
import { downloadLog, writeLog } from "../lib/log";
import { type ScannedItem, checkApiSupport, scanDirectory, scanMacJunk } from "../lib/scan";
import { AlertDialog } from "./ui/AlertDialog";
import { Button } from "./ui/Button";
import { Checkbox } from "./ui/Checkbox";

type Phase = "idle" | "scanning" | "list" | "deleting" | "done";
type InnerTab = "build" | "mac";

function groupByProject(items: ScannedItem[]): Map<string, ScannedItem[]> {
  const map = new Map<string, ScannedItem[]>();
  for (const item of items) {
    const parts = item.path.split("/");
    const project = parts.length > 1 ? parts[0] : "(root)";
    const list = map.get(project) ?? [];
    list.push(item);
    map.set(project, list);
  }
  return map;
}

const innerTabs: { id: InnerTab; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    id: "build",
    label: "Build Cache",
    icon: <HardDrive size={14} />,
    desc: "node_modules, dist, .next 등 빌드·캐시 산출물 삭제",
  },
  {
    id: "mac",
    label: "Mac Junk",
    icon: <Apple size={14} />,
    desc: "._파일, .DS_Store, __MACOSX 등 Mac 전용 메타파일 삭제",
  },
];

export function CleanTab() {
  const [innerTab, setInnerTab] = useState<InnerTab>("build");
  const [phase, setPhase] = useState<Phase>("idle");
  const [rootHandle, setRootHandle] = useState<FileSystemDirectoryHandle | null>(null);
  const [scanned, setScanned] = useState<ScannedItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [results, setResults] = useState<CleanResult[]>([]);
  const [progress, setProgress] = useState<DeleteProgress | null>(null);
  const [scanPath, setScanPath] = useState("");
  const [scanCount, setScanCount] = useState(0);
  const [alertOpen, setAlertOpen] = useState(false);
  const [apiSupported] = useState(() => checkApiSupport());

  if (!apiSupported) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center p-12">
        <img
          src="/web_cleaner_process_flow.svg"
          alt="flow"
          className="w-full max-w-sm opacity-60"
        />
        <p className="text-[var(--text-h)] font-medium">Chrome / Edge 데스크탑에서 열어주세요.</p>
        <p className="text-sm text-[var(--text)]">
          File System Access API가 지원되지 않는 브라우저입니다.
        </p>
      </div>
    );
  }

  function resetState() {
    setPhase("idle");
    setRootHandle(null);
    setScanned([]);
    setSelected(new Set());
    setResults([]);
    setProgress(null);
  }

  function switchTab(tab: InnerTab) {
    setInnerTab(tab);
    resetState();
  }

  async function handlePickFolder() {
    try {
      const handle = await window.showDirectoryPicker({ mode: "readwrite" });
      const perm = await handle.requestPermission({ mode: "readwrite" });
      if (perm !== "granted") {
        alert("폴더 접근 권한이 거부되었습니다.");
        return;
      }

      setRootHandle(handle);
      setPhase("scanning");
      setScanned([]);
      setSelected(new Set());
      setResults([]);
      setScanPath("");
      setScanCount(0);

      const onScanProgress = (path: string) => {
        setScanPath(path);
        setScanCount((c) => c + 1);
      };

      const items =
        innerTab === "build"
          ? await scanDirectory(handle, "", onScanProgress)
          : await scanMacJunk(handle, "", onScanProgress);
      setScanned(items);
      setSelected(new Set(items.map((i) => i.path)));
      setPhase("list");
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error(err);
      }
      setPhase("idle");
    }
  }

  function toggleItem(path: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(path)) next.delete(path);
      else next.add(path);
      return next;
    });
  }

  function toggleProject(projectItems: ScannedItem[], checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      for (const item of projectItems) {
        if (checked) next.add(item.path);
        else next.delete(item.path);
      }
      return next;
    });
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(scanned.map((i) => i.path)) : new Set());
  }

  async function handleDelete() {
    if (!rootHandle) return;
    const toDelete = scanned.filter((i) => selected.has(i.path));
    setPhase("deleting");
    setProgress({ current: "", done: 0, total: toDelete.length });

    const cleanResults = await deleteItems(toDelete, (p) => setProgress(p));
    await writeLog(rootHandle, cleanResults);

    setProgress(null);
    setResults(cleanResults);
    setPhase("done");
  }

  const groups = groupByProject(scanned);
  const allChecked = selected.size === scanned.length && scanned.length > 0;
  const someChecked = selected.size > 0 && selected.size < scanned.length;
  const currentTab = innerTabs.find((t) => t.id === innerTab);

  if (!currentTab) {
    throw new Error("Invalid tab");
  }

  return (
    <div className="flex flex-col flex-1 p-8 gap-6 max-w-2xl">
      {/* 헤더 */}
      <div>
        <h2 className="text-xl font-semibold text-[var(--text-h)] mb-1">Clean</h2>
        <p className="text-sm text-[var(--text)]">폴더를 선택해 불필요한 파일을 정리합니다.</p>
      </div>

      {/* 내부 탭 */}
      <div className="flex gap-1 p-1 rounded-lg bg-[var(--code-bg)] border border-[var(--border)] w-fit">
        {innerTabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => switchTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              innerTab === tab.id
                ? "bg-[var(--bg)] text-[var(--text-h)] shadow-sm border border-[var(--border)]"
                : "text-[var(--text)] hover:text-[var(--text-h)]"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 설명 */}
      <p className="text-xs text-[var(--text)] -mt-3">{currentTab.desc}</p>

      {/* 폴더 선택 */}
      <Button
        onClick={handlePickFolder}
        disabled={phase === "scanning" || phase === "deleting"}
        className="w-fit"
      >
        <FolderOpen size={15} />
        {phase === "scanning" ? "스캔 중…" : "폴더 선택"}
      </Button>

      {/* 스캔 중 */}
      {phase === "scanning" && (
        <div className="flex flex-col gap-1.5 rounded-lg border border-[var(--border)] p-4 bg-[var(--code-bg)]">
          <div className="flex items-center justify-between text-xs text-[var(--text)]">
            <span className="font-medium animate-pulse">스캔 중…</span>
            <span>{scanCount}개 탐색</span>
          </div>
          <code className="text-xs text-[var(--text)] truncate opacity-60">{scanPath || "…"}</code>
        </div>
      )}

      {/* 삭제 진행 */}
      {phase === "deleting" && progress && (
        <div className="flex flex-col gap-2 rounded-lg border border-[var(--border)] p-4 bg-[var(--code-bg)]">
          <div className="flex items-center justify-between text-xs text-[var(--text)]">
            <span className="font-medium">삭제 중…</span>
            <span>
              {progress.done} / {progress.total}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-all duration-200"
              style={{ width: `${(progress.done / progress.total) * 100}%` }}
            />
          </div>
          <code className="text-xs text-[var(--text)] truncate">{progress.current}</code>
        </div>
      )}

      {/* 비어있음 */}
      {(phase === "list" || phase === "deleting") && scanned.length === 0 && (
        <p className="text-sm text-[var(--text)]">삭제 대상을 찾지 못했습니다.</p>
      )}

      {/* 결과 목록 */}
      {(phase === "list" || phase === "deleting") && scanned.length > 0 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer text-sm text-[var(--text)]"
              onClick={() => toggleAll(!allChecked)}
              onKeyDown={(e) => e.key === "Enter" && toggleAll(!allChecked)}
            >
              <Checkbox
                checked={allChecked ? true : someChecked ? "indeterminate" : false}
                onCheckedChange={toggleAll}
              />
              전체 선택 ({scanned.length}개 발견)
            </div>
            <Button
              variant="destructive"
              size="sm"
              disabled={selected.size === 0 || phase === "deleting"}
              onClick={() => setAlertOpen(true)}
            >
              <Trash2 size={13} />
              선택 항목 삭제 ({selected.size})
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {[...groups.entries()].map(([project, items]) => {
              const projectChecked = items.every((i) => selected.has(i.path));
              const projectPartial = items.some((i) => selected.has(i.path)) && !projectChecked;
              return (
                <div
                  key={project}
                  className="rounded-lg border border-[var(--border)] overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--code-bg)] border-b border-[var(--border)]">
                    <Checkbox
                      checked={projectChecked ? true : projectPartial ? "indeterminate" : false}
                      onCheckedChange={(c) => toggleProject(items, c)}
                    />
                    <span className="text-sm font-medium text-[var(--text-h)]">{project}</span>
                    <span className="ml-auto text-xs text-[var(--text)]">{items.length}개</span>
                  </div>
                  <ul className="divide-y divide-[var(--border)]">
                    {items.map((item) => (
                      <li key={item.path} className="flex items-center gap-2 px-4 py-2">
                        <Checkbox
                          checked={selected.has(item.path)}
                          onCheckedChange={() => toggleItem(item.path)}
                        />
                        <code className="text-xs text-[var(--text-h)] flex-1">{item.path}</code>
                        {item.kind === "file" && (
                          <span className="text-[10px] text-[var(--text)] opacity-50 shrink-0">
                            file
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 결과 패널 */}
      {phase === "done" && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-[var(--text-h)]">삭제 결과</h3>
            {rootHandle && (
              <Button variant="ghost" size="sm" onClick={() => downloadLog(rootHandle)}>
                <Download size={13} />
                로그 다운로드
              </Button>
            )}
          </div>
          <ul className="flex flex-col gap-1">
            {results.map((r) => (
              <li key={r.path} className="flex items-start gap-2 text-xs">
                <span className={r.success ? "text-green-500" : "text-red-500"}>
                  {r.success ? "✓" : "✗"}
                </span>
                <code className="text-[var(--text-h)]">{r.path}</code>
                {r.error && <span className="text-red-400">— {r.error}</span>}
              </li>
            ))}
          </ul>
          <Button
            variant="outline"
            size="sm"
            className="w-fit mt-2"
            onClick={() => setPhase("idle")}
          >
            다시 시작
          </Button>
        </div>
      )}

      <AlertDialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="선택한 항목을 삭제할까요?"
        description={`${selected.size}개 항목이 영구 삭제됩니다. 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        onConfirm={handleDelete}
      />
    </div>
  );
}
