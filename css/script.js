// ページスクロール調整
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 110,
      behavior: 'smooth',
    });
  });
});

// facilityの画像クリック時
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.item');
  const popup = document.getElementById('popup');
  const popupImg = document.getElementById('popup-img');
  const popupTitle = document.getElementById('popup-title');
  const popupText = document.getElementById('popup-text'); // 変更: 既存のpタグを取得
  const closeBtn = popup.querySelector('.close');

  // アイテムクリックイベント
  items.forEach((item) => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('.item-img').src;
      const title = item.querySelector('.item-title').textContent;
      const description = item.getAttribute('data-description'); // アイテムのdata-description属性を取得

      // ポップアップにデータを設定
      popupImg.src = imgSrc;
      popupTitle.textContent = title;
      popupText.textContent = description; // 既存のテキスト要素に設定

      // スクロール無効化
      document.body.style.overflow = 'hidden';

      // ポップアップ表示
      popup.classList.add('visible');
    });
  });

  // ポップアップの閉じるボタン
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('visible');

    // スクロールを元に戻す
    document.body.style.overflow = '';
  });

  // ポップアップの外側クリックで閉じる
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.classList.remove('visible');

      // スクロールを元に戻す
      document.body.style.overflow = '';
    }
  });
});
