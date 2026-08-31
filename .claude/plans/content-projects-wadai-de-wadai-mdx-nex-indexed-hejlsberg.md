# 和大DE話題のプロジェクト記事をMDXから素のNextページへ移行する

## Context

`content/projects/wadai-de-wadai.mdx` は content-collections でコンパイルされ、`src/app/projects/[slug]/page.tsx` が `prose` を当てた `<article>` の中に流し込んでいる。プロジェクト記事は現状この1本だけで、しかも中身は生のJSXブロック（`課題` の2×2図）を含んでいるため、MDXである利点がほぼ無い一方で次のコストを払っている。

- **見た目が制御しきれない**: `article-grid` と `breakout` は**どこにも定義されていない**（`globals.css` にも `.next/static` にも該当ルール無し）。「本文カラムを突き破って全幅にする」意図のペアが実装欠落のまま no-op になっており、`MediaContainer` / `FeatureGrid` / `StatGrid` が本文と同じ幅に収まってしまっている。
- **h1が二重**: `page.tsx:115` が `post.title` を出しつつ MDX 側も `# 和大DE話題` で始まっている。
- **コンポーネントがMDX都合で歪んでいる**: `FeatureGrid` の `ICONS` ホワイトリストは「MDXから任意コンポーネントをimportさせない」ためだけの制約。TSXなら不要。
- **ビルドが壊れている**: 未追跡の `content/projects/wadai-de-wadai-v2.mdx` が0バイトで、zodスキーマ（`title`/`summary`/`content` 必須）を満たさず content-collections のバリデーションエラーになる。

ユーザーの意向は「MDXをやめて普通のNextページにする」「projectPosts コレクションごと廃止する」「移植ついでにレイアウトも改善する」「v2の空ファイルは削除する」。ブログ用の `posts` コレクションとMDX基盤は残す。

到達点は、`/projects/wadai-de-wadai` が素のReact Server Componentとして描画され、ケーススタディとして読みやすい情報設計を持ち、`allProjectPosts` への依存がリポジトリから消えている状態。

---

## デザイン方針

サイト既存のアイデンティティ（oklchのグレースケール、Geist / Geist Mono、shadcn風のカード）は崩さない。追加する色は**1つだけ**。

- **モチーフ**: スタンプラリーのアプリなので、記事そのものをスタンプカードに見立てる。読み進めるとマスが「押される」。
- **アクセント**: 朱肉の朱色。スタンプ印にのみ使う。`globals.css` に `--stamp` を1トークン追加（light/dark両方）し、`@theme inline` に `--color-stamp: var(--stamp)` を登録して `text-stamp` / `border-stamp/40` / `bg-stamp/10` を使えるようにする。それ以外の場所では使わない。
- **書体**: 新規Webフォントは足さない。既存の Geist Mono を「番号・ラベル・数値」の実務用書体として使い分けることで階層をつくる。
- **抑制**: 大胆なのはスタンプレールだけ。他は既存の定型（`border border-border rounded-xl`、`hover:bg-accent/50 transition-colors`、`ring-4 ring-muted`）に揃える。

### セクション構成（9マス = 3×3のスタンプカード）

元の11見出しを、ケーススタディの筋が通る9つに再編する。

| # | id | 漢字 | セクション | 元MDXからの変更 |
|---|----|------|-----------|----------------|
| 01 | `background` | 背 | 背景 | そのまま |
| 02 | `problem` | 課 | 課題 | 2×2マトリクスに作り直し |
| 03 | `goal` | 的 | 目的と目標 | 「目的」+「達成目標」を統合 |
| 04 | `requirements` | 件 | 要件定義 | そのまま |
| 05 | `team` | 組 | 体制と技術選定 | 「メンバー」+「技術スタック」を統合、自分の担当を明示 |
| 06 | `process` | 程 | 開発と差し戻し | 開発プロセス + 指摘/対応の対 + セキュリティ対策 |
| 07 | `perf` | 改 | 運用後の改善 | ランキング性能を4段階の試行として作り直し |
| 08 | `results` | 績 | 成果 | 運用実績（3つの目標との対応を明示） |
| 09 | `press` | 報 | 反響 | メディア掲載 |

---

## 実装

### 1. 新規: `src/app/projects/wadai-de-wadai/`

```
src/app/projects/wadai-de-wadai/
├── page.tsx                    # Server Component。metadata / JSON-LD / 本文
├── sections.ts                 # SECTIONS 配列（id, kanji, no, label）— page と rail が共有
└── _components/
    ├── stamp-rail.tsx          # "use client" — signature要素
    ├── section.tsx             # セクションの外枠（eyebrow + h2 + 本文）
    └── figures.tsx             # AudienceMatrix / RoleGrid / ReviewPairs / IterationSteps / PressLinks
```

