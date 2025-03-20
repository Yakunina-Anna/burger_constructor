import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../firebaseConfig.js";
const signupForm = document.getElementById('signup-form');
const signupEmailInput = document.getElementById('signup-email');
const signupPasswordInput = document.getElementById('signup-password');
const signupButton = document.getElementById('signup-button-text');
const signupButtonText = document.getElementById('signup-button-text');
const signupLoader = document.getElementById('signup-loader');
const errorMessageElement = document.getElementById('error-message'); // Элемент для отображения сообщения об ошибке
async function createUser(event, emailValue, passwordValue) {
  event.preventDefault();
  const email = emailValue;
  const password = passwordValue;
  try {
    signupButton.classList.add('disabled');
    signupButtonText.classList.add('hidden');
    signupLoader.classList.remove('opacity-0');
    errorMessageElement.classList.add('hidden');
    await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(auth.currentUser);
    await signIn(event, email, password);
  } catch (error) {
    errorMessageElement.classList.remove('hidden');
    switch (error.code) {
      case 'auth/weak-password':
        errorMessageElement.textContent = 'Пароль должен содержать не меньше 6 знаков';
        break;
      case 'auth/email-exists':
        errorMessageElement.textContent = 'Указанный адрес электронной почты уже используется существующим пользователем.';
        break;
      default:
        errorMessageElement.textContent = 'Произошла неизвестная ошибка. Пожалуйста, попробуйте позже.';
    }
  } finally {
    signupEmailInput.value = '';
    signupPasswordInput.value = '';
    signupButton.classList.remove('disabled');
    signupButtonText.classList.remove('hidden');
    signupLoader.classList.add('opacity-0');
  }
}
signupForm.addEventListener('submit', async (event) => {
  createUser(event, signupEmailInput.value, signupPasswordInput.value);
});