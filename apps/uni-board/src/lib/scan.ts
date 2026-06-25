import { ignoreDirs, targetDirs } from "../config";

export type ScannedItem = {
  name: string;
  path: string;
  parentHandle: FileSystemDirectoryHandle;
};

export async function scanDirectory(
  dir: FileSystemDirectoryHandle,
  currentPath = ""
): Promise<ScannedItem[]> {
  const results: ScannedItem[] = [];

  for await (const [name, handle] of dir.entries()) {
    if (handle.kind !== "directory") continue;
    if (ignoreDirs.includes(name)) continue;

    const itemPath = currentPath ? `${currentPath}/${name}` : name;

    if (targetDirs.includes(name)) {
      results.push({ name, path: itemPath, parentHandle: dir });
      // prune — 내부 재귀 안 함
    } else {
      const nested = await scanDirectory(handle as FileSystemDirectoryHandle, itemPath);
      results.push(...nested);
    }
  }

  return results;
}

export function checkApiSupport(): boolean {
  return "showDirectoryPicker" in window;
}
