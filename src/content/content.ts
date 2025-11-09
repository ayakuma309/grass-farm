import { createButton } from './grassButton';
import { startColoring } from './grassColor'; 

window.addEventListener('load', () => {
  console.log('Content script loaded');

  // ボタンを作成
  createButton('Grass Badge', 'https://github.com/your-profile/grass-badge', 'grass-badge');
  createButton('Grass Type', 'https://github.com/your-profile/grass-type', 'grass-type');

  // 草の色を更新する処理を開始
  startColoring();  // DOMを操作して草の色を変更
});
