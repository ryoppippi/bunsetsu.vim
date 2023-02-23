export type { Denops } from "https://deno.land/x/denops_std@v4.0.0/mod.ts";
export * as fn from "https://deno.land/x/denops_std@v4.0.0/function/mod.ts";
export * as op from "https://deno.land/x/denops_std@v4.0.0/option/mod.ts";
export * as helper from "https://deno.land/x/denops_std@v4.0.0/helper/mod.ts";
export * as un from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
export {
  assertEquals,
  equal,
} from "https://deno.land/std@0.173.0/testing/asserts.ts";

// TinySegmenter
export { TinySegmenter } from "https://cdn.jsdelivr.net/gh/code4fukui/TinySegmenter/TinySegmenter.js";

// kuromoji
export type { Tokenizer as KuromojiTokenizer } from "https://esm.sh/kuromojin@3.0.0";
export { tokenize } from "https://esm.sh/kuromojin@3.0.0";
import kuromoji from "https://esm.sh/kuromoji@0.1.2";
