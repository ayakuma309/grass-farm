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
} as const;

// 現在の季節を判定する関数
function getSeason(): Season {
  const month = new Date().getMonth() + 1;
  if (month >= 3 && month <= 5) return "spring";
  if (month >= 6 && month <= 8) return "summer";
  if (month >= 9 && month <= 11) return "autumn";
  return "winter";
}

// 月ごとの草色マップ（イベント優先）
const monthGrassColors: Record<Month, { [key: number]: string }> = {
  1: seasonGrassColors.winter,
  2: {
    0: "#ebedf0",
    1: "#f5e1d0",
    2: "#d2a679",
    3: "#a56b46",
    4: "#5c3a21",
  },
  3: {
    0: "#fff0f5",
    1: "#fbe1eb",
    2: "#f0a9c1",
    3: "#f5c68c",
    4: "#ff66b2",
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
    0: "#f0f8ff",
    1: "#ffcccc",
    2: "#66cc66",
    3: "#b30000",
    4: "#006400",
  },
};

// 月と日付でカラーを取得する関数（イベント期間優先）
export function getGrassColorsByMonthAndDate(month?: Month, day?: number) {
  const m = (month ?? new Date().getMonth() + 1) as Month;
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
  return seasonGrassColors[season];
}

// レベルごとの色を取得する関数（統一されたロジック）
export function getGrassColorByLevel(level: number) {
  const grassColors = getGrassColorsByMonthAndDate() as { [key: number]: string };

  // NaN や範囲外の値を扱う（0〜4 にクランプ）
  if (isNaN(level)) {
    console.warn(`⚠️ 無効なレベル: ${level}（デフォルト値 0 を使用）`);
    return grassColors[0] ?? "#ebedf0";
  }

  // 範囲外の値をクランプ
  const clampedLevel = Math.max(0, Math.min(4, Math.floor(level)));
  return grassColors[clampedLevel] ?? grassColors[0] ?? "#ebedf0";
}

// 凡例の色を更新
function recolorLegend() {
  for (let level = 0; level <= 4; level++) {
    const legendElement = document.getElementById(`contribution-graph-legend-level-${level}`);
    if (legendElement) {
      const color = getGrassColorByLevel(level);
      legendElement.style.backgroundColor = color;
    }
  }
}

// 草の色を更新（統一されたロジックを使用）
function recolorGrass(): boolean {
  const days = document.querySelectorAll('td.ContributionCalendar-day') as NodeListOf<HTMLElement>;

  if (!days.length) {
    console.log("⏳ 草がまだ見つからないので再試行します...");
    return false;
  }

  let count = 0;
  days.forEach((day) => {
    const levelAttr = day.getAttribute('data-level');
    const level = parseInt(levelAttr ?? "0", 10);

    // getGrassColorByLevelを使用して統一されたロジックで色を取得
    const color = getGrassColorByLevel(level);
    day.style.backgroundColor = color;
    count++;
  });

  const today = new Date();
  console.log(`🌱 ${count} 個の草を ${today.getMonth() + 1}/${today.getDate()} カラーにしました！`);

  if (count === 0) {
    console.log("⏳ 草の色変更が行われませんでした。再試行します...");
    return false;
  }

  // 凡例も更新
  recolorLegend();

  return true;
}

// 要素が出るまで繰り返す
const interval = setInterval(() => {
  const success = recolorGrass();
  if (success) clearInterval(interval);
}, 1000);
