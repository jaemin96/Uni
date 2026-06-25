import type { ScannedItem } from "./scan";

export type CleanResult = {
  path: string;
  success: boolean;
  error?: string;
};

export type DeleteProgress = {
  current: string;
  done: number;
  total: number;
};

export async function deleteItems(
  items: ScannedItem[],
  onProgress?: (progress: DeleteProgress) => void
): Promise<CleanResult[]> {
  const results: CleanResult[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    onProgress?.({ current: item.path, done: i, total: items.length });
    try {
      await item.parentHandle.removeEntry(item.name, { recursive: true });
      results.push({ path: item.path, success: true });
    } catch (err) {
      results.push({
        path: item.path,
        success: false,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return results;
}
