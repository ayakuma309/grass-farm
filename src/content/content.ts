import { createButton } from './grassButton';
import { startColoring } from './grassColor';

window.addEventListener('load', () => {
  console.log('Content script loaded');

  // ボタンを作成
  createButton('Grass Badge', 'https://my-grass-garden-front.vercel.app/', 'grass-badge');
  createButton('Grass Type', 'https://grass-type.vercel.app/', 'grass-type');

  // 草の色を更新する処理を開始
  startColoring();  // DOMを操作して草の色を変更
});
