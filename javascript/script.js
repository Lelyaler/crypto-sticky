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
        
        entry.target.querySelector('.top__title').classList.add('animate');

        
        topItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate');
          }, index * 100); 
        });

        topObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

topObserver.observe(topSection);

function showToast(message) {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3200);
}

const allModals = document.querySelectorAll('dialog.modal');
allModals.forEach((dialog) => {
  
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) dialog.close();
    });
  }
});

document.querySelectorAll('[data-close-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('dialog');
    if (dialog) dialog.close();
  });
});

function openBidModal({ title, author, price, img }) {
  const modal = document.getElementById('modal-bid');
  if (!modal) return;
  const nameEl = document.getElementById('modal-bid-name');
  const authorEl = document.getElementById('modal-bid-author');
  const currentEl = document.getElementById('modal-bid-current');
  const imgEl = document.getElementById('modal-bid-img');
  const inputEl = document.getElementById('bid-amount');
  const view = modal.querySelector('.modal-bid__view');
  const success = modal.querySelector('.modal-bid__success');

  if (nameEl && title) nameEl.textContent = title;
  if (authorEl && author) authorEl.textContent = author;
  if (currentEl && price) currentEl.textContent = price;
  if (imgEl && img) imgEl.src = img;

  if (inputEl && price) {
    const num = parseFloat(price.replace(/[^0-9.]/g, '')) || 0.02;
    const nextBid = (num + 0.005).toFixed(3);
    inputEl.min = nextBid;
    inputEl.value = nextBid;
  }

  if (view) view.hidden = false;
  if (success) success.hidden = true;

  modal.showModal();
}

document.querySelectorAll('.bid-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const input = document.getElementById('bid-amount');
    if (input) {
      const step = parseFloat(chip.dataset.step) || 0.01;
      const current = parseFloat(input.value) || 0;
      input.value = (current + step).toFixed(3);
    }
  });
});

const bidForm = document.getElementById('bid-form');
if (bidForm) {
  bidForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.getElementById('modal-bid');
    const view = modal.querySelector('.modal-bid__view');
    const success = modal.querySelector('.modal-bid__success');
    const confirmedAmount = document.getElementById('modal-bid-confirmed-amount');
    const amountInput = document.getElementById('bid-amount');

    if (confirmedAmount && amountInput) {
      confirmedAmount.textContent = `${amountInput.value} ETH`;
    }
    if (view && success) {
      view.hidden = true;
      success.hidden = false;
    }
    showToast(`Ставка ${amountInput.value} ETH отправлена в сеть!`);
  });
}

const heroBidBtn = document.querySelector('.auction-bet-section__btn');
if (heroBidBtn) {
  heroBidBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openBidModal({
      title: 'Witcherrr_3 (xml_t5)',
      author: 'Geralt_NFT',
      price: '0.10 ETH',
      img: 'img/c-2.webp'
    });
  });
}

const heroBuyBtn = document.querySelector('.hero__btn--fill');
if (heroBuyBtn) {
  heroBuyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openBidModal({
      title: 'Alien (green) e_e',
      author: 'Frank.Nagval',
      price: '0.02 ETH',
      img: 'img/auction-1.webp'
    });
  });
}

document.querySelectorAll('.auction__item').forEach((item) => {
  const card = item.querySelector('.auction-product');
  if (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      const title = card.querySelector('.auction-product__title')?.textContent.trim() || 'Sticker Lot';
      const author = card.querySelector('.auction-owner__nickname')?.textContent.trim() || 'Artist';
      const price = card.querySelector('.auction-product__price')?.textContent.trim() || '0.02 ETH';
      const img = card.querySelector('.auction-product__image img')?.getAttribute('src') || 'img/auction-1.webp';
      openBidModal({ title, author, price, img });
    });
  }
});

const auctionMoreBtn = document.querySelector('.auction__more');
if (auctionMoreBtn) {
  auctionMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const catModal = document.getElementById('modal-catalog');
    if (catModal) catModal.showModal();
  });
}

document.querySelectorAll('.modal-catalog__card').forEach((card) => {
  card.addEventListener('click', () => {
    const catModal = document.getElementById('modal-catalog');
    if (catModal) catModal.close();
    openBidModal({
      title: card.dataset.bidTitle,
      author: card.dataset.bidAuthor,
      price: card.dataset.bidPrice,
      img: card.dataset.bidImg
    });
  });
});

