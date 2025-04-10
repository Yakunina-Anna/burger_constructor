import { isMobile } from '../../utils/breakpoints.js';

/**
 * Инициализирует переключение вкладок (табов) в интерфейсе.
 * @param {string} [forcedTab] - Принудительное открытие указанной вкладки
 */
export function initTabs(forcedTab) {
  const headerLinks = document.querySelectorAll('.header__item');
  const tabContents = document.querySelectorAll('.tab-content');

  // Функция для активации выбранной вкладки
  function setActiveLink(targetLink) {
    headerLinks.forEach((link) => {
      link.classList.remove('active_link');
    });
    targetLink.classList.add('active_link');
  }

  // Функция для отображения нужной вкладки
  function showTab(tabId) {
    const isMobileDevice = isMobile();
    const tabToShow = document.getElementById(tabId);

    tabContents.forEach((tab) => {
      if (isMobileDevice) {
        tab.classList.remove('hidden');
      } else {
        tab.classList.add('hidden');
      }
    });

    if (tabToShow) {
      if (!isMobileDevice) {
        tabToShow.classList.remove('hidden');
      }
      scrollToTab(tabToShow);
    }
  }

  function scrollToTab(tabElement) {
    tabElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }

  // Функция для настройки обработчиков событий
  function setupEventListeners() {
    headerLinks.forEach((link) => {
      link.removeEventListener('click', handleTabClick);
      link.addEventListener('click', handleTabClick);
    });

    // Обработчик клика на кнопке "Перейти к конструктору"
    document.getElementById('go-to-constructor')?.addEventListener('click', () => {
      initTabs('burger');

      const tabsContainer = document.querySelector('.tabs-container');
      if (tabsContainer) {
        scrollToTab(tabsContainer);
      }
    });
  }

  // Обработчик клика по вкладке
  function handleTabClick(event) {
    event.preventDefault();
    const targetTab = event.currentTarget.dataset.tab;
    setActiveLink(event.currentTarget);
    showTab(`${targetTab}-tab`);
  }

  // Обработчик изменения размера окна
  function handleResize() {
    if (forcedTab) {
      const tabLink = document.querySelector(`.header__item[data-tab="${forcedTab}"]`);
      if (tabLink) {
        setActiveLink(tabLink);
        showTab(`${forcedTab}-tab`);
      }
    } else {
      const defaultTab = document.querySelector('.header__item.active_link')?.dataset.tab;
      if (defaultTab) {
        showTab(`${defaultTab}-tab`);
      }
    }
  }

  // Инициализация
  function initialize() {
    setupEventListeners();
    handleResize();
    window.addEventListener('resize', handleResize);
  }

  initialize();
}