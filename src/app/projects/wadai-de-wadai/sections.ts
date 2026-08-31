/**
 * ケーススタディの目次。page.tsx の <Section> と StampRail のマス目が
 * 同じ定義から生えるようにして、片方だけ増えたときのズレを防ぐ。
 *
 * kanji は StampRail のスタンプ面に押される1文字。3の倍数(3x3のスタンプカード)
 * を保つこと。増減させる場合は StampRail のグリッドも合わせて見直す。
 */
export const SECTIONS = [
  { id: "background", no: "01", kanji: "背", label: "背景" },
  { id: "problem", no: "02", kanji: "課", label: "課題" },
  { id: "goal", no: "03", kanji: "的", label: "目的と目標" },
  { id: "requirements", no: "04", kanji: "件", label: "要件定義" },
  { id: "team", no: "05", kanji: "組", label: "体制と技術選定" },
  { id: "process", no: "06", kanji: "程", label: "開発と差し戻し" },
  { id: "perf", no: "07", kanji: "改", label: "運用後の改善" },
  { id: "results", no: "08", kanji: "績", label: "成果" },
  { id: "press", no: "09", kanji: "報", label: "反響" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];
