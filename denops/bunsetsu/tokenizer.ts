import type { BunsetusOptions } from "./types.ts";
import { TinySegmenter } from "./deps.ts";

//TODO: implement kuromoji
export class Tokenizer {
  options: BunsetusOptions;
  constructor(options: BunsetusOptions = { segmenter: "tinysegmenter" }) {
    this.options = options;
  }

  async tokenize(text: string): Promise<string[]> {
    if (this.options.segmenter === "tinysegmenter") {
      return await Promise.resolve(TinySegmenter.segment(text));
    } else {
      return [];
    }
  }
}
