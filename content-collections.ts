import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { remarkCodeMeta } from "./src/lib/remark-code-meta";

const posts = defineCollection({
    name: "posts",
    directory: "content",
    // "*.mdx"(非再帰)にして、content/projects配下のプロジェクト記事を
    // このブログ用collectionのschemaで検証してしまわないようにする
    include: "*.mdx",
    schema: z.object({
        title: z.string(),
        publishedAt: z.string(),
        updatedAt: z.string().optional(),
        author: z.string().optional(),
        summary: z.string(),
        image: z.string().optional(),
        content: z.string(),
    }),
    transform: async (document, context) => {
        const mdx = await compileMDX(context, document, {
            remarkPlugins: [remarkGfm, remarkCodeMeta],
        });
        return {
        ...document,
            mdx,
        };
    },
});

// プロジェクトの開発背景などを綴る記事はMDXをやめ、src/app/projects/<slug>/ の
// 素のNextページとして書いている（resume.tsx の projects[].detailHref から遷移する）。

export default defineConfig({
    collections: [posts],
});

