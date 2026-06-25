import type { CleanResult } from "./clean";

export async function writeLog(
  root: FileSystemDirectoryHandle,
  results: CleanResult[]
): Promise<void> {
  const logsDir = await root.getDirectoryHandle(".clean-logs", { create: true });

  // .gitignore 생성 (없으면)
  try {
    await logsDir.getFileHandle(".gitignore");
  } catch {
    const gitignoreHandle = await logsDir.getFileHandle(".gitignore", { create: true });
    const writable = await gitignoreHandle.createWritable();
    await writable.write("*\n");
    await writable.close();
  }

  // history.log append
  const logHandle = await logsDir.getFileHandle("history.log", { create: true });

  let existing = "";
  try {
    const file = await logHandle.getFile();
    existing = await file.text();
  } catch {
    // 빈 파일
  }

  const timestamp = new Date().toISOString();
  const header = `\n=== ${timestamp} ===\n`;
  const lines = results
    .map((r) => `${r.success ? "[OK]" : "[FAIL]"} ${r.path}${r.error ? ` — ${r.error}` : ""}`)
    .join("\n");

  const writable = await logHandle.createWritable();
  await writable.write(`${existing}${header}${lines}\n`);
  await writable.close();
}

export async function downloadLog(root: FileSystemDirectoryHandle): Promise<void> {
  const logsDir = await root.getDirectoryHandle(".clean-logs");
  const logHandle = await logsDir.getFileHandle("history.log");
  const file = await logHandle.getFile();
  const text = await file.text();

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "history.log";
  a.click();
  URL.revokeObjectURL(url);
}
