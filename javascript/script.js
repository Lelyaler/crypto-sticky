// Swiper инициализация
const swiper = new Swiper('.new__slider', {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
  }
});

// Анимация для auction-bet-section
const betSection = document.querySelector('.auction-bet-section');

const betObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        betSection.classList.add('animate');
        betObserver.unobserve(betSection);
      }
    });
  },
  { threshold: 0.3 }
);

betObserver.observe(betSection);

// Анимация для auction
const auctionSection = document.querySelector('.auction');
const auctionItems = document.querySelectorAll('.auction__item');

const auctionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        auctionSection.classList.add('animate');
        auctionItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 100);
        });
        auctionObserver.unobserve(auctionSection);
      }
    });
  },
  { threshold: 0.2 }
);

auctionObserver.observe(auctionSection);

const newSection = document.querySelector('.new');
const stickerPictures = newSection.querySelectorAll('.new__stickers picture');

const newObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Добавляем анимацию к каждому стикеру с задержкой
        stickerPictures.forEach((pic, index) => {
          pic.classList.add('animate');
          pic.style.transitionDelay = `${index * 0.1}s`;
        });

        newObserver.unobserve(newSection);
      }
    });
  },
  { threshold: 0.3 }
);

newObserver.observe(newSection);
const subscribeSection = document.querySelector('.subscribe');
const subscribeTitle = subscribeSection.querySelector('.subscribe__title');
const subscribeForm = subscribeSection.querySelector('.subscribe-form');

const subscribeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        subscribeSection.classList.add('animate');
        subscribeObserver.unobserve(subscribeSection);
      }
    });
  },
  { threshold: 0.3 }
);

subscribeObserver.observe(subscribeSection);
const becomeAuthorSection = document.querySelector('.become-author');
const becomeAuthorContent = becomeAuthorSection.querySelector(
  '.become-author__content'
);
const becomeAuthorText = becomeAuthorSection.querySelector(
  '.become-author__text'
);
const becomeAuthorForm = becomeAuthorSection.querySelector(
  '.become-author__form'
);

const becomeAuthorObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        becomeAuthorContent.classList.add('animate');
        setTimeout(() => {
          becomeAuthorText.classList.add('animate');
        }, 100);
        setTimeout(() => {
          becomeAuthorForm.classList.add('animate');
        }, 200);
        becomeAuthorObserver.unobserve(becomeAuthorSection);
      }
    });
  },
  { threshold: 0.3 }
);

becomeAuthorObserver.observe(becomeAuthorSection);
const topSection = document.querySelector('.top');
const topItems = document.querySelectorAll('.top__item');

const topObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Анимация заголовка
        entry.target.querySelector('.top__title').classList.add('animate');

        // Последовательная анимация карточек товаров
        topItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 100); // Задержка 100мс между анимациями
        });

        topObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

topObserver.observe(topSection);
