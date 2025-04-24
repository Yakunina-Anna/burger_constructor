import { breakpoints } from './breakpoints.js';

// Функция для определения текущего размера экрана
function getScreenSize() {
  const width = window.innerWidth;
  if (width < breakpoints.mobile) return 'mobile';
  if (width < breakpoints.tablet) return 'tablet';
  return 'desktop';
}

// Функции для управления видимостью (оставляем как было)
/**
 * Управляет видимостью элемента в зависимости от размера экрана
 * @param {string} selector - Селектор элемента
 * @param {boolean} invert - Инверсия видимости
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
    element.classList.add('hidden');
  } else {
    element.classList.remove('hidden');
  }
}

/**
 * Настраивает адаптивную видимость элемента
 * @param {string} selector - Селектор элемента
 * @param {boolean} invert - Инверсия видимости
 */
export function setupResponsiveVisibility(selector, invert = false) {
  toggleElementVisibility(selector, invert);
  window.addEventListener('resize', () => toggleElementVisibility(selector, invert));
}

// Новые функции для управления позиционированием
/**
 * Устанавливает фиксированное позиционирование для элемента на мобильных устройствах
 * @param {string} selector - Селектор элемента
 */
export function toggleFixedPosition() {
  const screenSize = getScreenSize();
  const element = document.querySelector('.header');
  const parent = element.closest('.container__main');

  if (!element) {
    console.warn(`Элемент с селектором не найден.`);
    return;
  }

  if (screenSize === 'mobile') {
    element.style.position = 'fixed';
    element.style.top = '0';
    element.style.left = '0';
    element.style.right = '0';
    element.style.zIndex = '1000';
    element.style.padding = '5px 10px';
    element.style.background = 'var(--white-color)';
    parent.style.paddingTop = '80px';
  } else {
    element.style.position = '';
    element.style.top = '';
    element.style.left = '';
    element.style.right = '';
    element.style.zIndex = '';
    element.style.padding = '';
    element.style.background = 'transparent';
    parent.style.paddingTop = '0';
  }
}

/**
 * Настраивает адаптивное позиционирование элемента
 * @param {string} selector - Селектор элемента
 */
export function setupHeaderPosition() {
  toggleFixedPosition();
  window.addEventListener('resize', () => toggleFixedPosition());
}