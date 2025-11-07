// 季節の型
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

// 現在の季節を判定する関数
export function getSeason(): Season {
  const month = new Date().getMonth() + 1 // 1月=1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

// 季節ごとの草色マップ（data-level 0~4）
export const seasonGrassColors: Record<Season, Record<number, string>> = {
  spring: {
    0: '#ebedf0',
    1: '#ffe4e1',
    2: '#ffb6c1',
    3: '#ff80ab',
    4: '#ff4d85',
  },
  summer: {
    0: '#ebedf0',
    1: '#c6f6d5',
    2: '#9ae6b4',
    3: '#68d391',
    4: '#38a169',
  },
  autumn: {
    0: '#ebedf0',
    1: '#ffe5b4',
    2: '#ffc080',
    3: '#ff9933',
    4: '#cc6600',
  },
  winter: {
    0: '#ebedf0',
    1: '#f0f0f0',
    2: '#d9d9d9',
    3: '#bfbfbf',
    4: '#808080',
  },
}

// 月ごとの草色マップ（イベント優先）
export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export const monthGrassColors: Record<Month, Record<number, string>> = {
  1: seasonGrassColors.winter, // 冬
  2: {
    // バレンタイン
    0: '#ebedf0', // 背景
    1: '#f5e1d0', // 薄ミルクチョコ
    2: '#d2a679', // ミルクチョコ
    3: '#a56b46', // ダークチョコ
    4: '#5c3a21', // ビターチョコ
  },
  3: {
    // ひな祭り・ホワイトデー
    0: "#ebedf0",
    1: "#fff0f5",
    2: "#ffccdd",
    3: "#ff99bb",
    4: "#ff66aa",
  },
  4: seasonGrassColors.spring,
  5: seasonGrassColors.spring,
  6: seasonGrassColors.summer,
  7: seasonGrassColors.summer,
  8: seasonGrassColors.summer,
  9: seasonGrassColors.autumn,
  10: {
    // ハロウィン
    0: '#ebedf0',
    1: '#ffebcd',
    2: '#ffdead',
    3: '#ff8c00',
    4: '#ff4500',
  },
  11: seasonGrassColors.autumn,
  12: {
    // クリスマス
    0: '#ebedf0',
    1: '#e6f7ff',
    2: '#99d6ff',
    3: '#33b3ff',
    4: '#007acc',
  },
}

// 月からカラーを取得する関数（イベント優先）
export function getGrassColorsByMonth(month?: number): Record<number, string> {
  const m = month ?? new Date().getMonth() + 1
  return monthGrassColors[m as Month]
}

// 現在の季節のカラーを取得する関数（季節カラー）
export function getGrassColorsBySeason(): Record<number, string> {
  const season = getSeason()
  return seasonGrassColors[season]
}
