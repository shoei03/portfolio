import { allProjectPosts } from "content-collections";
import { DATA } from "@/data/resume";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@content-collections/mdx/react";
import { mdxComponents } from "@/mdx-components";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, ArrowUpRight } from "lucide-react";

function getSlugFromPath(path: string) {
  return path.replace(/\.mdx$/, "");
}

function findProjectData(slug: string) {
  return DATA.projects.find((p) => "slug" in p && p.slug === slug);
}

export async function generateStaticParams() {
  return allProjectPosts.map((post) => ({
    slug: getSlugFromPath(post._meta.path),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  const post = allProjectPosts.find(
    (p) => getSlugFromPath(p._meta.path) === slug
  );

  if (!post) {
    return undefined;
  }

  const projectData = findProjectData(slug);
  const { title, summary: description } = post;
  const image = projectData?.image || undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${DATA.url}/projects/${slug}`,
      images: image ? [{ url: `${DATA.url}${image}` }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [`${DATA.url}${image}`] : undefined,
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const post = allProjectPosts.find(
    (p) => getSlugFromPath(p._meta.path) === slug
  );

  if (!post) {
    notFound();
  }

  const projectData = findProjectData(slug);

  const jsonLdContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    headline: post.title,
    description: post.summary,
    url: `${DATA.url}/projects/${slug}`,
    author: {
      "@type": "Person",
      name: DATA.name,
    },
  }).replace(/</g, "\\u003c");

  return (
    // PC画面では横幅を活かせるよう、他ページ(max-w-2xl)より広めにとる
    <section id="project-detail" className="max-w-5xl mx-auto w-full">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: jsonLdContent,
        }}
      />
      <div className="flex justify-start gap-4 items-center">
        <Link
          href="/#projects"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-lg px-2 py-1 inline-flex items-center gap-1 mb-6 group"
          aria-label="Back to Projects"
        >
          <ChevronLeft className="size-3 group-hover:-translate-x-px transition-transform" />
          Back to Projects
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="title font-semibold text-3xl md:text-4xl tracking-tighter leading-tight">
          {post.title}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {post.summary}
        </p>
        {projectData && (
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm text-muted-foreground">
              {projectData.dates}
            </p>
            {projectData.href && (
              <Link
                href={projectData.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                Visit site
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            )}
            {projectData.links?.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs"
                  variant="outline"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
        {projectData && projectData.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {projectData.technologies.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      <div className="my-6 flex w-full items-center">
        <div
          className="flex-1 h-px bg-border"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
          }}
        />
      </div>
      <article className="article-grid prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
        <MDXContent code={post.mdx} components={mdxComponents} />
      </article>
    </section>
  );
}