**`sections.ts`** — クライアント/サーバ両方から import する素のデータモジュール。`readonly` 配列 + `as const` で、`page.tsx` の `<Section id=...>` と `StampRail` のマス目が同じ定義から生えるようにする（片方だけ増えるズレを防ぐ）。

**`page.tsx`**（Server Component）
- `generateMetadata` は不要。`export const metadata: Metadata` を静的に書く。現行 `projects/[slug]/page.tsx:45-61` の内容（title / description / openGraph / twitter、画像は `/wadai-de-wadai_cover.png`）をそのまま移す。`DATA.url` を使う点も踏襲。
- JSON-LD（`CreativeWork`）も現行 `page.tsx:82-103` の書き方（`.replace(/</g, "\\u003c")` + `suppressHydrationWarning`）をそのまま移す。
- ルートは `max-w-6xl mx-auto w-full`（`layout.tsx` は幅を持たず `px-6` のみなのでページ側で決める）。
- 本文レイアウト: `lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-12`。左が `<StampRail />`（`sticky top-8 self-start`、`hidden lg:block`）、右が `max-w-3xl` の本文。
- ヒーロー: 「Back to Projects」リンク（現行 `page.tsx:104-113` をそのまま流用）→ eyebrow（`font-mono text-xs tracking-widest text-muted-foreground`、`PROJECT / 2024 — 2025`）→ h1 → summary → メタ行（`DATA.projects[0]` から dates / links / technologies バッジ。現行 121-167 行の構造を維持）→ カバー画像。
- **h1の二重出しを解消**（MDX側の `# 和大DE話題` は消える）。
- 画像は `next/image` に置き換える。ローカル `public/` なので追加設定不要。実寸は cover `2190×1228` / guidance `1477×1108` / reward `1108×1477`。カバーは `priority` + `sizes="(min-width: 1024px) 768px, 100vw"`。現行の `h-[220px] sm:h-[420px]` の固定高クロップはスクショの端を切ってしまうので、アスペクト比なりに出す。
- 成果の3数値（650人 / 50人 / 20人）はヒーロー直下に置く。3つしかないのでグラフにはしない。ただし「景品受け取り 20人（導入前 2人）」の10倍は文字として明示する。
- `BlurFade`（`src/components/magicui/blur-fade.tsx`）はヒーローと成果バンドにだけ、サイト慣例の `BLUR_FADE_DELAY = 0.04` の段差で当てる。本文セクション全部には当てない（クライアント境界を増やさない）。

**`_components/stamp-rail.tsx`**（`"use client"` — signature）
- `SECTIONS` から3×3のグリッドを描く。各マスは `<a href="#id">` で、破線の円（未到達）／朱色のインク印 + 漢字（到達済み）。`aria-label` にセクション名を入れる（漢字1文字だけのリンクにしない）。
- `IntersectionObserver` で現在のセクションを判定（`rootMargin: "-40% 0px -55% 0px"` 程度で「画面中央にあるもの」を1つに絞る）。到達済みは一度立ったら戻さない（スタンプは消えない）ほうがモチーフとして正しい。現在位置だけは別表現（リング）で示す。
- 押印モーション: `scale(1.18) rotate(-6deg)` → `scale(1) rotate(-2deg)`、約180ms。`motion`（framer-motion系、依存済み）を使ってもよいが、CSS transition で足りるなら素のCSSで。`@media (prefers-reduced-motion: reduce)` では色の変化だけにする。
- カード下に現在セクションの `01 背景` を `font-mono` で表示。
- キーボードフォーカスリングを潰さない（`focus-visible:ring-2 focus-visible:ring-ring`）。

