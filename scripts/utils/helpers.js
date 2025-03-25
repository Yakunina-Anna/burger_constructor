/**
 * Вычисляет дополнительный отступ для ингредиента на основе его типа.
 * @param {string} type - Тип ингредиента (например, 'cheese', 'mayo', 'tomato' и т.д.).
 * @returns {number} - Значение дополнительного отступа в пикселях.
 */
export function calculateAdditionalOffset(type) {
  let offset = 0;

  if (type === 'cheese') {
    offset += 8;
  }
  if (type === 'mayo') {
    offset += 5;
  }
  if (['tomato', 'onion', 'cucumber'].includes(type)) {
    offset -= 7;
  }

  return offset;
}