import { BunsetusOptions } from "./types.ts";
import { TinySegmenter } from "./deps.ts";
import { hasJapanese, vimoption2ts } from "./utils.ts";

//TODO: implement kuromoji
export class Tokenizer {
  options: BunsetusOptions;
  constructor(options: BunsetusOptions) {
    this.options = options;
  }

  async tokenize(text: string, isKeyword: string): Promise<string[]> {
    const ik = vimoption2ts(isKeyword);
    const isKeywordRegexp = new RegExp(
      `([${ik}]+|[^${ik}]+)`,
      "g",
    );

    const segs = (
      await Promise.all(
        text
          .split(/[\s　]+/)
          .map((text) =>
            hasJapanese(text)
              ? this._tokenize(text)
              : (text.match(isKeywordRegexp) ?? "")
          ),
      )
    )
      .flat()
      .filter((e) => !!e.trim().length);
    return segs;
  }

  async _tokenize(text: string): Promise<string[]> {
    if (this.options.segmenter === "tinysegmenter") {
      return await Promise.resolve(TinySegmenter.segment(text));
    } else {
      return [];
    }
  }
}
