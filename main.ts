// The Agent's Uh-Oh — one word an agent says when it has no idea what to do.
//
// The entry is a single word, written exactly (no trailing newline) to
// /output/entry.txt, or to $MAKEFUN_OUTPUT_DIR/entry.txt when set.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "recalculating";

// The word an agent blurts out when it is lost: a GPS recalculating its
// route mid-journey. It is a genuine one-word reaction to not knowing what
// to do, it lands instantly, and it is fresher than the obvious "uh-oh".

// The gate refuses anything that is not 1-99 characters of non-blank text,
// so validate the word before writing it and fail loudly instead of
// shipping an entry the scorer would mark invalid.
function validate(word: string): void {
  if (word.length < 1 || word.length > 99) {
    throw new Error(`entry must be 1-99 characters, got ${word.length}`);
  }
  if (word.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word with no whitespace");
  }
}

function main(): void {
  validate(WORD);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), WORD, "utf8");
}

main();
