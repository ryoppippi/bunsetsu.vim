import { BunsetusOptions } from "./types.ts";
import { tokenize as tinyTokenize } from "./tinysegmenter.ts";
import { tokenize as kuromojiTokenize } from "./kuromoji.ts";
import { hasJapanese, vimoption2ts } from "./utils.ts";

//TODO: implement kuromoji
export class Tokenizer {
  options: BunsetusOptions;
  constructor(options: BunsetusOptions) {
    this.options = options;
  }

  async tokenize(text: string, isKeyword: string) {
    const ik = vimoption2ts(isKeyword);
    const isKeywordRegexp = new RegExp(`([${ik}]+|[^${ik}]+)`, "g");

    const segs = (
      await Promise.all(
        text
          .split(/([\s　]+)/)
          .map((text) =>
            hasJapanese(text)
              ? this.getTokenized(text)
              : text.match(isKeywordRegexp) ?? ""
          )
          .flat(),
      )
    ).filter((e) => e !== "")
      .flat();
    return segs;
  }

  async getTokenized(text: string): Promise<string[]> {
    if (this.options.segmenter === "tinysegmenter") {
      return await tinyTokenize(text);
    }
    if (this.options.segmenter === "kuromoji") {
      return await kuromojiTokenize(text);
    }
    return [];
  }
}
