import {
  auth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  provider
} from "../firebaseConfig.js";

const signinForm = document.getElementById('signin-form');
const signinEmailInput = document.getElementById('signin-email');
const signinPasswordInput = document.getElementById('signin-password');
const googleSignInButton = document.getElementById('google-signin-button');
async function signIn(event, emailValue, passwordValue) {
  event.preventDefault();
  const email = emailValue;
  const password = passwordValue;
  const signinButton = document.getElementById('signin-button');
  const signinButtonText = document.getElementById('signin-button-text');
  const signinLoader = document.getElementById('signin-loader');
  const errorMessageElement = document.getElementById('error-message');
  errorMessageElement.classList.add('hidden');
  try {
    signinButton.classList.add('disabled');
    signinButtonText.classList.add('hidden');
    signinLoader.classList.remove('opacity-0');
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    errorMessageElement.classList.remove('hidden');
    switch (error.code) {
      case 'auth/invalid-credential':
        errorMessageElement.textContent = 'Неверные учетные данные. Пожалуйста, проверьте ваш email и пароль.';
        break;
      case 'auth/email-already-exists':
        errorMessageElement.textContent = 'Указанный адрес электронной почты уже используется существующим пользователем.';
        break;
      case 'auth/internal-error':
        errorMessageElement.textContent = 'Сервер Firebase обнаружил непредвиденную ошибку при попытке обработать запрос.';
        break;
      default:
        errorMessageElement.textContent = 'Произошла неизвестная ошибка. Пожалуйста, попробуйте позже.';
    }
  } finally {
    signinEmailInput.value = '';
    signinPasswordInput.value = '';
    signinButton.classList.remove('disabled');
    signinButtonText.classList.remove('hidden');
    signinLoader.classList.add('opacity-0');
  }
}


async function signGoogleIn() {
  const signinGoogleButtonText = document.getElementById('google-signin-button-text');
  const signinGoogleLoader = document.getElementById('google-signin-loader');
  try {
    googleSignInButton.classList.add('disabled');
    signinGoogleButtonText.classList.add('hidden');
    signinGoogleLoader.classList.remove('opacity-0');
    const result = await signInWithPopup(auth, provider);
    await GoogleAuthProvider.credentialFromResult(result);

  } catch (error) {
    console.error('Error signing in with Google:', error);
    alert(`Ошибка входа через Google: ${errorMessage}`);
  } finally {
    googleSignInButton.classList.add('disabled');
    signinGoogleButtonText.classList.remove('hidden');
    signinGoogleLoader.classList.add('opacity-0');
  }
}

signinForm.addEventListener('submit', (event) => {
  signIn(event, signinEmailInput.value, signinPasswordInput.value);
})

googleSignInButton.addEventListener('click', async (event) => {
  signGoogleIn()
})


export { signIn };