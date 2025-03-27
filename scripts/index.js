export * from './firebaseConfig.js';
export * from './router.js';
export * from './auth/signOut.js';

import { initTabs } from './components/header/tabs.js';
import { initBurgerConstructor } from './components/constructorBurgers/logicConstructorBurger.js';
import { initializePrices } from './components/constructorBurgers/uiComponentsBurger.js';
import { initModal } from './components/modals/modalCheckout.js';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initBurgerConstructor();
  initializePrices();
  initModal();

  document.getElementById('go-to-constructor')?.addEventListener('click', () => {
    initTabs('burger');

    document.querySelector('.tabs-container')?.scrollIntoView({ behavior: 'smooth' });
  });
});
