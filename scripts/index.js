export * from './firebaseConfig.js';
export * from './router.js';
export * from './auth/signOut.js';

import { initTabs } from './components/header/tabs.js';
import { initBurgerConstructor } from './components/constructorBurgers/logicConstructorBurger.js';
import { initializePrices } from './components/constructorBurgers/uiComponentsBurger.js';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initBurgerConstructor();
  initializePrices();
});