/**
 * Обновляет итоговые значения стоимости, калорий, веса и времени приготовления бургера.
 * @param {Object} ingredientCounts - Объект, содержащий количество каждого ингредиента.
 * @param {Object} ingredientsData - Объект с данными о ценах, калориях, весе и времени для каждого ингредиента.
 * @description
  * Обновляет соответствующие элементы на странице с округлением значений.
 */
export function updateTotals(ingredientCounts, ingredientsData) {
  const totalCostElement = document.querySelector('#total-cost');
  const totalCaloriesElement = document.querySelector('#total-calories');
  const totalWeightElement = document.querySelector('#total-weight');
  const totalTimeElement = document.querySelector('#total-time');

  let totalCost = 0;
  let totalCalories = 0;
  let totalWeightOz = 0;
  let totalTimeMinutes = 0;

  Object.keys(ingredientCounts).forEach((ingredient) => {
    const count = ingredientCounts[ingredient];
    if (count > 0) {
      totalCost += count * ingredientsData[ingredient].price;
      totalCalories += count * ingredientsData[ingredient].calories;
      totalWeightOz += count * ingredientsData[ingredient].weightOz;
      totalTimeMinutes += count * ingredientsData[ingredient].timeMinutes;
    }
  });

  totalCostElement.textContent = `$${totalCost.toFixed(2)}`;
  totalCaloriesElement.textContent = `${totalCalories} kcal`;
  totalWeightElement.textContent = `${totalWeightOz.toFixed(1)} oz`;
  totalTimeElement.textContent = `${totalTimeMinutes.toFixed(1)} min`;
}