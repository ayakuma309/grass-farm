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

    // levelがNaNの場合、デフォルトの0に設定
    if (isNaN(level)) {
      console.warn("⚠️ 無効な data-level 値が見つかりました。デフォルト値（0）を使用します。");
    }

    const color = grassColors[level] ?? grassColors[0] ?? '#ebedf0'; // levelに対応する色がない場合は、デフォルトの草色か灰色を使用

    // 背景色を設定
    (day as HTMLElement).style.backgroundColor = color;
    count++;
  });

  const today = new Date();
  console.log(`🌱 ${count} 個の草を ${today.getMonth() + 1}/${today.getDate()} カラーにしました！`);

  // 草が一度も設定されなかった場合、再試行の必要があることをログに出力
  if (count === 0) {
    console.log("⏳ 草の色変更が行われませんでした。再試行します...");
    return false;
  }

  return true;
}

// 要素が出るまで繰り返す
const interval = setInterval(() => {
  const success = recolorGrass();
  if (success) clearInterval(interval);
}, 1000);
