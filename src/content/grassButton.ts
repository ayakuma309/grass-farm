export function createButtonSet(): void {
  // ボタンを囲むコンテナを作成
  const container = document.createElement('div');
  container.style.display = 'flex'; // 横並びにする
  container.style.alignItems = 'center'; // 画像とボタンを垂直中央揃え
  container.style.margin = '20px auto';
  container.style.justifyContent = 'center'; // 画面中央に配置

  // 画像（農夫さん）の設定
  const farmerImg = document.createElement('img');
  farmerImg.src = '/images/farmer.png'; // 画像のパスを指定
  farmerImg.alt = 'Farmer';
  farmerImg.style.width = '50px'; // 画像のサイズ
  farmerImg.style.height = '50px';
  farmerImg.style.marginRight = '20px'; // 画像とボタンの間隔を設定

  // バッジボタン作成（badge と type のボタン）
  const badgeButton = createButton('Grass Badge', 'https://my-grass-garden-front.vercel.app/', 'badge');
  const typeButton = createButton('Grass Type', 'https://grass-type.vercel.app/', 'type');

  // ボタンをコンテナに追加
  container.appendChild(farmerImg);
  container.appendChild(badgeButton);
  container.appendChild(typeButton);

  // ページに追加
  const observer = new MutationObserver(() => {
    const contributionsSection = document.querySelector('.js-yearly-contributions');
    if (contributionsSection && contributionsSection.parentElement) {
      contributionsSection.parentElement.insertBefore(container, contributionsSection);
      console.log('Button set added to the page');
      observer.disconnect();
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// createButtonを単独でボタン作成に使う
function createButton(text: string, link: string, buttonType: 'badge' | 'type'): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement('button');

  // 色設定
  let buttonColor = '';
  if (buttonType === 'badge') {
    buttonColor = '#3F7437'; // Grass Badge
  } else if (buttonType === 'type') {
    buttonColor = '#CAE366'; // Grass Type
  }

  // ボタンのスタイル設定
  button.style.padding = '12px 30px';
  button.style.fontSize = '18px';
  button.style.fontWeight = 'bold';
  button.style.cursor = 'pointer';
  button.style.border = '2px solid transparent';
  button.style.borderRadius = '50px';
  button.style.backgroundColor = buttonColor;
  button.style.color = '#fff';
  button.style.transition = 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out';

  // ボタンのテキストを設定
  button.innerText = text;

  // クリックイベント
  button.addEventListener('click', () => {
    // <a> タグを作成して rel 属性を追加する
    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer'; // セキュリティ対策として rel 属性を追加

    // <a> タグをクリックして新しいタブを開く
    anchor.click();
  });

  // ホバー時の効果
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.1)';
    button.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.3)';
  });

  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
    button.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
  });

  return button;
}
