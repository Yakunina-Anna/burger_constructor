import  { showToast } from './toast.js';

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
   * Обновляет доступные временные интервалы в селекте.
   */
  function updateDeliveryTimes() {
    const selectElement = document.getElementById('delivery-time');
    const closingTime = 20;
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    selectElement.innerHTML = '';

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
    scrollPosition = window.scrollY;

    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;

    modal.style.display = 'block';

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
    modal.style.display = 'none';

    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
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
    showToast('Заказ успешно отправлен!', 'success');

    // Закрываем модальное окно
    closeModalWindow();

    // Показываем уведомление об успешной отправке
  });
}