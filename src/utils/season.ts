// 季節の型
export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

// 月の型（1から12の整数）
type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// 季節ごとの草色マップ（data-level 0~4）
const seasonGrassColors = {
  spring: {
    0: "#ebedf0",
    1: "#ffe4e1",
    2: "#ffb6c1",
    3: "#ff80ab",
    4: "#ff4d85",
  },
  summer: {
    0: "#ebedf0",
    1: "#c6f6d5",
    2: "#9ae6b4",
    3: "#68d391",
    4: "#38a169",
  },
  autumn: {
    0: "#ebedf0",
    1: "#ffe5b4",
    2: "#ffc080",
    3: "#ff9933",
    4: "#cc6600",
  },
  winter: {
    0: "#ebedf0",
    1: "#f0f0f0",
    2: "#d9d9d9",
    3: "#bfbfbf",
    4: "#808080",
  },
} as const; // "as const"を使って、オブジェクトのプロパティを定数にする

// 現在の季節を判定する関数
function getSeason(): Season {
  const month = new Date().getMonth() + 1; // 1月=1
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

// 月ごとの草色マップ（イベント優先）
const monthGrassColors: Record<Month, { [key: number]: string }> = {
  1: seasonGrassColors.winter, // 冬
  2: {
    0: "#ebedf0", // 背景
    1: "#f5e1d0", // 薄ミルクチョコ
    2: "#d2a679", // ミルクチョコ
    3: "#a56b46", // ダークチョコ
    4: "#5c3a21", // ビターチョコ
  },
  3: {
    0: "#fff0f5", // 背景（薄いピンク）
    1: "#fbe1eb", // 雛霰の白
    2: "#f0a9c1", // 明るいピンク
    3: "#f5c68c", // 明るい黄色（雛霰の黄色）
    4: "#ff66b2", // 濃いピンク
  },
  4: seasonGrassColors.spring,
  5: seasonGrassColors.spring,
  6: seasonGrassColors.summer,
  7: seasonGrassColors.summer,
  8: seasonGrassColors.summer,
  9: seasonGrassColors.autumn,
  10: {
    0: "#ebedf0",
    1: "#ffebcd",
    2: "#ffdead",
    3: "#ff8c00",
    4: "#ff4500",
  },
  11: seasonGrassColors.autumn,
  12: {
    0: "#f0f8ff", // 雪のような白または淡い青（背景）
    1: "#ffcccc", // 薄い赤（サンタクロースの赤）
    2: "#66cc66", // クリスマスツリーの緑
    3: "#b30000", // クリスマスレッド（深い赤）
    4: "#006400", // クリスマスグリーン（深い緑）
  },
};

// 月と日付でカラーを取得する関数（イベント期間優先）
export function getGrassColorsByMonthAndDate(month?: Month, day?: number) {
  const m = month ?? new Date().getMonth() + 1;
  const d = day ?? new Date().getDate();

  // バレンタイン（2月10日〜14日）
  if (m === 2 && d >= 10 && d <= 14) return monthGrassColors[2];

  // ひな祭り（3月3日〜7日）
  if (m === 3 && d >= 3 && d <= 7) return monthGrassColors[3];

  // ハロウィン（10月31日〜11月1日）
  if (m === 10 && (d === 31 || d === 1)) return monthGrassColors[10];

  // クリスマス（12月15日〜25日）
  if (m === 12 && d >= 15 && d <= 25) return monthGrassColors[12];

  // それ以外は季節カラー
  return getGrassColorsBySeason();
}

// 現在の季節のカラーを取得する関数（季節カラー）
function getGrassColorsBySeason() {
  const season = getSeason();
  return seasonGrassColors[season]; // 季節カラーを返す
}

// レベルごとの色を取得する関数
export function getGrassColorByLevel(level: number) {
  const grassColors = getGrassColorsByMonthAndDate(); // 月と日付に基づく色

  // NaN や範囲外の値を扱う（0〜4 にクランプ）
  if (isNaN(level) || level < 0 || level > 4) {
    console.warn(`⚠️ 無効なレベル: ${level}（0〜4 の範囲で指定してください）`);
    return grassColors[0] ?? "#ebedf0"; // レベルが範囲外または無効な場合はデフォルト色
  }

  const idx = Math.floor(level);
  const key = (idx < 0 ? 0 : idx > 4 ? 4 : idx) as 0 | 1 | 2 | 3 | 4;
  return grassColors[key] ?? grassColors[0] ?? "#ebedf0"; // 色が見つからない場合はデフォルト
}

// 月と日付に基づいて草色を変更する処理
function updateGrassColors() {
  const cells = document.querySelectorAll("td.ContributionCalendar-day") as NodeListOf<HTMLTableCellElement>;
  if (!cells.length) {
    console.log("⏳ 草がまだ見つからないので再試行します...");
    return false;
  }

  let updatedCount = 0;
  cells.forEach(cell => {
    const level = parseInt(cell.getAttribute("data-level") ?? "0", 10);
    const color = getGrassColorByLevel(level);
    cell.style.backgroundColor = color;
    updatedCount++;
  });

  console.log(`🌱 ${updatedCount} 個の草を色付けしました！`);
  return updatedCount > 0;
}

// 1秒ごとに草色を更新
const interval = setInterval(() => {
  if (updateGrassColors()) {
    clearInterval(interval);
  }
}, 1000);
