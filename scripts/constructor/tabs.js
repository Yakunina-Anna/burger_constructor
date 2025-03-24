export function initTabs() {
  const headerLinks = document.querySelectorAll('.header__item');
  const tabContents = document.querySelectorAll('.tab-content');

  function setActiveLink(targetLink) {
    headerLinks.forEach((link) => {
      link.classList.remove('active_link');
    });
    targetLink.classList.add('active_link');
  }

  function showTab(tabId) {
    tabContents.forEach((tab) => {
      tab.classList.remove('block');
    });
    document.getElementById(tabId).classList.add('block');
  }

  headerLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetTab = link.dataset.tab;
      setActiveLink(link);
      showTab(`${targetTab}-tab`);
    });
  });

  const defaultTab = document.querySelector('.header__item.active_link').dataset.tab;
  showTab(`${defaultTab}-tab`);
}