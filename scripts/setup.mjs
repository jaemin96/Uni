// node scripts/setup.mjs
import { existsSync, copyFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const copyEnv = (dir) => {
  const example = join(dir, ".env.example");
  const target = join(dir, ".env");
  if (existsSync(example) && !existsSync(target)) {
    copyFileSync(example, target);
    console.log(`✓ Created ${target}`);
  } else if (existsSync(target)) {
    console.log(`- Skipped ${target} (already exists)`);
  }
};

// 루트
copyEnv(".");

// apps/*
const appsDir = "apps";
if (existsSync(appsDir)) {
  for (const name of readdirSync(appsDir)) {
    const full = join(appsDir, name);
    if (statSync(full).isDirectory()) copyEnv(full);
  }
}

console.log("\n📝 Edit .env files with your secrets, then run: pnpm infra:up");
