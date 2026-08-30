import type { ReactNode } from "react";

/**
 * 記事内で「導入前後の数字」などを目立たせるための簡易ダッシュボード風カード。
 * MDX内で以下のように使う:
 *
 * <StatGrid>
 *   <Stat value="650人" label="アプリ登録者数" />
 *   <Stat value="50人" label="スタンプ5個以上達成" />
 * </StatGrid>
 */
export function StatGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose breakout grid grid-cols-1 gap-3 sm:grid-cols-3 my-6">
      {children}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/30 px-4 py-5 text-center">
      <span className="text-2xl md:text-3xl font-bold tracking-tight text-foreground tabular-nums">
        {value}
      </span>
      <span className="text-xs text-muted-foreground leading-snug">
        {label}
      </span>
    </div>
  );
}
