import { TinySegmenter } from "./deps.ts";
export async function tokenize(text: string): Promise<string[]> {
  return await Promise.resolve(TinySegmenter.segment(text));
}
