import { auth, onAuthStateChanged } from "./firebaseConfig.js";
const emailUser = document.getElementById('email-user');
// Отслеживаем состояние аутентификации
onAuthStateChanged(auth, (user) => {
  if (user ) {
    // Пользователь залогинен
    console.log('Пользователь залогинен:', user.email);
    if(emailUser) emailUser.textContent = 'Пользователь: ' + user.email

    if (!window.location.pathname.endsWith('index.html')) {
      window.location.href = 'index.html';
    }
  } else {
    // Пользователь не залогинен
    console.log('Пользователь не залогинен');
    if (!window.location.pathname.endsWith('auth.html')) {
      window.location.href = 'auth.html';
    }

    // Перенаправляем на страницу входа, если пользователь находится на главной странице
    if (!window.location.pathname.endsWith('auth.html')) {
      window.location.href = 'auth.html';
    }
  }
});