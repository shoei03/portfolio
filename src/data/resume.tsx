import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { ReactDark } from "@/components/ui/svgs/reactDark";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Vue } from "@/components/ui/svgs/vue";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";
import { Docker } from "@/components/ui/svgs/docker";
import { Java } from "@/components/ui/svgs/java";
import { Csharp } from "@/components/ui/svgs/csharp";
import { Firebase } from "@/components/ui/svgs/firebase";
import { Supabase } from "@/components/ui/svgs/supabase";
import { Vercel } from "@/components/ui/svgs/vercel";
import { Cloudflare } from "@/components/ui/svgs/cloudflare";
import { Expo } from "@/components/ui/svgs/expo";
import { Figma } from "@/components/ui/svgs/figma";
import { Gitea } from "@/components/ui/svgs/gitea";

export const DATA = {
  name: "Shoei Yoshida",
  initials: "S.Y.",
  url: "https://dillion.io",
  location: "Wakayama",
  locationLink: "https://maps.app.goo.gl/AJuHG5dvQJacgvDF9",
  description:
    "情報系の国立大学院生",
  summary:
    "和歌山大学大学院で情報系(システム工学)を専攻する修士課程の学生です。[学部時代](/#education)には、新入生歓迎行事の形骸化という身近な課題に対して、QRコードでスタンプを集められるデジタルスタンプラリーアプリ「[和大DE話題](/#projects)」を企画・開発し、学内公式アプリとして採用されるところまで携わりました。課題の発見から要件定義、フロントエンド実装、リリース後の運用改善まで一通り経験する中で、実際に使われるものを作ることの面白さを実感しています。",
  avatarUrl: "/me.JPG",
  // 言語 → フロントエンド → モバイル → バックエンド → クラウド/BaaS/インフラ → ツールの順
  skills: [
    { name: "Typescript", icon: Typescript },
    { name: "Python", icon: Python },
    { name: "Java", icon: Java },
    { name: "C++", icon: Csharp },
    { name: "React", icon: ReactLight },
    { name: "Next.js", icon: NextjsIconDark },
    { name: "Vue.js", icon: Vue },
    { name: "React Native", icon: ReactDark },
    { name: "Expo", icon: Expo },
    { name: "Node.js", icon: Nodejs },
    { name: "Firebase", icon: Firebase },
    { name: "Supabase", icon: Supabase },
    { name: "Vercel", icon: Vercel },
    { name: "CloudFlare", icon: Cloudflare },
    { name: "Docker", icon: Docker },
    { name: "Figma", icon: Figma },
    { name: "GitHub", icon: Icons.github },
    { name: "Gitea", icon: Gitea },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/shoei03",
        icon: Icons.github,
        navbar: true,
      },

      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/shoei-yoshida/",
        icon: Icons.linkedin,

        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "#",
        icon: Icons.email,

        navbar: false,
      },
    },
  },

  // 職歴なし。空にするとWork Experienceセクション自体が非表示になる
  // (page.tsx / work-section.tsx参照)
  work: [],
  education: [
    {
      school: "Wakayama University",
      href: "https://www.wakayama-u.ac.jp/sys/grad_sys/about.html",
      degree: "Master's Degree of System Engineering (MSE)",
      logoUrl: "/WakayamaUniv-logo.gif",
      start: "April 2026",
      end: "March 2028",
    },
    {
      school: "Wakayama University",
      href: "https://www.wakayama-u.ac.jp/sys/",
      degree: "Bachelor's Degree of System Engineering (BSE)",
      logoUrl: "/WakayamaUniv-logo.gif",
      start: "April 2022",
      end: "March 2026",
    },
  ],
  projects: [
    {
      title: "和大DE話題",
      // slugがcontent/projects/<slug>.mdxと一致すると、カードのタップ先が
      // 外部サイトではなくこの記事(/projects/<slug>)になります。
      slug: "wadai-de-wadai",
      // hrefは「外部サイト」用(右上のアイコン等で使用)。実サイトのURLを指定する
      href: "https://wadai-de-wadai.web.app",
      dates: "November 2024 - March 2025",
      active: true,
      description:
        "新歓まつりの形骸化を解消するため、QRコードでスタンプを集められる学内公式のデジタルスタンプラリーアプリを開発。",
      technologies: [
        "Vue.js",
        "JavaScript",
        "Vuetify",
        "Firebase",
      ],
      links: [
        {
          type: "Website",
          href: "https://wadai-de-wadai.web.app",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/wadai-de-wadai_cover.png",
      // videoを使わない場合もキー自体は残す(無いと型推論でproject.videoの参照がエラーになるため)
      video: undefined,
    },
  ],
  // ハッカソン参加実績なし。空にするとHackathonsセクション自体が非表示になる
  // (page.tsx / hackathons-section.tsx参照)
  hackathons: [],
} as const;
