import { breakpoints } from './breakpoints.js';

// Функция для определения текущего размера экрана
function getScreenSize() {
  const width = window.innerWidth;
  if (width < breakpoints.mobile) return 'mobile';
  if (width < breakpoints.tablet) return 'tablet';
  return 'desktop';
}

/**
 * Управляет видимостью элемента в зависимости от размера экрана и флага инверсии.
 * @param {string} selector - Селектор элемента.
 * @param {boolean} invert - Флаг инверсии. Если true, поведение меняется на противоположное.
 */
export function toggleElementVisibility(selector, invert = false) {
  const screenSize = getScreenSize();
  const element = document.querySelector(selector);

  if (!element) {
    console.warn(`Элемент с селектором "${selector}" не найден.`);
    return;
  }

  const shouldHideOnMobile = invert ? screenSize !== 'mobile' : screenSize === 'mobile';

  if (shouldHideOnMobile) {
    if (!element.classList.contains('hidden')) {
      element.classList.add('hidden');
    }
  } else {
    if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
  }
}

/**
 * Настраивает адаптивную видимость элемента.
 * @param {string} selector - Селектор элемента.
 * @param {boolean} invert - Флаг инверсии.
 */
export function setupResponsiveVisibility(selector, invert = false) {
  toggleElementVisibility(selector, invert);

  window.addEventListener('resize', () => {
    toggleElementVisibility(selector, invert);
  });
}