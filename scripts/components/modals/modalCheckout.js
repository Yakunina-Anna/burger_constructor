/**
 * Инициализирует модальное окно.
 *
 * @description
 * Функция настраивает обработчики событий для открытия, закрытия и отправки формы.
 */
export function initModal() {
  const modal = document.getElementById('modal');
  const closeModalButton = document.querySelectorAll('.modal__close');
  const checkoutButton = document.getElementById('checkout-button');
  let scrollPosition = 0;

  /**
   * Показывает всплывающее уведомление.
   *
   * @param {string} message - Текст уведомления.
   * @param {'success' | 'error'} type - Тип уведомления (success/error).
   */
  function showToast(message, type = 'success') {
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

  /**
   * Обновляет доступные временные интервалы в селекте.
   */
  function updateDeliveryTimes() {
    const selectElement = document.getElementById('delivery-time');
    const closingTime = 20; // Время закрытия в 24-часовом формате
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    // Очистка селекта перед добавлением новых опций
    selectElement.innerHTML = '';

    // Добавляем плейсхолдер
    const placeholderOption = document.createElement('option');
    placeholderOption.value = '';
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    selectElement.appendChild(placeholderOption);

    // Добавление доступных временных интервалов
    for (let hour = currentHour; hour < closingTime; hour++) {
      const option = document.createElement('option');
      option.value = `${hour}:00`;
      option.textContent = `${hour}:00`;
      selectElement.appendChild(option);
    }

    // Устанавливаем первый элемент как выбранное значение
    selectElement.selectedIndex = 0;
  }

  /**
   * Открывает модальное окно.
   */
  function openModal() {
    scrollPosition = window.scrollY; // Сохраняем текущую позицию скролла

    document.body.classList.add('no-scroll'); // Добавляем класс для запрета скролла
    document.body.style.top = `-${scrollPosition}px`; // Фиксируем положение страницы

    modal.style.display = 'block'; // Показываем модальное окно

    const inputs = document.querySelectorAll('.custom-input');
    const selects = document.querySelectorAll('.custom-select');
    inputs.forEach((input) => {
      input.addEventListener('input', handleInput);
    });
    selects.forEach((select) => {
      select.addEventListener('change', handleInput);
    });

    // Обновляем временные интервалы при открытии модального окна
    updateDeliveryTimes();
  }

  function handleInput(event) {
    const input = event.target;
    if (input.value) {
      input.classList.add('input_filled');
    } else {
      input.classList.remove('input_filled');
    }
  }

  /**
   * Закрывает модальное окно.
   */
  function closeModalWindow() {
    modal.style.display = 'none'; // Скрываем модальное окно

    document.body.classList.remove('no-scroll'); // Убираем класс запрета скролла
    document.body.style.top = ''; // Возвращаем нормальное положение страницы
    window.scrollTo(0, scrollPosition); // Возвращаемся к сохраненной позиции скролла
  }

  // Обработчик клика по кнопке "Открыть форму"
  checkoutButton.addEventListener('click', () => {
    openModal();
  });

  // Обработчик клика по кнопке закрытия
  closeModalButton.forEach((button) => {
    button.addEventListener('click', closeModalWindow);
  });

  // Закрытие модального окна при клике вне его содержимого
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModalWindow();
    }
  });

  // Обработка отправки формы
  document.getElementById('checkout-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const name = document.getElementById('name').value;
    const number = document.getElementById('phone').value;
    showToast('Пожалуйста, заполните все поля.', 'error');
    // Проверяем, что все поля заполнены
    if (!name || !number) {
      showToast('Пожалуйста, заполните все поля.', 'error');
      return;
    }

    // Выводим данные в консоль (можно заменить на отправку на сервер)
    console.log('Имя:', name);
    console.log('Телефон:', number);

    // Закрываем модальное окно
    closeModalWindow();

    // Показываем уведомление об успешной отправке
    showToast('Заказ успешно отправлен!', 'success');
  });
}