import { createButtonSet } from './grassButton';
import { startColoring } from './grassColor';

window.addEventListener('load', () => {
  console.log('Content script loaded');

  // ボタンを作成
  createButtonSet();

  // 草の色を更新する処理を開始
  startColoring();  // DOMを操作して草の色を変更
});
