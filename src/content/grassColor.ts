import { getGrassColorsByMonthAndDate } from "../utils/season";

console.log("🌿 GitHub Grass Color Changer loaded!");

// 現在の日付に応じた色を取得（イベント優先）
const grassColors = getGrassColorsByMonthAndDate();

function recolorGrass(): boolean {
  const days = document.querySelectorAll('td.ContributionCalendar-day');
  if (!days.length) {
    console.log("⏳ 草がまだ見つからないので再試行します...");
    return false;
  }

  let count = 0;
  days.forEach((day) => {
    const level = parseInt(day.getAttribute('data-level') ?? "0", 10);
    if (level >= 0) {
      const color: string = grassColors[level] ?? grassColors[0]!;
      (day as HTMLElement).style.backgroundColor = color;
      count++;
    }
  });

  const today = new Date();
  console.log(`🌱 ${count} 個の草を ${today.getMonth() + 1}/${today.getDate()} カラーにしました！`);
  return true;
}

// 要素が出るまで繰り返す
const interval = setInterval(() => {
  const success = recolorGrass();
  if (success) clearInterval(interval);
}, 1000);
