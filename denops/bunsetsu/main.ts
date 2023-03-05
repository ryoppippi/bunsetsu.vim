import type { Denops } from "./deps.ts";
import { BunsetusOptions } from "./types.ts";
import { Tokenizer } from "./tokenizer.ts";
import { fn, op, un } from "./deps.ts";

const tokenize = async (
  text: unknown,
  isKeyword: unknown = "",
  options: unknown = {},
) => {
  un.assertString(text);
  un.assertString(isKeyword);
  const tokenizer = new Tokenizer(BunsetusOptions.parse(options));
  const segs = await tokenizer.tokenize(text, isKeyword);
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
