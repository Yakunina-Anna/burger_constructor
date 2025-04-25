import { showToast } from './toast.js';
import { createModalCore } from './modalCore.js';

export function initModal() {
  const modal = createModalCore('modal', {
    onOpen: updateDeliveryTimes,
    onClose: resetForm
  });

 const checkoutButton = document.getElementById('checkout-button');
  const form = document.getElementById('checkout-form');
  if (checkoutButton) {
    checkoutButton.addEventListener('click', modal.open);
  }

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }

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

    for (let hour = currentHour; hour < closingTime; hour++) {
      const option = document.createElement('option');
      option.value = `${hour}:00`;
      option.textContent = `${hour}:00`;
      selectElement.appendChild(option);
    }

    selectElement.selectedIndex = 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (!name || !phone) {
      showToast('Пожалуйста, заполните все поля', 'error');
      return;
    }

    console.log('Order data:', { name, phone });
    showToast('Заказ успешно отправлен!', 'success');
    modal.close();
  }

  function resetForm() {
    form?.reset();
  }
}