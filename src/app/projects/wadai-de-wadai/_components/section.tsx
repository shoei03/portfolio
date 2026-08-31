import type { ReactNode } from "react";
import { SECTIONS, type SectionId } from "../sections";

/**
 * ケーススタディ1節の外枠。id は sections.ts の SECTIONS に定義済みのものだけを
 * 受け付け、番号と見出しはそこから引く(page側での書き間違いを型で防ぐ)。
 * scroll-mt-* は StampRail のアンカーリンクで飛んだときに見出しが
 * 画面上端に張り付かないようにするためのもの。
 */
export function Section({
  id,
  children,
}: {
  id: SectionId;
  children: ReactNode;
}) {
  const section = SECTIONS.find((s) => s.id === id)!;

  return (
    <section
      id={id}
      data-section={id}
      className="scroll-mt-24 border-t border-border pt-10 first:border-t-0 first:pt-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tabular-nums text-stamp">
          {section.no}
        </span>
        <h2 className="text-xl font-semibold tracking-tight leading-tight text-foreground">
          {section.label}
        </h2>
      </div>
      <div className="mt-5 flex flex-col gap-5 leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/** セクション内の小見出し。h2 より一段弱く、mono のラベルで区切る。 */
export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-base font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  );
}
