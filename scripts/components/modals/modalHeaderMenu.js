const buttonSvgOpen = document.getElementById('header-menu-button-open');
const buttonSvgClose = document.getElementById('header-menu-button-close');
const modal = document.getElementById('header-modal');
const button = document.getElementById('header-menu-button');
const header = document.querySelector('.header');

function checkElements() {
  if (!buttonSvgOpen || !buttonSvgClose || !modal || !button) {
    console.error('Один из необходимых элементов не найден в DOM');
    return false;
  }
  return true;
}

export function openHeaderModal() {
  try {
    const body = document.body;

    buttonSvgClose.style.display = 'block';
    buttonSvgOpen.style.display = 'none';

    modal.style.display = 'block';
    body.style.overflow = 'hidden';

    button.setAttribute('aria-expanded', 'true');
  } catch (error) {
    console.error('Error in openHeaderModal:', error);
  }
}

export function closeHeaderModal() {
  try {
    const body = document.body;

    buttonSvgClose.style.display = 'none';
    buttonSvgOpen.style.display = 'block';

    modal.style.display = 'none';
    body.style.overflow = '';

    button.setAttribute('aria-expanded', 'false');
  } catch (error) {
    console.error('Error in closeHeaderModal:', error);
  }
}

function handleDocumentClick(event) {
  if (event.target.closest('#header-menu-button')) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    isExpanded ? closeHeaderModal() : openHeaderModal();
  } else if (event.target === modal) {
    closeHeaderModal();
  }
}

export function initMenuModal() {
  if (!checkElements()) return;

  button.setAttribute('aria-expanded', 'false');
  document.addEventListener('click', handleDocumentClick);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      closeHeaderModal();
    }
  });
}