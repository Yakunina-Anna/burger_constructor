export * from './signIn.js';
export * from './signUp.js';

const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const showSigninButton = document.getElementById('show-signin');
const showSignupButton = document.getElementById('show-signup');
// Обработчик для кнопки "Войти"
showSigninButton.addEventListener('click', () => {
  signinForm.classList.remove('hidden');
  signupForm.classList.add('hidden');
});

// Обработчик для кнопки "Регистрация"
showSignupButton.addEventListener('click', () => {
  signupForm.classList.remove('hidden');
  signinForm.classList.add('hidden');
});
