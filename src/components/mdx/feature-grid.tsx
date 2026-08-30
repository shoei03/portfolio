import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Megaphone,
  Stamp,
  Users,
  QrCode,
  Trophy,
  Handshake,
  ClipboardList,
  Code2,
  Palette,
} from "lucide-react";

// MDXから安全に指定できるよう、アイコンは決め打ちの名前だけ選べるようにする
// (任意のコンポーネントをMDX内でimportさせない)。必要なものが増えたらここに足す。
const ICONS = {
  megaphone: Megaphone,
  stamp: Stamp,
  users: Users,
  qrcode: QrCode,
  trophy: Trophy,
  handshake: Handshake,
  clipboard: ClipboardList,
  code: Code2,
  palette: Palette,
} as const;

export type FeatureIconName = keyof typeof ICONS;

/**
 * 「単なる箇条書き」の代わりに使う、並列な項目をカードで見せるグリッド。
 * 目標・要件・チーム構成など、順序に意味が無い項目に使う(順序に意味がある
 * 手順・タイムラインには使わない)。
 *
 * <FeatureGrid cols={3}>
 *   <Feature title="見出し">説明文</Feature>
 * </FeatureGrid>
 */
export function FeatureGrid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: 2 | 3 | 4;
}) {
  return (
    <div
      className={cn(
        "not-prose breakout my-6 grid grid-cols-1 gap-3",
        cols === 2 && "sm:grid-cols-2",
        cols === 3 && "sm:grid-cols-3",
        cols === 4 && "sm:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {children}
    </div>
  );
}

export function Feature({
  title,
  icon,
  children,
}: {
  title: string;
  /** ICONSに定義済みのキーだけ指定可能(例: "megaphone") */
  icon?: FeatureIconName;
  children: ReactNode;
}) {
  const Icon = icon ? ICONS[icon] : undefined;
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
      {Icon && (
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
          <Icon className="size-5" aria-hidden />
        </div>
      )}
      <h4 className="text-sm font-semibold leading-snug">{title}</h4>
      <div className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </div>
    </div>
  );
}
