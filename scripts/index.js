import { ingredientsData } from './data/ingredientsData.js';
import { initTabs } from './components/header/tabs.js';
import { initBurgerConstructor } from './components/constructorBurgers/logicConstructorBurger.js';
import { initializePrices, renderIngredients } from './components/constructorBurgers/uiComponentsBurger.js';
import { initModal } from './components/modals/modalCheckout.js';
import { initMenuModal } from './components/modals/modalHeaderMenu.js';
import { initCallBackModal } from './components/modals/modalCallBack.js';
export * from './firebaseConfig.js';
export * from './router.js';
export * from './auth/signOut.js';
export * from './responsive/responsiveVisibility.js';

document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  renderIngredients('#burger-ingredients-container', ingredientsData);
  initBurgerConstructor();
  initializePrices();
  initModal();
  initMenuModal()
  initCallBackModal()
});