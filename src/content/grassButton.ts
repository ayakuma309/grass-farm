export function createButton(text: string, link: string, id?: string): void {
  const button: HTMLButtonElement = document.createElement('button');
  console.log('Button created:', button); // デバッグ用

  if (id) {
    button.id = id;
  }
  button.innerText = text;
  button.style.margin = '10px';
  button.style.padding = '10px 20px';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#28a745';
  button.style.color = '#fff';
  button.style.border = 'none';
  button.style.borderRadius = '5px';
  button.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
  button.style.transition = 'transform 0.2s ease-in-out';

  // ホバー時のエフェクト
  button.addEventListener('mouseover', () => {
    button.style.transform = 'scale(1.05)';
  });

  button.addEventListener('mouseout', () => {
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('click', () => {
    window.open(link, '_blank');
  });

  // MutationObserverを使って、Contributionsセクションの変更を監視する
  const observer = new MutationObserver(() => {
    const contributionsSection = document.querySelector('.js-yearly-contributions'); // Contributions in the last year セクション
    if (contributionsSection && contributionsSection.parentElement) {
      // ボタンをセクションの上に追加
      contributionsSection.parentElement.insertBefore(button, contributionsSection);
      console.log('Button added to the page'); // デバッグ用
      observer.disconnect();  // ボタンが追加されたら監視を停止
    } else {
      console.log('Contributions section not found');
    }
  });

  // DOMの変更を監視開始
  observer.observe(document.body, { childList: true, subtree: true });

  // 最初に試してみて、すぐに追加されない場合の再試行
  setTimeout(() => {
    const contributionsSection = document.querySelector('.js-yearly-contributions');
    if (contributionsSection && contributionsSection.parentElement) {
      contributionsSection.parentElement.insertBefore(button, contributionsSection);
      console.log('Button added to the page');
    }
  }, 1000); // 1秒後に一度試してみる
}
