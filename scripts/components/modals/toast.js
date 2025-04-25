/**
 * Показывает всплывающее уведомление.
 *
 * @param {string} message - Текст уведомления.
 * @param {'success' | 'error'} type - Тип уведомления (success/error).
 */
export function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  if (!toast) {
    console.error('Элемент toast не найден на странице.');
    return;
  }

  // Устанавливаем текст и тип уведомления
  toast.textContent = message;
  toast.className = `toast toast--${type}`;
  toast.style.display = 'block';

  // Автоматически скрываем через 3 секунды
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}