import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  ClipboardList,
  Code2,
  Handshake,
  type LucideIcon,
  Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ *
 * 図版・画像
 * ------------------------------------------------------------------ */

/**
 * 画像 + キャプション。旧MDXのMediaContainerは固定高でクロップしていたが、
 * アプリのスクショは端が切れると意味を失うのでアスペクト比なりに出す。
 */
export function Figure({
  src,
  alt,
  width,
  height,
  caption,
  priority,
  sizes = "(min-width: 1024px) 768px, 100vw",
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
  sizes?: string;
  /** 縦長の写真など、本文幅いっぱいに広げたくないときに絞る */
  className?: string;
}) {
  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <div className="overflow-hidden rounded-xl ring-4 ring-muted">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className="h-auto w-full"
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** 縦に短いラベル。セクション内の小さな見出し代わりに使う。 */
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * 02 課題: 新入生1,000人の2x2
 * ------------------------------------------------------------------ */

type Quadrant = {
  title: string;
  note: string;
  /** 現状スタンプを集められる象限か(朱色で示す唯一のセル) */
  reachable?: boolean;
  /** 本プロジェクトが狙う層か */
  target?: boolean;
};

const QUADRANTS: readonly (readonly [string, readonly [Quadrant, Quadrant]])[] =
  [
    [
      "新歓に参加する",
      [
        {
          title: "春の新歓まつりを知っている",
          note: "スタンプを集められる",
          reachable: true,
          target: true,
        },
        {
          title: "春の新歓まつりを知らない",
          note: "参加の機会を逃す",
          target: true,
        },
      ],
    ],
    [
      "新歓に参加しない",
      [
        {
          title: "過去に参加した",
          note: "コミュニケーションの問題で億劫になっている",
          target: true,
        },
        {
          title: "そもそも参加しないと決めている",
          note: "行動変容の対象外",
        },
      ],
    ],
  ];

export function AudienceMatrix() {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/20 p-5 sm:p-6">
      <div className="flex justify-center">
        <span className="rounded-lg bg-foreground px-4 py-1.5 text-sm font-semibold text-background">
          新入生 約1,000人
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {QUADRANTS.map(([axis, cells]) => (
          <div key={axis} className="flex flex-col gap-2">
            <Eyebrow>{axis}</Eyebrow>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {cells.map((cell) => (
                <div
                  key={cell.title}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-3",
                    cell.reachable
                      ? "border-stamp/40 bg-stamp/5"
                      : "border-border bg-card"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={cn(
                        "text-sm font-medium leading-snug",
                        cell.reachable ? "text-foreground" : "text-foreground/80"
                      )}
                    >
                      {cell.title}
                    </p>
                    {cell.target && (
                      <span className="shrink-0 rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] leading-none text-background">
                        TARGET
                      </span>
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-xs leading-relaxed",
                      cell.reachable ? "text-stamp" : "text-muted-foreground"
                    )}
                  >
                    → {cell.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        実際にスタンプを集められるのは「参加していて、かつ、まつりの存在を知っている」1象限だけだった。
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 05 体制: メンバーと担当
 * ------------------------------------------------------------------ */

const ROLES: readonly {
  role: string;
  icon: LucideIcon;
  body: string;
  mine?: boolean;
}[] = [
  {
    role: "PM",
    icon: Handshake,
    body: "自治会とやりとりを行い、アプリを学内公式アプリとして運用する",
  },
  {
    role: "PdM",
    icon: ClipboardList,
    body: "アプリの設計やコードレビューを行う",
  },
  {
    role: "エンジニア",
    icon: Code2,
    body: "デザインを基にフロントエンドを実装する",
    mine: true,
  },
  {
    role: "デザイナー",
    icon: Palette,
    body: "アプリのUI/UXをデザインする",
  },
];

export function RoleGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {ROLES.map(({ role, icon: Icon, body, mine }) => (
        <div
          key={role}
          className={cn(
            "flex flex-col gap-2 rounded-xl border p-4",
            mine ? "border-foreground/25 bg-card" : "border-border bg-card"
          )}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
              <Icon className="size-5" aria-hidden />
            </div>
            {mine && (
              <span className="rounded bg-foreground px-1.5 py-0.5 font-mono text-[10px] leading-none text-background">
                担当
              </span>
            )}
          </div>
          <h4 className="text-sm font-semibold leading-snug text-foreground">
            {role}
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 06 差し戻し: 指摘と対応の対
 * ------------------------------------------------------------------ */

const REVIEW_PAIRS: readonly { issue: string; response: string }[] = [
  {
    issue:
      "スタンプを集めるとどのような景品がもらえるのか。その景品はどうやって用意するのか。",
    response:
      "大学のマスコットキャラ「わだにゃん」のオリジナルスタンプを用意し、景品は大学生協と協力して金券を配ることで新入生の動機付けとする。",
  },
  {
    issue: "公式アプリとして運用する上で、セキュリティ面の安全性はどうなのか。",
    response:
      "大学のメールアドレスは登録できないようにし、ユーザー名にも本名を入力させないUXへ変更する。万が一漏洩しても個人が特定されにくいようにする。",
  },
  {
    issue:
      "導入による効果が予測できないため、もっと魅力的な機能を追加してほしい。",
    response:
      "新歓の日程が各団体のSNSに散らばっていて新入生が一括で把握できない、という課題を新たに提起し、新歓日程の一括管理機能を追加する。",
  },
];

export function ReviewPairs() {
  return (
    <ol className="flex flex-col gap-3">
      {REVIEW_PAIRS.map(({ issue, response }, index) => (
        <li
          key={issue}
          className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card md:grid-cols-2 md:divide-x md:divide-y-0"
        >
          <div className="flex flex-col gap-1.5 p-4">
            <Eyebrow>
              指摘 {String(index + 1).padStart(2, "0")}
            </Eyebrow>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {issue}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 bg-muted/20 p-4">
            <Eyebrow>対応</Eyebrow>
            <p className="text-sm leading-relaxed text-foreground/90">
              {response}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ *
 * 07 運用後の改善: ランキング表示の試行
 * ------------------------------------------------------------------ */

const ITERATIONS: readonly {
  title: string;
  verdict: string;
  body: string;
  adopted?: boolean;
}[] = [
  {
    title: "全ユーザーを毎回フェッチしてフロントで集計",
    verdict: "遅い",
    body: "負荷テストをしておらず、ランキング画面で全ユーザーを取得していたためフェッチに時間がかかっていた。",
  },
  {
    title: "サーバー側で定期的にランキングを計算し、順位を保持する",
    verdict: "断念",
    body: "Firebaseでは定期実行が有料の機能だったため、コストの観点から見送った。順位付けはフロントで行う必要があると確定した。",
  },
  {
    title: "ランキングをキャッシュし、更新ボタンのときだけ再フェッチ",
    verdict: "UXが劣化",
    body: "表示速度は改善したが、更新するまで古いデータが表示されたままになってしまう。",
  },
  {
    title: "更新でDBが最新になったタイミングでトップ100のテーブルを作り、そこから読む",
    verdict: "採用",
    body: "フロントが読む件数を100件に固定できるため、表示速度と鮮度を両立できた。",
    adopted: true,
  },
];

export function IterationSteps() {
  return (
    <ol className="flex flex-col gap-3 border-l border-border pl-5 sm:pl-6">
      {ITERATIONS.map(({ title, verdict, body, adopted }, index) => (
        <li key={title} className="relative">
          <span
            aria-hidden
            className={cn(
              "absolute -left-[21px] top-5 size-2 rounded-full ring-4 ring-background sm:-left-[25px]",
              adopted ? "bg-stamp" : "bg-border"
            )}
          />
          <div
            className={cn(
              "flex flex-col gap-2 rounded-xl border p-4",
              adopted ? "border-stamp/40 bg-stamp/5" : "border-border bg-card"
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                試行 {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "rounded border px-1.5 py-0.5 font-mono text-[10px] leading-none",
                  adopted
                    ? "border-stamp/40 bg-stamp/10 text-stamp"
                    : "border-border text-muted-foreground"
                )}
              >
                {verdict}
              </span>
            </div>
            <h4
              className={cn(
                "text-sm font-semibold leading-snug",
                adopted ? "text-foreground" : "text-foreground/80"
              )}
            >
              {title}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ *
 * 09 反響: メディア掲載
 * ------------------------------------------------------------------ */

const PRESS: readonly { label: string; source: string; href: string }[] = [
  {
    label: "学生発案の新歓アプリ「和大DE話題」",
    source: "和歌山大学 公式サイト",
    href: "https://www.wakayama-u.ac.jp/news/2025052300074/",
  },
  {
    label: "和歌山大学 公式アカウントの投稿",
    source: "Instagram",
    href: "https://www.instagram.com/p/DLzPewkS3t6/",
  },
  {
    label: "和歌山大学 公式アカウントの投稿",
    source: "Facebook",
    href: "https://www.facebook.com/wakayamauniv/posts/%E5%AD%A6%E7%94%9F%E7%99%BA%E6%A1%88%E6%96%B0%E6%AD%93%E3%82%A2%E3%83%97%E3%83%AA%E5%92%8C%E5%A4%A7%E3%81%A7%E8%A9%B1%E9%A1%8C%E4%BB%8A%E5%B9%B43%E6%9C%88%E3%81%8B%E3%82%895%E6%9C%88%E3%81%AB%E3%81%8B%E3%81%91%E3%81%A6%E9%81%8B%E7%94%A8%E3%81%95%E3%82%8C%E3%81%9F%E6%96%B0%E5%85%A5%E7%94%9F%E6%AD%93%E8%BF%8E%E3%82%A2%E3%83%97%E3%83%AA%E5%92%8C%E5%A4%A7%E3%81%A7%E8%A9%B1%E9%A1%8C%E3%81%93%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AF%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0%E5%B7%A5%E5%AD%A6%E9%83%A8%E3%81%AE%E5%AD%A6%E7%94%9F%E3%82%92%E4%B8%AD%E5%BF%83%E3%81%A8%E3%81%97%E3%81%9F%E6%9C%89%E5%BF%97%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E3%81%8C%E4%BC%81%E7%94%BB%E3%81%8B%E3%82%89%E5%90%84%E5%9B%A3%E4%BD%93/1346565517474362/",
  },
];

export function PressLinks() {
  return (
    <ul className="flex flex-col gap-2">
      {PRESS.map(({ label, source, href }) => (
        <li key={href}>
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <span className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                {source}
              </span>
              <span className="text-sm leading-snug text-foreground">
                {label}
              </span>
            </span>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-px group-hover:translate-x-px group-hover:text-foreground"
              aria-hidden
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ *
 * 汎用: 並列な項目を見せるカードグリッド(目標・要件定義)
 * ------------------------------------------------------------------ */

export function CardGrid({
  children,
  cols = 3,
}: {
  children: ReactNode;
  cols?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-3",
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
      )}
    >
      {children}
    </div>
  );
}

export function InfoCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
      <div className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
        <Icon className="size-5" aria-hidden />
      </div>
      <h4 className="text-sm font-semibold leading-snug text-foreground">
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * 成果の数値。ヒーロー直下に1度だけ置く。
 * ------------------------------------------------------------------ */

const RESULTS: readonly { value: string; label: string; note?: string }[] = [
  {
    value: "約650人",
    label: "アプリ登録者数",
    note: "新入生 約1,000人中",
  },
  {
    value: "約50人",
    label: "スタンプ5個以上を達成",
    note: "景品の獲得条件",
  },
  {
    value: "約20人",
    label: "景品(650円分の金券)を受け取り",
    note: "導入前は2人",
  },
];

export function ResultStats() {
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {RESULTS.map(({ value, label, note }) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center gap-1 rounded-xl border border-border bg-muted/30 px-4 py-5 text-center"
        >
          <dt className="sr-only">{label}</dt>
          <dd className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold tracking-tight tabular-nums text-foreground md:text-3xl">
              {value}
            </span>
            <span className="text-xs leading-snug text-muted-foreground">
              {label}
            </span>
            {note && (
              <span className="font-mono text-[10px] leading-none text-muted-foreground/70">
                {note}
              </span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
