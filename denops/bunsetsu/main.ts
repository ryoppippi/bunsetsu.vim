import type { Denops } from "./deps.ts";
import { BunsetusOptions } from "./types.ts";
import { Tokenizer } from "./tokenizer.ts";
import { fn, op, un } from "./deps.ts";

const getIsKeyword = async (denops: Denops): Promise<string> =>
  await op.iskeyword.getLocal(denops);

const tokenize = async (
  text: unknown,
  isKeyword: unknown = "",
  options: unknown = {},
): Promise<string[]> => {
  const tokenizer = new Tokenizer(BunsetusOptions.parse(options));
  un.assertString(text);
  un.assertString(isKeyword);
  const segs = await tokenizer.tokenize(text, isKeyword);
  return segs;
};

const bunsetsu = async (
  denops: Denops,
  options: unknown = {},
): Promise<string[]> => {
  const isKeyword = await getIsKeyword(denops);
  const line = await fn.getline(denops, ".");
  const segs = await tokenize(line, isKeyword);
  return segs;
};

export function main(denops: Denops) {
  denops.dispatcher = {
    async tokenize(
      text: unknown,
      isKeyword: unknown = "",
      options: unknown = {},
    ): Promise<string[]> {
      un.ensureString(text);
      un.ensureString(isKeyword);
      return await tokenize(text, isKeyword, options);
    },
  };
}
