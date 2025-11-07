// 季節の型
export type Season = "spring" | "summer" | "autumn" | "winter";

// 現在の季節を判定する関数
export function getSeason(): Season {
  const month = new Date().getMonth() + 1; // 1月=1
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

// 季節ごとの草色マップ（data-level 0~4）
export const seasonGrassColors: Record<Season, Record<number, string>> = {
  spring: {
    0: "#ebedf0",  // 背景
    1: "#ffe4e1",  // 薄桜
    2: "#ffb6c1",
    3: "#ff80ab",
    4: "#ff4d85",  // 濃い桜
  },
  summer: {
    0: "#ebedf0",
    1: "#c6f6d5",  // 薄緑
    2: "#9ae6b4",
    3: "#68d391",
    4: "#38a169",  // 濃い緑
  },
  autumn: {
    0: "#ebedf0",
    1: "#ffe5b4",  // 薄オレンジ
    2: "#ffc080",
    3: "#ff9933",
    4: "#cc6600",  // 濃い茶
  },
  winter: {
    0: "#ebedf0",
    1: "#f0f0f0",  // 薄灰
    2: "#d9d9d9",
    3: "#bfbfbf",
    4: "#808080",  // 濃灰
  },
};
