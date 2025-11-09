
import { createButton } from './grassButton';
import { getGrassColorsByMonthAndDate } from './grassColor';

window.addEventListener('load', () => {
  console.log('Content script loaded');

  // ボタンを作成
  createButton('Grass Badge', 'https://github.com/your-profile/grass-badge', 'grass-badge');
  createButton('Grass Type', 'https://github.com/your-profile/grass-type', 'grass-type');

  // 例: 草の色を月ごとに取得してログに出力
  getGrassColorsByMonthAndDate();
});
