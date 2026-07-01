// 빌드·캐시 산출물 (디렉토리)
export const targetDirs = [
  "node_modules",
  "dist",
  "build",
  "out",
  ".next",
  ".turbo",
  ".cache",
  ".vite",
  ".parcel-cache",
  "coverage",
];

// 모든 스캔에서 재귀 탐색을 건너뛸 디렉토리
// (내부 파일이 많지만 삭제 대상이 없는 것들 — 탐색 시간 단축)
export const ignoreDirs = [
  // VCS
  ".git",
  ".svn",
  ".hg",
  // 빌드 산출물 (build scan 대상이지만 내부 재귀는 불필요)
  "node_modules",
  "dist",
  "build",
  "out",
  ".next",
  ".turbo",
  ".cache",
  ".vite",
  ".parcel-cache",
  "coverage",
  // IDE / 툴
  ".idea",
  ".vscode",
  // 앱 전용
  ".clean-logs",
  "public",
];

// Mac 메타파일 — 디렉토리
export const macTargetDirs = ["__MACOSX", ".Spotlight-V100", ".fseventsd", ".Trashes"];

// Mac 메타파일 — 파일 이름 (exact)
export const macTargetFiles = [".DS_Store", ".localized"];

// Mac 메타파일 — 파일 prefix (._로 시작하는 것들)
export const macTargetPrefixes = ["._"];
