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

/**
 * Генерирует HTML-разметку для одного ингредиента.
 *
 * @param {string} ingredientName - Название ингредиента (например, "beef", "cheese").
 * @param {Object} data - Данные ингредиента.
 * @param {number} data.price - Цена ингредиента.
 * @returns {string} - HTML-строка, представляющая элемент ингредиента.
 */
export const generateIngredientHTML = (ingredientName, data) => {
  return `
    <div class="burger-constructor__item">
      <div class="burger-constructor__item-image">
        <img src="./assets/images/${ingredientName}.png" alt="${ingredientName}">
      </div>
      <p class="font-14-semibold">${ingredientName.charAt(0).toUpperCase() + ingredientName.slice(1)}</p>
      <div class="burger-constructor__item-actions">
        <button class="button button--ghost button--xs button-action--circle button--add"
          data-action="add"
          data-ingredient="${ingredientName}">+</button>
        <span class="count">0</span>
        <button class="button button--ghost button--xs button-action--circle button--remove"
          data-action="remove"
          data-ingredient="${ingredientName}">-</button>
      </div>
      <div class="burger-constructor__item-price">
        <span>$${data.price.toFixed(2)}</span>
      </div>
    </div>
  `;
};

/**
 * Рендерит список ингредиентов в указанный контейнер.
 *
 * @param {string} containerSelector - CSS-селектор контейнера, куда будут добавлены ингредиенты.
 * @param {Object} ingredientsData - Объект с данными ингредиентов.
 * @param {Object.<string, IngredientData>} ingredientsData - Ключи — названия ингредиентов, значения — объекты с данными.
 * @param {number} ingredientsData.price - Цена ингредиента.
 * @returns {void}
 */
export const renderIngredients = (containerSelector, ingredientsData) => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const excludedIngredients = ['bun_top', 'ketchup'];

  const filteredIngredients = Object.entries(ingredientsData).filter(
    ([ingredientName]) => !excludedIngredients.includes(ingredientName)
  );

  const ingredientsHTML = filteredIngredients
    .map(([ingredientName, data]) => generateIngredientHTML(ingredientName, data))
    .join('');

  container.innerHTML = ingredientsHTML;
};