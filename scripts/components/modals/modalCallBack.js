import { showToast } from './toast.js';
import { createModalCore } from './modalCore.js';

export function initCallBackModal() {
  const modal = createModalCore('callBack-modal', {
    onOpen: updateDeliveryTimes,
    onClose: resetForm
  });

  const callBackButton = document.getElementById('callBack-button');
  const form = document.getElementById('callBack-form');

  if (callBackButton) {
    callBackButton.addEventListener('click', modal.open);
  }
  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

  function updateDeliveryTimes() {
    console.log('форма открыта')
  }

  function handleSubmit(e) {
    e.preventDefault();

    const phone = document.getElementById('callBack-phone').value;

    if (!phone) {
      showToast('Пожалуйста, заполните все поля', 'error');
      return;
    }

    console.log('Order data:', {  phone });
    showToast('Запрос успешно отправлен!', 'success');
    modal.close();
  }

  function resetForm() {
    form?.reset();
  }
}