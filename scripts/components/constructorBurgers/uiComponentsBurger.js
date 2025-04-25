import { ingredientsData } from '../../data/ingredientsData.js';
import { calculateAdditionalOffset } from '../../utils/helpers.js';
import { isMobile, isTabletMini } from '../../utils/breakpoints.js';
/**
 * Инициализирует отображение цен для ингредиентов в конструкторе бургера.
 * Устанавливает цены в элементы `.burger-constructor__item-price span` на основе данных из `ingredientsData`.
 */
export function initializePrices() {
  document.querySelectorAll('.burger-constructor__item').forEach((item) => {
    const ingredientType = item.querySelector('.button--add').dataset.ingredient;
    const priceElement = item.querySelector('.burger-constructor__item-price span');
    if (priceElement && ingredientsData[ingredientType]) {
      priceElement.textContent = `$${ingredientsData[ingredientType].price.toFixed(2)}`;
    }
  });
}

/**
 * Обновляет положение верхней булочки бургера.
 * @param {number} currentHeight - Текущая высота контейнера бургера.
 * @param {Array} addedIngredients - Массив добавленных ингредиентов.
 * @description
 * - Скрывает верхнюю булочку, если ингредиентов меньше 3.
 * - Показывает и позиционирует булочку над последним ингредиентом, если их 3 или больше.
 */
export function updateBunTopPosition(currentHeight, addedIngredients) {
  const bunTop = document.querySelector('.bun_top');

  if (addedIngredients.length >= 3) {
    bunTop.classList.remove('fade-out', 'hidden');
    bunTop.classList.add('fade-in');
    const lastIngredient = addedIngredients[addedIngredients.length - 1];
    const additionalOffset = calculateAdditionalOffset(lastIngredient.type);

    const bunTopPosition = isTabletMini() ? currentHeight - additionalOffset - 125 : isMobile() ? currentHeight - additionalOffset - 100 : currentHeight - additionalOffset - 163;
    bunTop.style.top = `${bunTopPosition}px`;
  } else {
    bunTop.classList.remove('fade-in')
    bunTop.classList.add('fade-out');
    setTimeout(() => { bunTop.classList.add('hidden'); }, 300)
  }
}