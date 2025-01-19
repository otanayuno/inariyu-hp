document.addEventListener('DOMContentLoaded', () => {
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

  // 右下アイコンページを一番上にスクロール
  const scrollToTopButton = document.getElementById('scrollToTop');

  scrollToTopButton.onclick = function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // popup時
  // facilityの画像クリック時
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

  // フロア切り替え
  const floor1Button = document.querySelector('.floor-1');
  const floor2Button = document.querySelector('.floor-2');
  const facility1 = document.querySelector('.f-facility-1');
  const facility2 = document.querySelector('.f-facility-2');

  // デフォルトで1階を表示
  facility1.style.display = 'block';
  facility1.classList.add('visible');
  floor1Button.classList.add('active');

  const showFacility = (toShow, toHide) => {
    toHide.classList.remove('visible');
    toHide.style.display = 'none';
    toShow.style.display = 'block';
    setTimeout(() => toShow.classList.add('visible'), 50);
  };

  floor1Button.addEventListener('click', () => {
    if (!facility1.classList.contains('visible')) {
      showFacility(facility1, facility2);
      floor1Button.classList.add('active');
      floor2Button.classList.remove('active');
    }
  });

  floor2Button.addEventListener('click', () => {
    if (!facility2.classList.contains('visible')) {
      showFacility(facility2, facility1);
      floor2Button.classList.add('active');
      floor1Button.classList.remove('active');
    }
  });

  // スクロールアニメーション
  const scrollElements = document.querySelectorAll('.scroll-animation');

  const elementInView = (el, offset = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
    );
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        el.classList.add('visible');
      } else {
        el.classList.remove('visible');
      }
    });
  };

  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation();

  // ハンバーガーメニュー
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  hamburger.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('active');
  });

  document.addEventListener('click', (event) => {
    if (
      menu.classList.contains('active') &&
      !menu.contains(event.target) &&
      !hamburger.contains(event.target)
    ) {
      menu.classList.remove('active');
    }
  });
});
