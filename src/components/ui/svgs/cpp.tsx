import type { SVGProps } from "react";

// 公式のISO C++ロゴ(六角形)は size-4(16px)では潰れて読めないため、
// 同じ並びのTypescriptアイコンに合わせて「ブランド色の角丸 + 白文字」にしている。
// 色はC++の公式カラー #00599C。
const Cpp = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 256 256" preserveAspectRatio="xMidYMid">
    <path
      d="M20 0h216c11.046 0 20 8.954 20 20v216c0 11.046-8.954 20-20 20H20c-11.046 0-20-8.954-20-20V20C0 8.954 8.954 0 20 0Z"
      fill="#00599C"
    />
    <text
      x="128"
      y="128"
      fill="#FFF"
      fontFamily="system-ui, -apple-system, 'Segoe UI', sans-serif"
      fontSize="118"
      fontWeight="700"
      textAnchor="middle"
      dominantBaseline="central"
      letterSpacing="-6"
    >
      C++
    </text>
  </svg>
);

export { Cpp };
