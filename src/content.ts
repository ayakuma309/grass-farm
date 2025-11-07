console.log("🌿 GitHub Grass Color Changer loaded!");

const pinkLevels: Record<number, string> = {
  0: "#ebedf0",  // 背景
  1: "#ffd6e8",
  2: "#ff99c1",
  3: "#ff4da6",
  4: "#ff0080"
};

function recolorGrass(): boolean {
  const days = document.querySelectorAll('td.ContributionCalendar-day');
  if (!days.length) {
    console.log("⏳ 草がまだ見つからないので再試行します...");
    return false;
  }

  let count = 0;
  days.forEach((day) => {
    const level = parseInt(day.getAttribute('data-level') ?? "0", 10);
    if (level > 0) {
      const color: string = pinkLevels[level] ?? pinkLevels[0]!;
      (day as HTMLElement).style.backgroundColor = color;
      count++;
    }
  });

  console.log(`🌸 ${count} 個の草をピンクにしました！`);
  return true;
}

const interval = setInterval(() => {
  const success = recolorGrass();
  if (success) clearInterval(interval);
}, 1000);
