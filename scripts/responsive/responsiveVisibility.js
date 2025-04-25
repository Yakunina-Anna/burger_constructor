import { setupResponsiveVisibility, setupHeaderPosition } from '../utils/adaptive.js';

setupResponsiveVisibility('#main-subtitle', true)

setupResponsiveVisibility('.burger-constructor__summary-title')
setupResponsiveVisibility('.burger-constructor__summary-line')
setupResponsiveVisibility('.burger-constructor__summary-descr')
setupResponsiveVisibility('.burger-constructor__title')
setupResponsiveVisibility('.header__list')
setupResponsiveVisibility('#header-right-desktop')
setupResponsiveVisibility('#header-modal', true)
setupResponsiveVisibility('#header-right-mobile', true)
setupResponsiveVisibility('#header-menu-button', true)

setupHeaderPosition();
