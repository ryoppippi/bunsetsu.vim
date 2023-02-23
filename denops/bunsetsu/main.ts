import type { Denops } from "./deps.ts";
// import type { BunsetusOptions } from "./types.ts";
import { Tokenizer } from "./tokenizer.ts";
import { fn, op, un } from "./deps.ts";
import { hasJapanese, vimoption2ts } from "./utils.ts";

export function main(denops: Denops): void {
  denops.dispatcher = {
    async bunkatsu(options: unknown = {}): Promise<string[]> {
      const tokenizer = new Tokenizer();
      const isKeyword = vimoption2ts(await op.iskeyword.getLocal(denops));
      const isKeywordRegexp = new RegExp(
        `([${isKeyword}]+|[^${isKeyword}]+)`,
        "g",
      );
      const line = await fn.getline(denops, ".");
      un.assertString(line);
      const segs = (
        await Promise.all(
          line
            .split(/[\s　]+/)
            .map((text) =>
              hasJapanese(text)
                ? tokenizer.tokenize(text)
                : (text.match(isKeywordRegexp) ?? "")
            ),
        )
      )
        .flat()
        .filter((e) => !!e.trim().length);
      return segs;
    },
  };
}

const getIsKeyword = async (denops: Denops) => {
  const iskeyword = await op.iskeyword.getLocal(denops);
  if (!iskeyword) return "";
  return vimoption2ts(iskeyword);
};
