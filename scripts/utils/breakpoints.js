export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
};

export const isMobile = () => window.innerWidth < breakpoints.mobile;

export const isTabletMini = () =>
  window.innerWidth >= breakpoints.mobile && window.innerWidth < breakpoints.tablet;

export const isTablet = () =>
  window.innerWidth >= breakpoints.tablet && window.innerWidth < breakpoints.desktop;

export const isDesktop = () => window.innerWidth >= breakpoints.desktop;

/**
 * Определяет текущий тип устройства.
 * @returns {'mobile' | 'tabletMini' | 'tablet' | 'desktop'} -
 */
export const getDeviceType = () => {
  if (isMobile()) return 'mobile';
  if (isTabletMini()) return 'tabletMini';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

