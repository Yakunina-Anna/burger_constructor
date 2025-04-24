let scrollPosition = 0;
export function initCallBackModal() {
  const modal = document.getElementById('callback-modal');
  const buttonOpen = document.getElementById('callback-button');
  const buttonClose = document.getElementById('callback-close');

  buttonOpen.addEventListener('click', () => openCallBackModal());
  buttonClose.addEventListener('click', () =>closeCallBackModal());

  function openCallBackModal() {
    scrollPosition = window.scrollY;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
    console.log(modal)
    modal.style.display = 'block';
  }

  function closeCallBackModal() {
    modal.style.display = 'none';
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, scrollPosition);
  }
}

