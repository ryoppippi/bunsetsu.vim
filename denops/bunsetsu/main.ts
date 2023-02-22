import type { Denops } from "./deps.ts";
import { fn, helper, op, TinySegmenter, vars } from "./deps.ts";
import { vimoption2ts } from "./utils.ts";

export async function main(denops: Denops): Promise<void> {
  denops.dispatcher = {
    async bunkatsu(): Promise<string[]> {
      const isKeyword = await getIsKeyword(denops);
      const isKeywordRegexp = new RegExp(
        `([${isKeyword}]+|[^${isKeyword}]+)`,
        "g",
      );
      const line = await fn.getline(denops, ".");
      const segs = line
        .split(/[\s　]+/)
        .map((text) =>
          hasJapanese(text)
            ? TinySegmenter.segment(text)
            : (text.match(isKeywordRegexp) ?? "")
        )
        .flat()
        .filter((e) => !!e.trim().length);
      return segs;
    },
  };

  await helper.execute(
    denops,
    `command! -nargs=0 Bunsetsu echomsg denops#request('${denops.name}', 'bunkatsu', [] )`,
  );
}

// according to ChatGPT
const hasJapanese = (text: string) => /[^\u0000-\u007F]/.test(text);

const getIsKeyword = async (denops: Denops) => {
  const iskeyword = await op.iskeyword.getLocal(denops);
  if (!iskeyword) return "";
  return vimoption2ts(iskeyword);
};
