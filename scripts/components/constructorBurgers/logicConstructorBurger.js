import { ingredientsData } from '../../data/ingredientsData.js';
import { updateTotals } from './totalsCalculatorBurger.js';
import { updateBunTopPosition } from './uiComponentsBurger.js';

/**
 * Инициализирует конструктор бургера.
 *
 * @description
 * Функция настраивает логику добавления, удаления и отображения ингредиентов в конструкторе бургера:
 * - Добавляет обработчики событий для кнопок добавления и удаления ингредиентов.
 * - Отслеживает высоту бургера и выводит алерт, если она превышает допустимое значение.
 * - Обновляет итоговые значения (стоимость, калории и т.д.) при каждом изменении.
 */
export function initBurgerConstructor() {
  const dynamicContainer = document.querySelector('.burger-constructor_dynamic');
  const bunBottom = document.querySelector('.bun_bottom');
  const containerHeight = 570;
  const maxBurgerHeight = window.innerHeight - 100;
  let currentHeight = containerHeight - bunBottom.offsetHeight;

  let lastIngredientType = null;
  let isFirstIngredient = true;

  const addedIngredients = [];
  const ingredientCounts = {};


  Object.keys(ingredientsData).forEach((ingredient) => {
    ingredientCounts[ingredient] = 0;
  });

  document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.matches('.button--add')) {
      const ingredientType = target.dataset.ingredient;

      addIngredient(ingredientType);

      const countElement = target.nextElementSibling;
      ingredientCounts[ingredientType]++;
      countElement.textContent = ingredientCounts[ingredientType];

      const removeButton = target.nextElementSibling.nextElementSibling;
      if (removeButton && removeButton.classList.contains('button--remove')) {
        removeButton.disabled = false;
      }

      updateTotals(ingredientCounts, ingredientsData);
      updateBunTopPosition(currentHeight, addedIngredients);

      if (addedIngredients.length >= 10) {
        if (checkBurgerHeight()) {
          removeIngredient(ingredientType);
          ingredientCounts[ingredientType]--;
          countElement.textContent = ingredientCounts[ingredientType];
          updateTotals(ingredientCounts, ingredientsData);
          updateBunTopPosition(currentHeight, addedIngredients);
        }
      }
    }

    if (target.matches('.button--remove')) {
      const ingredientType = target.dataset.ingredient;

      const countElement = target.previousElementSibling;
      if (ingredientCounts[ingredientType] > 0) {
        ingredientCounts[ingredientType]--;
        countElement.textContent = ingredientCounts[ingredientType];

        if (ingredientCounts[ingredientType] === 0) {
          target.disabled = true;
        }

        removeIngredient(ingredientType);
        updateTotals(ingredientCounts, ingredientsData);
        updateBunTopPosition(currentHeight, addedIngredients);
      }
    }
  });

  /**
   * Добавляет ингредиент в конструктор бургера.
   * @param {string} type - Тип добавляемого ингредиента.
   */
  function addIngredient(type) {
    if (!ingredientsData[type]) {
      console.error(`Данные для ингредиента "${type}" не определены`);
      return;
    }

    const ingredientWrapper = document.createElement('div');
    ingredientWrapper.classList.add('ingredient-wrapper');

    if (['tomato', 'onion', 'cucumber'].includes(type)) {
      for (let i = 0; i < 2; i++) {
        const piece = document.createElement('img');
        piece.src = `./assets/images/${type}.png`;
        piece.alt = type.charAt(0).toUpperCase() + type.slice(1);
        piece.classList.add('ingredient', 'ingredient--small');
        ingredientWrapper.appendChild(piece);
      }
    } else {
      const ingredient = document.createElement('img');
      ingredient.src = `./assets/images/${type}.png`;
      ingredient.alt = type.charAt(0).toUpperCase() + type.slice(1);
      ingredient.classList.add('ingredient');
      ingredientWrapper.appendChild(ingredient);
    }

    const additionalOffset = calculateAdditionalOffset(lastIngredient.type);

    if (isFirstIngredient) {
      additionalOffset -= 5;
      isFirstIngredient = false;
    }

    currentHeight -= ingredientsData[type].height + additionalOffset;
    ingredientWrapper.style.top = `${currentHeight}px`;
    ingredientWrapper.classList.add('fade-in');
    dynamicContainer.appendChild(ingredientWrapper);
    addedIngredients.push({ type, wrapper: ingredientWrapper });
    lastIngredientType = type;
  }

  /**
   * Удаляет ингредиент из конструктора бургера.
   * @param {string} type - Тип удаляемого ингредиента.
   */
  function removeIngredient(type) {
    for (let i = addedIngredients.length - 1; i >= 0; i--) {
      if (addedIngredients[i].type === type) {
        const removedIngredient = addedIngredients.splice(i, 1)[0];
        removedIngredient.wrapper.classList.remove('fade-in');
        removedIngredient.wrapper.classList.add('fade-out');

        setTimeout(() => {
          removedIngredient.wrapper.remove();

          currentHeight = containerHeight;
          let lastType = null;

          addedIngredients.forEach((ingredient) => {
            const additionalOffset = calculateAdditionalOffset(lastType);

            currentHeight -= ingredientsData[ingredient.type].height + additionalOffset;
            ingredient.wrapper.style.top = `${currentHeight}px`;
            lastType = ingredient.type;
          });

          updateBunTopPosition(currentHeight, addedIngredients);
        }, 300);

        break;
      }
    }
  }

  /**
   * Проверяет высоту бургера и выводит алерт, если она превышает допустимое значение.
   * @returns {boolean} - Возвращает `true`, если высота превышена, иначе `false`.
   */
  function checkBurgerHeight() {
    const burgerHeight = containerHeight - currentHeight; // Высота бургера
    if (burgerHeight > maxBurgerHeight) {
      alert('Бургер слишком большой! Уберите несколько ингредиентов.');
      return true;
    }
    return false;
  }

}