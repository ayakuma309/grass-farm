import { getGrassColorsByMonthAndDate, getGrassColorByLevel } from '../utils/season';

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// 凡例の色を更新
export function recolorLegend() {
  for (let level = 0; level <= 4; level++) {
    const legendElement = document.getElementById(`contribution-graph-legend-level-${level}`);
    if (legendElement) {
      const color = getGrassColorByLevel(level);
      legendElement.style.backgroundColor = color;
    }
  }
}

// 草の色を月ごとに取得して更新する関数
export function recolorGrass(): boolean {
  const days = document.querySelectorAll('td.ContributionCalendar-day') as NodeListOf<HTMLElement>;

  if (!days.length) {
    console.log("⏳ 草がまだ見つからないので再試行します...");
    return false;
  }

  const currentMonth = new Date().getMonth() + 1;  // 現在の月（1月 = 1）
  const grassColors = getGrassColorsByMonthAndDate(currentMonth as Month) as Record<number, string>;  // 月ごとの草の色

  let count = 0;
  days.forEach((day) => {
    const levelAttr = day.getAttribute('data-level');
    const level = parseInt(levelAttr ?? "0", 10);

    // 月ごとの色（草のレベルに応じて色を取得）
    const color = grassColors[level] ?? grassColors[0] ?? '#ebedf0';
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
export const startColoring = () => {
  const interval = setInterval(() => {
    const success = recolorGrass();
    if (success) clearInterval(interval);
  }, 1000);
};
