import { isMobile } from '../../utils/breakpoints.js';
/**
 * Инициализирует переключение вкладок (табов) в интерфейсе.
 * @param {string} [forcedTab] - Принудительное открытие указанной вкладки
 */
export function initTabs(forcedTab) {
  const headerLinks = document.querySelectorAll('.header__item');
  const tabContents = document.querySelectorAll('.tab-content');

  function setActiveLink(targetLink) {
    headerLinks.forEach((link) => {
      link.classList.remove('active_link');
    });
    targetLink.classList.add('active_link');
  }

  function showTab(tabId) {
    if (isMobile()) {
      console.log(isMobile())
      tabContents.forEach((tab) => {
      tab.classList.remove('hidden');
      });
    }
    else {
      tabContents.forEach((tab) => {
        tab.classList.add('hidden');
      });
      const tabToShow = document.getElementById(tabId);
      if (tabToShow) {
        tabToShow.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('resize', () => {
  headerLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetTab = link.dataset.tab;
      setActiveLink(link);
      console.log(targetTab);
      showTab(`${targetTab}-tab`);
    });
  });

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
});
}





