// modal.js
// Функция для открытия модального окна
const buttonSvgOpen = document.getElementById('header-menu-button-open')
const buttonSvgClose = document.getElementById('header-menu-button-close')

// Функция для открытия модального окна
export function openModal() {
  const modal = document.getElementById('header-modal');
  buttonSvgClose.classList.remove('hidden');
  buttonSvgOpen.classList.add('hidden');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Отключаем скроллинг страницы
}

// Функция для закрытия модального окна
export function closeModal() {
  const modal = document.getElementById('header-modal');
  buttonSvgClose.classList.add('hidden');
  buttonSvgOpen.classList.remove('hidden');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // Включаем скроллинг страницы
}

// Функция для инициализации модального окна
export function initMenuModal() {
  const button = document.getElementById('header-menu-button');
  const modal = document.getElementById('header-modal');

  button.addEventListener('click', openModal);

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });
}
