/* ==========================================================================
   KitSeller — Interactive Logic JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Демо-блоки (вкладки, предпросмотр накладных, разбор Excel, симулятор
  // репрайсера, звук термопринтера) и аккордеон FAQ удалены вместе со своими
  // секциями. Разметка FAQPage для поиска убрана там же: держать её без
  // видимых на странице вопросов нельзя — поисковики считают это обманом.

  // --- Закрытие любого модального окна по Esc ---
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
  });

  // --- 6. QR Login Modal Simulator ---
  const qrLoginBtn = document.getElementById('btn-qr-login');
  const qrModal = document.getElementById('qr-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  if (qrLoginBtn && qrModal) {
    qrLoginBtn.addEventListener('click', () => {
      qrModal.classList.add('active');
    });

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => {
        qrModal.classList.remove('active');
      });
    }

    qrModal.addEventListener('click', (e) => {
      if (e.target === qrModal) {
        qrModal.classList.remove('active');
      }
    });
  }

  // --- 7. Theme Switcher Engine ---
  // Тему уже поставил встроенный скрипт в <head> — здесь только переключатель.
  const themeToggleBtn = document.getElementById('theme-toggle');

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('kitseller-theme', newTheme);
    });
  }

  // --- 8. Мобильное меню убрано вместе с навигацией в шапке ---

  // --- 9. Smooth IntersectionObserver Scroll Reveal ---
  const revealElements = document.querySelectorAll('.pain-card, .feature-card, .step-card, .pricing-card, .stat-card, .testimonial-card, .reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // --- 10. Cookie Consent Toast Banner ---
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAcceptBtn = document.getElementById('cookie-accept-btn');
  const cookieCloseBtn = document.getElementById('cookie-close-btn');

  if (cookieBanner) {
    const isCookieAccepted = localStorage.getItem('kitseller-cookie-accepted');
    if (!isCookieAccepted) {
      setTimeout(() => {
        cookieBanner.classList.add('show');
      }, 1500);
    }

    const dismissCookieBanner = () => {
      cookieBanner.classList.remove('show');
      localStorage.setItem('kitseller-cookie-accepted', 'true');
    };

    if (cookieAcceptBtn) cookieAcceptBtn.addEventListener('click', dismissCookieBanner);
    if (cookieCloseBtn) cookieCloseBtn.addEventListener('click', dismissCookieBanner);
  }

  // --- 11. Legal / Privacy Policy & Offer Modal ---
  const privacyModal = document.getElementById('privacy-modal');
  const privacyModalClose = document.getElementById('privacy-modal-close');
  const btnPrivacy = document.getElementById('btn-privacy');
  const btnTerms = document.getElementById('btn-terms');
  const legalModalTitle = document.getElementById('legal-modal-title');
  const legalModalSubtitle = document.getElementById('legal-modal-subtitle');
  const legalModalBadge = document.getElementById('legal-modal-badge');
  const legalModalFullpageLink = document.getElementById('legal-modal-fullpage-link');
  const legalModalDownloadLink = document.getElementById('legal-modal-download-link');
  const legalModalBody = document.getElementById('legal-modal-body');

  if (privacyModal) {
    const openLegalModal = ({ title, subtitle, badge, fullUrl, docxUrl, contentHtml }) => {
      if (legalModalTitle) legalModalTitle.textContent = title;
      if (legalModalSubtitle) legalModalSubtitle.textContent = subtitle || 'Официальные документы сервиса KitSeller · ИП Path of Peaks';
      if (legalModalBadge) legalModalBadge.textContent = badge || 'Редакция от 13 августа 2026';
      if (legalModalFullpageLink) {
        legalModalFullpageLink.setAttribute('href', fullUrl);
      }
      if (legalModalDownloadLink) {
        legalModalDownloadLink.setAttribute('href', docxUrl);
      }
      if (legalModalBody && contentHtml) {
        legalModalBody.innerHTML = contentHtml;
      }
      privacyModal.classList.add('active');
    };

    const privacyContentHtml = `
      <h4>1. О чём этот документ</h4>
      <p>KitSeller — сервис для продавцов Kaspi: бот в Telegram и личный кабинет на сайте. Оператор сервиса — <strong>ИП Path of Peaks</strong>, Республика Казахстан.</p>
      <p>Документ описывает, какие данные сервис получает, зачем они нужны, сколько хранятся и как их удалить. Редакция от 13 августа 2026 года.</p>

      <h4>2. Данные продавца и данные его покупателей — разные вещи</h4>
      <p>Через сервис проходят данные двух видов, и отношение к ним разное:</p>
      <ul>
        <li><strong>Данные продавца</strong> — того, кто пользуется сервисом. Здесь оператором выступает ИП Path of Peaks, а основанием обработки — согласие продавца, которое он даёт при первом входе.</li>
        <li><strong>Данные покупателей продавца</strong> — имена, телефоны и адреса доставки из его магазина на Kaspi. Оператором этих данных остаётся сам продавец. Сервис обрабатывает их по поручению продавца и только для того, чтобы показать ему его же заказы.</li>
      </ul>

      <h4>3. Какие данные продавца обрабатываются</h4>
      <ul>
        <li>Telegram ID, имя и username — чтобы узнавать пользователя и писать ему</li>
        <li>Выбранный язык интерфейса и настройки разделов</li>
        <li>Тариф, даты начала и окончания подписки, признак пробного периода</li>
        <li>Сведения об оплатах: сумма, дата, номер счёта, статус платежа</li>
        <li>Пароль от личного кабинета на сайте — в защищённом виде, прочитать его нельзя</li>
        <li>Журнал действий в сервисе: какими разделами и когда пользовались</li>
      </ul>

      <h4>4. Доступ к кабинету Kaspi</h4>
      <p>Часть возможностей — работа с ценами, остатками, заказами и отзывами — требует доступа к кабинету продавца на Kaspi. Продавец подключает его сам, и тогда сервис хранит:</p>
      <ul>
        <li>токен Kaspi Shop API, который продавец создаёт в своём кабинете</li>
        <li>логин и пароль от кабинета Kaspi — если продавец выбрал вход по паролю</li>
        <li>служебные cookies рабочей сессии с Kaspi</li>
      </ul>
      <p>Всё перечисленное хранится в зашифрованном виде и используется только для запросов к Kaspi от имени этого продавца. Отключить доступ можно в любой момент кнопкой «Отключить кабинет» — ключи и cookies при этом удаляются.</p>

      <h4>5. Данные покупателей</h4>
      <p>Из кабинета Kaspi сервис получает заказы продавца: имя покупателя, номер заказа, состав и сумма, адрес доставки или пункт выдачи. Эти сведения используются только для отображения заказов и статистики. Они не передаются другим продавцам, не используются в рекламе и не продаются.</p>

      <h4>6. Файлы, которые загружает продавец</h4>
      <p>Отчёты и накладные из Kaspi (ZIP, XLSX, PDF) разбираются в памяти сервера и не сохраняются файлами. В базе остаётся только результат разбора для аналитики.</p>

      <h4>7. Зачем всё это нужно</h4>
      <ul>
        <li>предоставить оплаченные возможности сервиса</li>
        <li>управлять доступом и продлением подписки</li>
        <li>присылать уведомления о заказах, отзывах и окончании подписки</li>
        <li>отвечать на обращения в поддержку и устранять ошибки</li>
      </ul>

      <h4>8. Кому данные доступны</h4>
      <p>Сервис не продаёт и не передаёт данные третьим лицам в коммерческих целях. Данные проходят через инфраструктуру сервиса (Telegram, Kaspi, хостинг-провайдер). Передача госорганам возможна только при наличии законных требований законодательства Республики Казахстан.</p>

      <h4>9. Сколько хранится и как удалить</h4>
      <p>Данные хранятся, пока продавец пользуется сервисом. Удалить их можно самостоятельно в личном кабинете («Опасная зона») или запросом на почту <strong>ergazin013@gmail.com</strong>.</p>

      <h4>10. Как данные защищены</h4>
      <p>Пароли и ключи зашифрованы, сайт работает исключительно по защищённому HTTPS-протоколу, авторизация осуществляется по защищённому QR-коду с ограничением времени сессии.</p>

      <h4>11. Контакты</h4>
      <p><strong>ИП Path of Peaks</strong>, Республика Казахстан<br>Почта: ergazin013@gmail.com · Telegram: @peaks_kz</p>
    `;

    const offerContentHtml = `
      <h4>1. Общие положения</h4>
      <p><strong>ИП Path of Peaks</strong> (далее — Администратор) предлагает любому дееспособному лицу (далее — Пользователь) заключить договор на оказание услуг сервиса KitSeller на условиях публичной оферты. Акцептом считается нажатие кнопки согласия при первом входе, начало пробного периода или оплата подписки. Редакция от 13 августа 2026 года.</p>

      <h4>2. Предмет договора</h4>
      <p>Администратор предоставляет Пользователю доступ к сервису KitSeller (Telegram-бот и личный кабинет):</p>
      <ul>
        <li>разбор накладных и отчётов Kaspi, печать документов на термопринтере и А4</li>
        <li>аналитику продаж, себестоимости и чистой прибыли</li>
        <li>калькулятор юнит-экономики и курсы валют</li>
        <li>личный кабинет: товары, цены, остатки, склады, заказы</li>
        <li>автоматическое изменение цен по заданным правилам (репрайсер)</li>
        <li>уведомления о новых заказах, отзывах и возвратах</li>
      </ul>

      <h4>3. Тарифы и стоимость</h4>
      <ul>
        <li><strong>Стандарт</strong> — 990 ₸ за 31 день</li>
        <li><strong>Про+</strong> — 9 990 ₸ за 31 день</li>
      </ul>

      <h4>4. Пробный период и оплата</h4>
      <p>Новому Пользователю может предоставляться бесплатный пробный доступ. Оплата производится через Kaspi по QR-коду или счёту. Автоматических скрытых списаний нет.</p>

      <h4>5. Возврат средств</h4>
      <p>Пользователь вправе вернуть оплату в течение 3 календарных дней с момента платежа, если платными возможностями тарифа он не пользовался. Заявление направляется в Telegram @peaks_kz или на почту ergazin013@gmail.com.</p>

      <h4>6. Ответственность</h4>
      <ul>
        <li>Решения о ценах, закупках и работе магазина Пользователь принимает самостоятельно.</li>
        <li>Администратор не несёт ответственности за действия площадки Kaspi и изменения её правил.</li>
        <li>Общий предел ответственности Администратора ограничен суммой, уплаченной Пользователем за текущий период подписки.</li>
      </ul>

      <h4>7. Реквизиты</h4>
      <p><strong>ИП Path of Peaks</strong>, Республика Казахстан<br>Почта: ergazin013@gmail.com · Telegram: @peaks_kz</p>
    `;

    if (btnPrivacy) {
      btnPrivacy.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal({
          title: 'Политика конфиденциальности KitSeller',
          subtitle: 'Безопасность ваших данных и правила работы KitSeller · ИП Path of Peaks',
          badge: 'Редакция от 13 августа 2026',
          fullUrl: '/privacy.html',
          docxUrl: '/docs/privacy.docx',
          contentHtml: privacyContentHtml
        });
      });
    }

    if (btnTerms) {
      btnTerms.addEventListener('click', (e) => {
        e.preventDefault();
        openLegalModal({
          title: 'Договор публичной оферты KitSeller',
          subtitle: 'Условия оказания услуг сервиса KitSeller · ИП Path of Peaks',
          badge: 'Редакция от 13 августа 2026',
          fullUrl: '/offer.html',
          docxUrl: '/docs/offer.docx',
          contentHtml: offerContentHtml
        });
      });
    }

    if (privacyModalClose) {
      privacyModalClose.addEventListener('click', () => {
        privacyModal.classList.remove('active');
      });
    }

    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) {
        privacyModal.classList.remove('active');
      }
    });
  }


  // Переключатель RU/KZ снят вместе с кнопкой в шапке: он переводил только
  // пункты меню, а страница оставалась русской. Атрибуты data-i18n в разметке
  // оставлены — они пригодятся, когда появится полный казахский перевод.

});

