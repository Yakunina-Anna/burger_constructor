import { initTabs } from './components/header/tabs.js';
import { initBurgerConstructor } from './components/constructorBurgers/logicConstructorBurger.js';
import { initializePrices } from './components/constructorBurgers/uiComponentsBurger.js';
import { initModal } from './components/modals/modalCheckout.js';

export * from './firebaseConfig.js';
export * from './router.js';
export * from './auth/signOut.js';
export * from './responsive/responsiveVisibility.js';


document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initBurgerConstructor();
  initializePrices();
  initModal();

  // document.getElementById('go-to-constructor')?.addEventListener('click', () => {
  //   initTabs('burger');

  //   const tabsContainer = document.querySelector('.tabs-container');
  //   if (tabsContainer) {
  //     tabsContainer.scrollIntoView({ behavior: 'smooth' });
  //   }
  // });
});