**`_components/figures.tsx`**
- `AudienceMatrix`: 上に「新入生 約1,000人」、その下に2×2。行 = 参加する / 参加しない、各行2セル。「参加する × まつりを知っている」だけがスタンプに到達できる象限として強調し、「参加する × 知らない」「参加しない × 億劫」の2つを**ターゲット**として別マーク（`目的` セクションの「参加層 + 億劫層をターゲットにした」という記述と直結させる）。現行MDXの縦積み2カラムより、取りこぼしが一目で分かる。紙のスタンプカードの運用課題は図の下に1文添える。
- `RoleGrid`: PM / PdM / エンジニア / デザイナーの4枚。**エンジニア = 自分**を明示するバッジを付ける（ポートフォリオとして現状ここが抜けている）。アイコンは lucide から直接渡す（`FeatureGrid` の `ICONS` ホワイトリストは使わない）。
- `ReviewPairs`: 自治会ミーティングで保留になった3つの指摘と、それぞれへの対応を左右（モバイルでは上下）で対にする。「指摘 → 対応」という実際の構造をレイアウトで表す。
- `IterationSteps`: ランキング性能の4段階。`初期実装（全件フェッチ・遅い）` → `案A: サーバ側定期計算（Firebaseで有料、コストで断念）` → `案B: キャッシュ + 更新ボタンでフロント計算（速いが古いデータでUX劣化）` → `最終: 更新時にトップ100テーブルを生成しそこからフェッチ`。**却下した案は打ち消し／減光**、最終案を強調。ページ中で一番エンジニアリングらしい部分なので余白を多めに取る。
- `PressLinks`: 3件のリンクを行カードに。Facebookの巨大URLは表示せずラベルとドメインだけ出し、`ArrowUpRight` + `hover:bg-accent/50 transition-colors`（サイト定型）。

MDX内の `{/* TODO: 他にも実施した対策… */}`（`wadai-de-wadai.mdx:125`）は、セキュリティ対策のところにTSXコメントとして残す。

### 2. 変更: `content-collections.ts`

`projectPosts` の `defineCollection` と `defineConfig` の `collections` からの参照を削除。`posts`（ブログ用）はそのまま残す。`compileMDX` / `remarkGfm` / `remarkCodeMeta` は `posts` が使い続けるので import は残る。

### 3. 変更: `src/data/resume.tsx` と `src/components/section/projects-section.tsx`

`projects-section.tsx:4,8-11` の `allProjectPosts` 依存を外す。記事の有無を content-collections から判定していたのをやめ、リンク先をデータ側に直接持たせる。

- `resume.tsx:122` の `slug: "wadai-de-wadai"` を `detailHref: "/projects/wadai-de-wadai"` に置き換え（コメントも実態に合わせて更新）。
- `projects-section.tsx` は `const detailHref = "detailHref" in project ? project.detailHref : undefined;` に。`ProjectCard` 側（`project-card.tsx`）は `detailHref` prop をすでに持っているので**変更不要**。

### 4. 変更: `src/app/globals.css`

- `@theme inline` に `--color-stamp: var(--stamp);` を追加。
- `:root` に `--stamp: oklch(0.55 0.17 30);`、`.dark` に `--stamp: oklch(0.68 0.15 32);`（暗背景で沈まないよう明度を上げる）。実際の値はダークモードで見て微調整する。

### 5. 削除

- `src/app/projects/[slug]/page.tsx`（および空になる `[slug]` ディレクトリ）
- `content/projects/wadai-de-wadai.mdx`
- `content/projects/wadai-de-wadai-v2.mdx`（0バイト・未追跡。これがビルドを壊している）
- 空になる `content/projects/` ディレクトリ

### 6. 掃除（小）

- `src/components/mdx/media-container.tsx:21` / `feature-grid.tsx:50` / `stat-grid.tsx:14` から未定義クラス `breakout` を除去（no-opなので描画は変わらない）。`not-prose` は typography プラグインの正規クラスなので残す。
- `src/components/mdx/*` と `src/mdx-components.tsx` 自体は**残す**。ブログの `posts` コレクションが使い続けるため。

---

## 検証

1. `pnpm build` — content-collections のバリデーションが通ること（空のv2.mdxが消えているのが前提）。ルート一覧に `/projects/wadai-de-wadai` が **static** として出て、`/projects/[slug]` が消えていること。
2. `pnpm lint` — `allProjectPosts` の未使用importなどが残っていないこと。
3. `pnpm dev` で `/projects/wadai-de-wadai` を開く:
   - ライト／ダーク両方（`/` のモードトグルで切り替え）。朱色がダークで沈まないか。
   - 375px幅 — レールが消えて1カラムになり、横スクロールが出ないこと。1024px以上 — レールがstickyで追従し、スクロールに応じてマスが押されること。
   - h1が1つだけであること、カバー画像がクロップされずに出ること。
4. `/#projects` のプロジェクトカードが `/projects/wadai-de-wadai` に遷移すること（カード右上の `ArrowUpRight` は従来どおり外部サイトへ）。
5. キーボードのみでレールのマスを辿れ、フォーカスリングが見えること。DevToolsの Rendering → `prefers-reduced-motion: reduce` で押印アニメが止まること。
6. `/projects/wadai-de-wadai` の存在しないslug（例 `/projects/foo`）が404になること（`[slug]` 削除により自然と `not-found.tsx` に落ちる）。
