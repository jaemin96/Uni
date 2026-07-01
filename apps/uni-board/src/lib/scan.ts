import {
  ignoreDirs,
  macTargetDirs,
  macTargetFiles,
  macTargetPrefixes,
  targetDirs,
} from "../config";

export type ScannedItem = {
  name: string;
  path: string;
  kind: "file" | "directory";
  parentHandle: FileSystemDirectoryHandle;
};

export type ScanMode = "build" | "mac";

// ── Build cache scan (디렉토리만) ─────────────────────────────────────────────
export async function scanDirectory(
  dir: FileSystemDirectoryHandle,
  currentPath = "",
  onProgress?: (path: string) => void
): Promise<ScannedItem[]> {
  const results: ScannedItem[] = [];

  for await (const [name, handle] of dir.entries()) {
    if (handle.kind !== "directory") continue;

    const itemPath = currentPath ? `${currentPath}/${name}` : name;
    onProgress?.(itemPath);

    if (targetDirs.includes(name)) {
      // 대상 발견 — 내부 재귀 없이 바로 수집
      results.push({ name, path: itemPath, kind: "directory", parentHandle: dir });
    } else if (!ignoreDirs.includes(name)) {
      // 일반 폴더만 재귀
      const nested = await scanDirectory(
        handle as FileSystemDirectoryHandle,
        itemPath,
        onProgress
      );
      results.push(...nested);
    }
    // ignoreDirs는 그냥 skip
  }

  return results;
}

// ── Mac junk scan (파일 + 디렉토리) ──────────────────────────────────────────
export async function scanMacJunk(
  dir: FileSystemDirectoryHandle,
  currentPath = "",
  onProgress?: (path: string) => void
): Promise<ScannedItem[]> {
  const results: ScannedItem[] = [];

  for await (const [name, handle] of dir.entries()) {
    const itemPath = currentPath ? `${currentPath}/${name}` : name;

    if (handle.kind === "directory") {
      onProgress?.(itemPath);
      if (macTargetDirs.includes(name)) {
        // Mac 전용 디렉토리 — 통째로 수집
        results.push({ name, path: itemPath, kind: "directory", parentHandle: dir });
      } else if (!ignoreDirs.includes(name)) {
        // 일반 폴더만 재귀
        const nested = await scanMacJunk(
          handle as FileSystemDirectoryHandle,
          itemPath,
          onProgress
        );
        results.push(...nested);
      }
      // ignoreDirs는 skip
    } else {
      const isMacFile =
        macTargetFiles.includes(name) || macTargetPrefixes.some((p) => name.startsWith(p));
      if (isMacFile) {
        results.push({ name, path: itemPath, kind: "file", parentHandle: dir });
      }
    }
  }

  return results;
}

export function checkApiSupport(): boolean {
  return "showDirectoryPicker" in window;
}
