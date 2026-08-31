import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  Megaphone,
  MessagesSquare,
  QrCode,
  Stamp,
  Trophy,
} from "lucide-react";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import {
  AudienceMatrix,
  CardGrid,
  Figure,
  InfoCard,
  IterationSteps,
  PressLinks,
  ResultStats,
  ReviewPairs,
  RoleGrid,
} from "./_components/figures";
import { Section, SubHeading } from "./_components/section";
import { StampRail } from "./_components/stamp-rail";

const PATH = "/projects/wadai-de-wadai";
const TITLE = "和大DE話題";
const SUMMARY =
  "新歓まつりの形骸化という課題に対し、QRコードでスタンプを集められるデジタルスタンプラリーアプリを企画・開発した学生プロジェクト。";
const COVER = "/wadai-de-wadai_cover.png";

// サイト他所と同じ段差でヒーローをフェードインさせる(src/app/page.tsx等と揃える)
const BLUR_FADE_DELAY = 0.04;

export const metadata: Metadata = {
  title: TITLE,
  description: SUMMARY,
  openGraph: {
    title: TITLE,
    description: SUMMARY,
    type: "article",
    url: `${DATA.url}${PATH}`,
    images: [{ url: `${DATA.url}${COVER}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SUMMARY,
    images: [`${DATA.url}${COVER}`],
  },
};

// 日付・技術スタック・リンクはプロジェクトカードと同じ resume.tsx から引く
// (ここで書き写すとカードと詳細ページで食い違うため)
const project = DATA.projects.find(
  (p) => "detailHref" in p && p.detailHref === PATH
);

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  headline: TITLE,
  description: SUMMARY,
  url: `${DATA.url}${PATH}`,
  author: {
    "@type": "Person",
    name: DATA.name,
  },
}).replace(/</g, "\\u003c");

export default function WadaiDeWadai() {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />

      <Link
        href="/#projects"
        className="group mb-6 inline-flex items-center gap-1 rounded-lg border border-border px-2 py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Back to Projects"
      >
        <ChevronLeft className="size-3 transition-transform group-hover:-translate-x-px" />
        Back to Projects
      </Link>

      {/* ヒーロー。目次(スタンプカード)より上に置いて全幅を使う */}
      <header className="flex max-w-3xl flex-col gap-4">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Project / 2024 — 2025
          </p>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h1 className="title text-3xl font-semibold leading-tight tracking-tighter md:text-4xl">
            {TITLE}
          </h1>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {SUMMARY}
          </p>
        </BlurFade>

        {project && (
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm text-muted-foreground">{project.dates}</p>
                {project.href && (
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Visit site
                    <ArrowUpRight className="size-3" aria-hidden />
                  </Link>
                )}
              </div>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((tag) => (
                    <Badge
                      key={tag}
                      className="h-6 w-fit border border-border px-2 text-[11px] font-medium"
                      variant="outline"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </BlurFade>
        )}
      </header>

      <BlurFade delay={BLUR_FADE_DELAY * 5}>
        <div className="mt-8 flex flex-col gap-6">
          <Figure
            src={COVER}
            alt="「和大DE話題」アプリの画面(新歓日程・QRスキャン・ランキング・マイページ)"
            width={2190}
            height={1228}
            priority
            sizes="(min-width: 1024px) 960px, 100vw"
            caption="新歓日程の確認からQRスキャンでのスタンプ収集、ランキング、マイページまでを1つのアプリで完結できる"
          />
          <ResultStats />
        </div>
      </BlurFade>

      {/* 本文。lg以上でだけ左にスタンプカードの目次を出す */}
      <div className="mt-14 lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-12">
        <div className="hidden lg:block">
          <div className="sticky top-8">
            <StampRail />
          </div>
        </div>

        <article className="flex max-w-3xl flex-col gap-10">
          <Section id="background">
            <p>
              2024年の11月頃のお昼休憩で、自治会の友達が「春の新歓まつりが形骸化しているのでどうにかしたい」と言っていた。そこで、自身が学部1年生の頃、新歓に参加しても上手く話せず友達が作れず、新歓に参加すること自体が億劫になっていたことを思い出した。
            </p>
            <p>
              自治会の友達が抱える課題を解決しつつ、かつて自分が学部1年生の頃に抱いていた問題も解決したいと考え、2人で協力して解決策を考えることにした。
            </p>
          </Section>

          <Section id="problem">
            <p>
              春の新歓まつりが形骸化している理由を深掘りするため、新入生
              約1,000人を「新歓に参加するか」「まつりの存在を知っているか」という2つの軸で分解した。
            </p>
            <AudienceMatrix />
            <p>
              加えて、紙のスタンプカードは持ち歩いていないと押してもらえない、という運用面の課題もあった。
            </p>
          </Section>

          <Section id="goal">
            <p>
              新歓に参加する層と、参加したことはあるがコミュニケーションに問題を抱える層をターゲットとして、春の新歓まつりを活性化させることを目的とした。目的を達成するため、以下の3つの目標を掲げてプロジェクトをスタートさせた。
            </p>
            <CardGrid cols={3}>
              <InfoCard title="周知" icon={Megaphone}>
                新歓まつりの存在を新入生に知ってもらう
              </InfoCard>
              <InfoCard title="収集" icon={Stamp}>
                スタンプを集める人を増やす
              </InfoCard>
              <InfoCard title="交流" icon={MessagesSquare}>
                新歓でのコミュニケーションのきっかけをつくる
              </InfoCard>
            </CardGrid>
          </Section>

          <Section id="requirements">
            <CardGrid cols={2}>
              <InfoCard title="QRコードでスタンプ収集" icon={QrCode}>
                新入生が団体へ参加したことを証明するため、各団体の代表者だけにQRコードを配布する。アプリ内から読み込むだけでスタンプが貯まるので、紙のスタンプカードを持ち歩く必要がない。
              </InfoCard>
              <InfoCard title="ランキング表示" icon={Trophy}>
                スタンプ獲得数のランキングを表示し、新歓内でのコミュニケーションを加速する会話のきっかけにする。
              </InfoCard>
            </CardGrid>
          </Section>

          <Section id="team">
            <RoleGrid />
            <SubHeading>技術選定</SubHeading>
            <p>
              PdMがVue.jsでWebアプリを開発した経験があったため、フロントエンドは
              <strong className="font-medium text-foreground">Vue.js</strong>
              を用いた。1ヶ月後の自治会ミーティングで実際のデモンストレーションを見せて導入可否を判断してもらう、という短い開発期間だったため、バックエンドはBaaSの
              <strong className="font-medium text-foreground">Firebase</strong>
              を用いた。
            </p>
          </Section>

          <Section id="process">
            <p>
              PdMが1週間ほどでFirebaseとのデータのやり取りとデータベースのスキーマを決め、エンジニアである私が、デザイナーの作ったUI/UXデザインを基にVue.jsでフロントエンドを2週間程度で構築した。
            </p>
            <p>
              その後の自治会ミーティングでPMがデモンストレーションを見せ、導入の可否を問うた。結果は
              <strong className="font-medium text-foreground">保留</strong>
              。挙がった3つの指摘に対し、チームで次のように対応を決めた。
            </p>
            <ReviewPairs />

            <SubHeading>セキュリティ対策</SubHeading>
            <p>
              学内公式アプリとして新入生の個人情報を預かる以上、情報漏洩時の被害を最小限に抑えることを最優先で設計した。
            </p>
            <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-border">
              <li>
                大学の公式メールアドレスでの登録を禁止し、フリーメールなど任意のメールアドレスのみ登録可能にした
              </li>
              <li>
                ユーザー名に本名を使わせない設計にすることで、万が一情報が漏洩しても個人が特定されにくいようにした
              </li>
            </ul>
            {/* TODO: 他にも実施した対策(Firebase Security Rulesでのアクセス制御、
                入力値のバリデーションなど)があれば、上のリストに追記してください */}
          </Section>

          <Section id="perf">
            <p>
              DBの負荷テストをしていなかったため、リリース後にランキング画面の表示が遅いという問題が出た。速度と鮮度を両立させるまでに、次の4段階を踏んでいる。
            </p>
            <IterationSteps />
          </Section>

          <Section id="results">
            <SubHeading>周知: 新歓まつりの存在を知ってもらう</SubHeading>
            <p>
              新入生のガイダンスで私がアプリのプレゼンを行い、あわせて自治会にSNSで周知してもらった。その結果、新入生
              約1,000人のうち650人近くがアプリにアカウントを登録した。
            </p>
            <Figure
              src="/guidance.webp"
              alt="新入生ガイダンスで「和大DE話題」を紹介している様子"
              width={1477}
              height={1108}
              caption="新入生ガイダンスでのアプリ紹介の様子"
            />

            <SubHeading>収集: スタンプを集める人を増やす</SubHeading>
            <p>
              導入後は約50人がスタンプを5個以上集め(景品の獲得条件)、うち約20人が実際に650円分の金券を受け取った。導入前の景品獲得者は2人だったため、10倍になった。
            </p>
            <Figure
              src="/reward.jpg"
              alt="スタンプ5個達成者に贈られた650円分の金券"
              width={1108}
              height={1477}
              sizes="(min-width: 640px) 420px, 100vw"
              className="mx-auto w-full max-w-sm"
              caption="達成者に配布した650円分の金券(大学生協と協力)"
            />

            <SubHeading>交流: コミュニケーションのきっかけをつくる</SubHeading>
            <p>
              自身が所属するサークルでも「スタンプを集めてるんです！」と話しかけてくる新入生がいた。
            </p>
          </Section>

          <Section id="press">
            <p>
              学長にも取り上げていただき、複数の媒体で紹介された。
            </p>
            <PressLinks />
          </Section>
        </article>
      </div>
    </div>
  );
}
