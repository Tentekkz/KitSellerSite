/* ==========================================================================
   KitSeller — Interactive Logic JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Demo Main Tab Switcher ---
  const demoTabBtns = document.querySelectorAll('.demo-tab-btn');
  const demoTabContents = document.querySelectorAll('.demo-tab-content');

  demoTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      demoTabBtns.forEach(b => b.classList.remove('active'));
      demoTabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetElement = document.getElementById(targetTab);
      if (targetElement) {
        targetElement.classList.add('active');
      }
    });
  });

  // --- 2. Interactive Waybills Preview Generator ---
  const paperRender = document.getElementById('paper-render');
  const formatRadios = document.querySelectorAll('input[name="waybill_format"]');
  const sortItemsBtn = document.getElementById('sort-items');
  const sortDeadlineBtn = document.getElementById('sort-deadline');

  let currentSort = 'items'; // 'items' or 'deadline'

  if (sortItemsBtn && sortDeadlineBtn) {
    sortItemsBtn.addEventListener('click', () => {
      sortItemsBtn.classList.add('active');
      sortDeadlineBtn.classList.remove('active');
      currentSort = 'items';
      renderWaybillPreview();
    });

    sortDeadlineBtn.addEventListener('click', () => {
      sortDeadlineBtn.classList.add('active');
      sortItemsBtn.classList.remove('active');
      currentSort = 'deadline';
      renderWaybillPreview();
    });
  }

  formatRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      document.querySelectorAll('.format-radio-item').forEach(item => item.classList.remove('active'));
      e.target.closest('.format-radio-item').classList.add('active');
      renderWaybillPreview();
    });
  });

  function renderWaybillPreview() {
    if (!paperRender) return;
    const selectedFormat = document.querySelector('input[name="waybill_format"]:checked')?.value || 'thermal';
    const sortLabel = currentSort === 'items' ? 'Сортировка по товарам' : 'Сортировка по дедлайну';

    if (selectedFormat === 'thermal') {
      paperRender.innerHTML = `
        <div class="paper-sheet paper-thermal">
          <div style="font-weight:bold; font-size: 0.875rem; text-align:center; border-bottom:1px solid #000; padding-bottom:4px;">
            KASPI DELIVERY #84920
          </div>
          <div style="margin-top:6px; font-size: 0.7rem; color: #555;">${sortLabel}</div>
          <div class="paper-barcode"></div>
          <div style="font-weight: bold; margin-bottom: 2px;">Смартфон Kaspi Edition X</div>
          <div>Артикул: KSP-9482-BLK</div>
          <div style="margin-top: 6px; font-size: 0.65rem; color: #666;">
            Адрес: г. Алматы, ул. Абая 150<br>
            Дедлайн: сегодня, 18:00
          </div>
        </div>
      `;
    } else if (selectedFormat === 'a4') {
      paperRender.innerHTML = `
        <div class="paper-sheet" style="max-width: 320px; font-size: 0.75rem;">
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid #000; padding-bottom:8px; margin-bottom:10px;">
            <strong>НАКЛАДНАЯ KASPI #84920</strong>
            <span>А4 Лист</span>
          </div>
          <div style="font-size: 0.6875rem; color: #555; margin-bottom: 8px;">${sortLabel}</div>
          <table style="width:100%; font-size:0.6875rem; border-collapse:collapse; margin-bottom:10px;">
            <tr style="background:#eee;">
              <th style="padding:4px; text-align:left;">Товар</th>
              <th style="padding:4px; text-align:right;">Кол-во</th>
            </tr>
            <tr>
              <td style="padding:4px;">Беспроводные наушники Pro</td>
              <td style="padding:4px; text-align:right;">2 шт</td>
            </tr>
            <tr>
              <td style="padding:4px;">Защитное стекло iPhone 15</td>
              <td style="padding:4px; text-align:right;">5 шт</td>
            </tr>
          </table>
          <div class="paper-barcode"></div>
        </div>
      `;
    } else if (selectedFormat === '4up') {
      paperRender.innerHTML = `
        <div class="paper-sheet" style="max-width: 340px;">
          <div style="font-size:0.65rem; color:#666; margin-bottom:6px;">Формат: 4 накладные на 1 лист A4 (${sortLabel})</div>
          <div class="paper-grid-4">
            <div class="mini-ticket"><strong>Заказ #101</strong><br>Наушники x1<br>Дедлайн: 15:00</div>
            <div class="mini-ticket"><strong>Заказ #102</strong><br>Наушники x1<br>Дедлайн: 15:30</div>
            <div class="mini-ticket"><strong>Заказ #103</strong><br>Чехол силикон x3<br>Дедлайн: 16:00</div>
            <div class="mini-ticket"><strong>Заказ #104</strong><br>Зарядное устройство x2<br>Дедлайн: 17:00</div>
          </div>
        </div>
      `;
    } else if (selectedFormat === '9up') {
      paperRender.innerHTML = `
        <div class="paper-sheet" style="max-width: 360px;">
          <div style="font-size:0.65rem; color:#666; margin-bottom:6px;">Сетка 3×3 (9 шт на лист A4) • ${sortLabel}</div>
          <div class="paper-grid-9">
            ${Array.from({ length: 9 }).map((_, i) => `
              <div class="mini-ticket">
                <strong>#${201 + i}</strong><br>Товар A<br>18:00
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  renderWaybillPreview();

  // --- 3. 18-Sheet Excel Report Interactive Explorer ---
  const excelSheetsList = [
    { id: 'sheet-revenue', name: '1. Выручка', data: [
      ['Месяц', 'Заказов', 'Оборот Kaspi (₸)', 'Чистая выручка (₸)'],
      ['Май', '1 240', '18 600 000 ₸', '14 880 000 ₸'],
      ['Июнь', '1 450', '21 750 000 ₸', '17 400 000 ₸'],
      ['Июль', '1 680', '25 200 000 ₸', '20 160 000 ₸']
    ]},
    { id: 'sheet-pnl', name: '2. P&L (Прибыли и убытки)', data: [
      ['Статья доходов/расходов', 'Сумма (₸)', '% от оборота'],
      ['Вал. Оборот Kaspi', '25 200 000 ₸', '100.0%'],
      ['Комиссия Kaspi Магазина', '- 2 520 000 ₸', '- 10.0%'],
      ['Доставка Kaspi Delivery', '- 1 260 000 ₸', '- 5.0%'],
      ['Себестоимость товаров', '- 13 860 000 ₸', '- 55.0%'],
      ['Налог (3% ИП)', '- 756 000 ₸', '- 3.0%'],
      ['Чистая прибыль (EBITDA)', '6 804 000 ₸', '27.0%']
    ]},
    { id: 'sheet-abc', name: '3. ABC-Анализ', data: [
      ['Категория', 'Товаров', 'Доля в выручке', 'Статус'],
      ['Группа A (Топы)', '15 товаров', '80% оборота', 'Приоритет остатков'],
      ['Группа B (Средние)', '35 товаров', '15% оборота', 'Поддержание'],
      ['Группа C (Неликвид)', '50 товаров', '5% оборота', 'Распродажа / Скидки']
    ]},
    { id: 'sheet-waterfall', name: '4. Водопад прибыли', data: [
      ['Этап', 'Сумма (₸)', 'Остаток'],
      ['Выручка', '+25 200 000 ₸', '25 200 000 ₸'],
      ['Минус комиссии', '-2 520 000 ₸', '22 680 000 ₸'],
      ['Минус логистика', '-1 260 000 ₸', '21 420 000 ₸'],
      ['Минус себестоимость', '-13 860 000 ₸', '7 560 000 ₸'],
      ['Чистый остаток на руки', '6 804 000 ₸', '6 804 000 ₸']
    ]},
    { id: 'sheet-cost', name: '5. Себестоимость', data: [
      ['Артикул', 'Наименование', 'Закуп (₸)', 'Маржа (₸)'],
      ['KSP-001', 'Чехол Silicone Shield', '1 200 ₸', '2 800 ₸'],
      ['KSP-002', 'Зарядное устройство 65W', '4 500 ₸', '6 400 ₸']
    ]},
    { id: 'sheet-brands', name: '6. Бренды', data: [
      ['Бренд', 'Продано (шт)', 'Выручка (₸)'],
      ['Anker', '340 шт', '8 500 000 ₸'],
      ['Baseus', '520 шт', '7 800 000 ₸']
    ]},
    { id: 'sheet-products', name: '7. Товары', data: [
      ['Товар', 'Продано', 'Средний чек'],
      ['PowerBank 20000mAh', '210 шт', '14 500 ₸']
    ]},
    { id: 'sheet-delivery', name: '8. Доставка', data: [
      ['Город назначения', 'Заказов', 'Затраты на доставку'],
      ['Алматы', '650', '325 000 ₸'],
      ['Астана', '420', '315 000 ₸'],
      ['Шымкент', '280', '224 000 ₸']
    ]},
    { id: 'sheet-returns', name: '9. Возвраты', data: [
      ['Причина возврата', 'Количество', 'Потери (₸)'],
      ['Не подошёл размер', '12 шт', '180 000 ₸'],
      ['Отмена до получения', '8 шт', '120 000 ₸']
    ]},
    { id: 'sheet-hours', name: '10. По часам', data: [
      ['Час суток', 'Пик заказов', 'Доля'],
      ['12:00 - 15:00', '420 заказов', '35%'],
      ['20:00 - 23:00', '380 заказов', '30%']
    ]},
    { id: 'sheet-days', name: '11. По дням недели', data: [
      ['День недели', 'Заказов', 'Выручка (₸)'],
      ['Понедельник', '210', '3 150 000 ₸'],
      ['Пятница', '340', '5 100 000 ₸']
    ]},
    { id: 'sheet-buyers', name: '12. Сегменты покупателей', data: [
      ['Сегмент', 'Покупателей', 'Повторные покупки'],
      ['Постоянные (2+ заказа)', '320 чел', '42%']
    ]},
    { id: 'sheet-transfers', name: '13. Входящие переводы', data: [
      ['Дата выгрузки', 'Транзакция', 'Сумма (₸)'],
      ['01.08.2026', 'Выплата Kaspi Pay', '4 820 000 ₸']
    ]},
    { id: 'sheet-tax', name: '14. Налоговый отчёт', data: [
      ['Период', 'База налогообложения', 'Налог 3%'],
      ['3 Квартал', '25 200 000 ₸', '756 000 ₸']
    ]},
    { id: 'sheet-commissions', name: '15. Комиссии Kaspi', data: [
      ['Категория товара', 'Процент комиссии', 'Удержано'],
      ['Электроника', '10.0%', '2 520 000 ₸']
    ]},
    { id: 'sheet-warehouse', name: '16. Оборачиваемость склада', data: [
      ['Склад', 'Дней в запасе', 'Остаток в ₸'],
      ['Основной Алматы', '18 дней', '14 200 000 ₸']
    ]},
    { id: 'sheet-forecast', name: '17. Прогноз закупок', data: [
      ['Товар', 'Необходимый заказ', 'Срок поставки'],
      ['Кабель Type-C 2m', '500 шт', 'Предзаказ (7 дней)']
    ]},
    { id: 'sheet-summary', name: '18. Итоговое резюме', data: [
      ['Метрика бизнеса', 'Значение'],
      ['Рентабельность (ROI)', '49.1%'],
      ['Чистая маржа магазина', '27.0%']
    ]}
  ];

  const sheetsNavContainer = document.getElementById('excel-sheets-container');
  const sheetViewerBox = document.getElementById('sheet-viewer-box');

  if (sheetsNavContainer && sheetViewerBox) {
    sheetsNavContainer.innerHTML = '';
    excelSheetsList.forEach((sheet, idx) => {
      const btn = document.createElement('button');
      btn.className = `sheet-tab-btn ${idx === 1 ? 'active' : ''}`;
      btn.textContent = sheet.name;
      btn.addEventListener('click', () => {
        document.querySelectorAll('.sheet-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderExcelSheet(sheet);
      });
      sheetsNavContainer.appendChild(btn);
    });

    renderExcelSheet(excelSheetsList[1]); // Default to P&L sheet
  }

  function renderExcelSheet(sheet) {
    if (!sheetViewerBox) return;
    const tableRows = sheet.data.map((row, index) => {
      const tag = index === 0 ? 'th' : 'td';
      return `<tr>${row.map(cell => `<${tag}>${cell}</${tag}>`).join('')}</tr>`;
    }).join('');

    sheetViewerBox.innerHTML = `
      <div style="font-weight: bold; font-size: 0.9375rem; color: var(--text-primary); margin-bottom: 12px; font-family: var(--font-mono);">
        Лист: ${sheet.name}
      </div>
      <table class="excel-table">
        ${tableRows}
      </table>
    `;
  }

  // --- 4. Repricer Dynamic Calculator Simulator ---
  const simCost = document.getElementById('sim-cost');
  const simMin = document.getElementById('sim-min');
  const simMax = document.getElementById('sim-max');
  const simStep = document.getElementById('sim-step');
  const simCompetitor = document.getElementById('sim-competitor');

  const resPrice = document.getElementById('res-calc-price');
  const resStatus = document.getElementById('res-calc-status');
  const resPos = document.getElementById('res-calc-pos');
  const resMargin = document.getElementById('res-calc-margin');

  const repricerInputs = [simCost, simMin, simMax, simStep, simCompetitor];
  repricerInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateRepricerRule);
    }
  });

  function calculateRepricerRule() {
    if (!simCost || !simMin || !simMax || !simStep || !simCompetitor) return;

    const cost = parseFloat(simCost.value) || 10000;
    const minPrice = parseFloat(simMin.value) || 13500;
    const maxPrice = parseFloat(simMax.value) || 18000;
    const step = parseFloat(simStep.value) || 10;
    const competitorPrice = parseFloat(simCompetitor.value) || 14200;

    let targetPrice = competitorPrice - step;

    if (targetPrice < minPrice) {
      targetPrice = minPrice;
      if (resStatus) resStatus.textContent = 'Упёрлись в минимальную цену. Сохраняем лимит маржи.';
      if (resStatus) resStatus.style.color = '#F5A623';
      if (resPos) resPos.textContent = '2-3 место';
      if (resPos) resPos.className = 'res-m-val text-gold';
    } else if (targetPrice > maxPrice) {
      targetPrice = maxPrice;
      if (resStatus) resStatus.textContent = 'Превышает макс. цену. Установлен верхний предел.';
      if (resStatus) resStatus.style.color = '#9CA3AF';
      if (resPos) resPos.textContent = 'По правилу';
    } else {
      if (resStatus) resStatus.textContent = `Ниже конкурента на ${step} ₸ (цена конкурента: ${competitorPrice.toLocaleString()} ₸)`;
      if (resStatus) resStatus.style.color = '#10B981';
      if (resPos) resPos.textContent = '1 место';
      if (resPos) resPos.className = 'res-m-val text-green';
    }

    const margin = targetPrice - cost;

    if (resPrice) resPrice.textContent = `${targetPrice.toLocaleString()} ₸`;
    if (resMargin) resMargin.textContent = `+${margin.toLocaleString()} ₸ (${((margin/targetPrice)*100).toFixed(1)}%)`;
  }

  calculateRepricerRule();

  // --- 5. FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll('.faq-item');

  // Экранный диктор должен знать, раскрыт ответ или нет: одного класса ему мало.
  const syncFaqAria = () => {
    faqItems.forEach(i => {
      const q = i.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', i.classList.contains('active') ? 'true' : 'false');
    });
  };

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
      syncFaqAria();
    });
  });
  syncFaqAria();

  // --- 5-бис. Закрытие любого модального окна по Esc ---
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


  // --- 14. Thermal Printer Sound & Animation Engine ---
  const btnTestPrint = document.getElementById('btn-test-print');
  const paperRenderWindow = document.getElementById('paper-render');

  const playThermalPrinterAudio = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Step 1: Motor buzz (thermal feed)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);

      // Step 2: Paper cutter click
      setTimeout(() => {
        const clickOsc = ctx.createOscillator();
        const clickGain = ctx.createGain();
        clickOsc.type = 'square';
        clickOsc.frequency.setValueAtTime(600, ctx.currentTime);
        clickGain.gain.setValueAtTime(0.12, ctx.currentTime);
        clickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        clickOsc.connect(clickGain);
        clickGain.connect(ctx.destination);
        clickOsc.start();
        clickOsc.stop(ctx.currentTime + 0.1);
      }, 700);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  };

  if (btnTestPrint && paperRenderWindow) {
    btnTestPrint.addEventListener('click', () => {
      paperRenderWindow.classList.remove('printing-active');
      void paperRenderWindow.offsetWidth; // Trigger DOM reflow for restart
      paperRenderWindow.classList.add('printing-active');
      playThermalPrinterAudio();

      btnTestPrint.innerHTML = '<span>Печать выполнена</span>';
      setTimeout(() => {
        btnTestPrint.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          <span>Тестовая печать наклейки (со звуком)</span>
        `;
      }, 2000);
    });
  }

  // Переключатель RU/KZ снят вместе с кнопкой в шапке: он переводил только
  // пункты меню, а страница оставалась русской. Атрибуты data-i18n в разметке
  // оставлены — они пригодятся, когда появится полный казахский перевод.

});

