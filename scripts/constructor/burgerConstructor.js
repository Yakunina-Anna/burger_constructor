export function initBurgerConstructor() {
  const dynamicContainer = document.querySelector('.burger-constructor_dynamic');
  const bunBottom = document.querySelector('.bun_bottom');
  const bunTop = document.querySelector('.bun_top');

  const containerHeight = 570;

  const ingredientHeights = {
    cheese: 2,
    beef: 15,
    salad: 15,
    tomato: 28,
    bun_middle: 25,
    bun_top: 20,
    mayo: 2,
    cucumber: 28,
    onion: 28,
  };

  let currentHeight = containerHeight - bunBottom.offsetHeight;
  let lastIngredientType = null;
  let isFirstIngredient = true;

  const addedIngredients = [];

  // Делегирование событий для кнопок "+" и "-"
  document.addEventListener('click', (event) => {
    const target = event.target;

    // Проверяем, является ли цель кнопкой "+"
    if (target.matches('.button--add')) {
      const ingredientType = target.dataset.ingredient;
      addIngredient(ingredientType);

      // Обновляем счетчик
      const countElement = target.nextElementSibling;
      countElement.textContent = parseInt(countElement.textContent) + 1;
    }

    // Проверяем, является ли цель кнопкой "-"
    if (target.matches('.button--remove')) {
      const ingredientType = target.dataset.ingredient;
      removeIngredient(ingredientType);

      // Обновляем счетчик
      const countElement = target.previousElementSibling;
      const currentCount = parseInt(countElement.textContent);
      if (currentCount > 0) {
        countElement.textContent = currentCount - 1;
      }
    }
  });

  function addIngredient(type) {
    if (!ingredientHeights[type]) {
      console.error(`Высота для ингредиента "${type}" не определена`);
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

    let additionalOffset = 0;

    if (lastIngredientType === 'cheese') {
      additionalOffset = 8;
    }
    if (lastIngredientType === 'mayo') {
      additionalOffset = 5;
    }
    if (['tomato', 'onion', 'cucumber'].includes(lastIngredientType)) {
      additionalOffset = -7;
    }

    if (isFirstIngredient) {
      additionalOffset -= 5;
      isFirstIngredient = false;
    }

    currentHeight -= ingredientHeights[type] + additionalOffset;
    ingredientWrapper.style.top = `${currentHeight}px`;
    ingredientWrapper.classList.add('fade-in');
    dynamicContainer.appendChild(ingredientWrapper);
    addedIngredients.push({ type, wrapper: ingredientWrapper });
    lastIngredientType = type;
    checkAndAddTopBun();
  }

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
            let additionalOffset = 0;

            if (lastType === 'cheese') {
              additionalOffset += 8;
            }
            if (lastType === 'mayo') {
              additionalOffset += 5;
            }
            if (['tomato', 'onion', 'cucumber'].includes(lastType)) {
              additionalOffset -= 5;
            }

            currentHeight -= ingredientHeights[ingredient.type] + additionalOffset;
            ingredient.wrapper.style.top = `${currentHeight}px`;
            lastType = ingredient.type;
            checkAndAddTopBun();
          });
        }, 300);

        break;
      }
    }
  }

  function checkAndAddTopBun() {
    if (addedIngredients.length >= 5) {
      bunTop.classList.remove('hidden');
    } else if (addedIngredients.length < 5) {
      bunTop.classList.add('hidden');
    }
  }
}