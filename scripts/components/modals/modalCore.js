export function createModalCore(modalId, { onOpen, onClose } = {}) {
  const modal = document.getElementById(modalId);
  let scrollPosition = 0;

  function open() {
    scrollPosition = window.scrollY;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
    modal.style.display = 'block';
    if (onOpen) onOpen();
    initFloatingLabels();
  }

  function close() {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
    if (onClose) onClose();
  }

  document.querySelectorAll('.modal__close').forEach(btn => {
    btn.addEventListener('click', close);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  return { open, close };
}

function initFloatingLabels() {
  const inputs = document.querySelectorAll('.custom-input');

  inputs.forEach(input => {
    // Проверяем начальное значение
    if (input.value) {
      input.classList.add('input_filled');
    }

    // Обработчик ввода
    input.addEventListener('input', function () {
      if (this.value) {
        this.classList.add('input_filled');
      } else {
        this.classList.remove('input_filled');
      }
    });

    // Обработчик фокуса
    input.addEventListener('focus', function () {
      this.classList.add('input_focused');
    });

    // Обработчик потери фокуса
    input.addEventListener('blur', function () {
      this.classList.remove('input_focused');
      if (!this.value) {
        this.classList.remove('input_filled');
      }
    });
  });
}