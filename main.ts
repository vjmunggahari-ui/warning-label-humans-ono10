import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a safety warning label that should come printed on every human.
const LINE =
  "CAUTION: Contents will say 'I'm fine' while visibly falling apart. Do not attempt repairs.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR || join(process.cwd(), "output");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "entry.txt");
writeFileSync(out, LINE);

// Self-check: read back and verify byte-identical, no trailing newline,
// within the 1-160 character gate, single line, and the label form holds
// (CAUTION:/WARNING: prefix, turn in the last few words).
const back = readFileSync(out, "utf8");
if (back !== LINE) throw new Error("read-back mismatch");
if (back.length < 1 || back.length > 160)
  throw new Error("length out of gate range");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (back.includes("\n")) throw new Error("multi-line entry");
if (!/^(CAUTION|WARNING): /.test(back)) throw new Error("not a label");
if (!back.endsWith("repairs.")) throw new Error("turn not at end");
console.log(`wrote entry.txt (${back.length} chars)`);