const walletBtn = document.querySelector('.header__btn');
if (walletBtn) {
  walletBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const modal = document.getElementById('modal-wallet');
    if (modal) modal.showModal();
  });
}

document.querySelectorAll('.wallet-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const walletName = btn.dataset.wallet || 'Кошелёк';
    const modal = document.getElementById('modal-wallet');
    if (modal) modal.close();
    if (walletBtn) {
      walletBtn.innerHTML = '<img src="img/icon-wallet.svg" alt="" width="16" height="16" class="header__btn-icon" />0x71C...4F9B';
      walletBtn.style.background = 'linear-gradient(135deg, #46f4db 0%, #57d272 100%)';
      walletBtn.style.color = '#07060b';
    }
    showToast(`${walletName} успешно подключён!`);
  });
});

if (subscribeForm) {
  subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const feedbackModal = document.getElementById('modal-feedback');
    const titleEl = document.getElementById('modal-feedback-title');
    const descEl = document.getElementById('modal-feedback-desc');
    if (titleEl) titleEl.textContent = 'Подписка оформлена!';
    if (descEl) descEl.textContent = 'Спасибо за подписку! Мы будем присылать вам только важные новости и анонсы дропов.';
    if (feedbackModal) feedbackModal.showModal();
    subscribeForm.reset();
  });
}

const fileInput = document.querySelector('.become-author__file .file__input');
const fileContent = document.querySelector('.become-author__file .file__content');
if (fileInput && fileContent) {
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files[0]) {
      fileContent.textContent = fileInput.files[0].name;
    }
  });
}

const authorBtn = document.querySelector('.become-author__btn');
if (authorBtn) {
  authorBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const feedbackModal = document.getElementById('modal-feedback');
    const titleEl = document.getElementById('modal-feedback-title');
    const descEl = document.getElementById('modal-feedback-desc');
    if (titleEl) titleEl.textContent = 'Заявка отправлена кураторам!';
    if (descEl) descEl.textContent = 'Спасибо! Наши кураторы рассмотрят ваши работы и свяжутся с вами в Telegram в течение 24 часов.';
    if (feedbackModal) feedbackModal.showModal();
  });
}

const faqItems = document.querySelectorAll('.faq__item');
faqItems.forEach((item) => {
  const btn = item.querySelector('.faq__question');
  if (btn) {
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq__item--open');
      faqItems.forEach((other) => other.classList.remove('faq__item--open'));
      if (!isOpen) {
        item.classList.add('faq__item--open');
      }
    });
  }
});

const yearEl = document.querySelector('.footer__year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const burgerBtn = document.querySelector('.header__burger');
const navMenu = document.querySelector('.header__nav');
const navOverlay = document.getElementById('nav-overlay');

function toggleMobileNav(state) {
  const isOpen = typeof state === 'boolean' ? state : !navMenu.classList.contains('is-open');
  if (burgerBtn) {
    burgerBtn.classList.toggle('is-active', isOpen);
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  }
  if (navMenu) {
    navMenu.classList.toggle('is-open', isOpen);
  }
  if (navOverlay) {
    navOverlay.classList.toggle('is-open', isOpen);
  }
  document.body.classList.toggle('nav-locked', isOpen);
}

if (burgerBtn) {
  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileNav();
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', () => {
    toggleMobileNav(false);
  });
}

const dropdownItems = document.querySelectorAll('.nav__item--dropdown');
dropdownItems.forEach((item) => {
  const link = item.querySelector('.nav__link');
  if (link) {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        const isOpen = item.classList.contains('is-open');
        dropdownItems.forEach((other) => other.classList.remove('is-open'));
        if (!isOpen) {
          item.classList.add('is-open');
        }
      }
    });
  }
});

document.querySelectorAll('.header__nav .nav__link:not(.nav__item--dropdown .nav__link), .header__nav .nav__sublink').forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      toggleMobileNav(false);
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    toggleMobileNav(false);
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    toggleMobileNav(false);
    dropdownItems.forEach((item) => item.classList.remove('is-open'));
  }
});
