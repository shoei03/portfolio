import type { SVGProps } from "react";

// Vercelのロゴは単色の三角形で、公式にも単色(currentColor)での使用が想定されているため
// ダークモードでも見えるようcurrentColorを使う(他の多色ブランドアイコンとは扱いを変えている)
const Vercel = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 1.608 12 20.784H0Z" />
  </svg>
);

export { Vercel };
