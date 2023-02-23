import { z } from "https://deno.land/x/zod@v3.16.1/mod.ts";

export const BunsetusOptions = z.object({
  segmenter: z.union([z.literal("tinysegmenter"), z.literal("kuromoji")])
    .default("tinysegmenter"),
  onlySegmentJapanese: z.boolean().default(true),
});

export type BunsetusOptions = z.infer<typeof BunsetusOptions>;
