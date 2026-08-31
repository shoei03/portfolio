"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SECTIONS, type SectionId } from "../sections";

/**
 * このページの目次。スタンプラリーのアプリなので、記事そのものを3x3のスタンプ
 * カードに見立てて「読み進めるとマスが押される」ようにしている。
 *
 * 押したスタンプは戻さない(上へスクロールしても消えない)。集めたものが消えるのは
 * スタンプラリーとして不自然なため。現在地だけはリングで別に示す。
 */
export function StampRail() {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const [stamped, setStamped] = useState<ReadonlySet<string>>(new Set());

  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    if (nodes.length === 0) return;

    // 画面の上寄り3割〜下寄り4割を除いた帯に入っているものを「読んでいる節」とみなす
    const visible = new Set<HTMLElement>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) visible.add(el);
          else visible.delete(el);
        }
        if (visible.size === 0) return;

        // 帯に複数入っている場合は一番上のものを現在地にする
        const top = Array.from(visible).sort(
          (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
        )[0];
        const id = top.dataset.section as SectionId;

        setActiveId(id);
        setStamped((prev) => {
          if (prev.has(id)) return prev;
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const active = SECTIONS.find((s) => s.id === activeId);

  return (
    <nav aria-label="このページの目次">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Stamp card
      </p>

      <ol className="mt-3 grid grid-cols-3 gap-2 rounded-xl border border-border bg-card p-3">
        {SECTIONS.map((section) => {
          const isStamped = stamped.has(section.id);
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-label={`${section.no} ${section.label}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative grid aspect-square w-full place-items-center rounded-full",
                  "border border-dashed border-border text-muted-foreground/50",
                  "transition-colors hover:border-solid hover:text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  isActive && "ring-2 ring-stamp/30 ring-offset-2 ring-offset-card"
                )}
              >
                {/* 未到達のマスに薄く出す番号。押されるとインク面の下に隠れる */}
                <span className="font-mono text-[10px] tabular-nums">
                  {section.no}
                </span>

                {/* 押印面。透明→不透明、大きめ&傾き強めから定位置へ落として「押した」感を出す */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 grid place-items-center rounded-full",
                    "border-2 border-stamp bg-stamp/10 text-stamp",
                    "text-[13px] font-semibold leading-none",
                    // reduced motionでは押印を動かさず、その場に現れるだけにする
                    // (傾きは動きではなく判子の見た目なので残す)
                    "transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none",
                    isStamped
                      ? "-rotate-3 scale-100 opacity-100"
                      : "-rotate-12 scale-125 opacity-0"
                  )}
                >
                  {section.kanji}
                </span>
              </a>
            </li>
          );
        })}
      </ol>

      <p className="mt-3 min-h-9 font-mono text-xs leading-snug text-foreground">
        {active ? (
          <>
            <span className="text-stamp tabular-nums">{active.no}</span>{" "}
            {active.label}
          </>
        ) : (
          <span className="text-muted-foreground">読み始めるとスタンプが押されます</span>
        )}
      </p>
      <p className="font-mono text-[10px] tabular-nums text-muted-foreground">
        {String(stamped.size).padStart(2, "0")} /{" "}
        {String(SECTIONS.length).padStart(2, "0")}
      </p>
    </nav>
  );
}
