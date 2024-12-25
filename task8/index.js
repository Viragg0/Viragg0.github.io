// Ожидаем загрузки DOM, чтобы убедиться, что весь HTML контент доступен
document.addEventListener('DOMContentLoaded', () => {

  // Получаем элементы модального окна и формы по их ID
  const modal = document.getElementById('modal');
  const openModalButton = document.getElementById('open-modal');
  const closeModalButton = document.getElementById('close-modal');
  const feedbackForm = document.getElementById('feedback-form');
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');

  // Функция для восстановления данных формы из LocalStorage
  const restoreFormData = () => {
      document.getElementById('name').value = localStorage.getItem('name') || '';  // Восстанавливаем имя
      document.getElementById('email').value = localStorage.getItem('email') || '';  // Восстанавливаем email
      document.getElementById('phone').value = localStorage.getItem('phone') || '';  // Восстанавливаем телефон
      document.getElementById('organization').value = localStorage.getItem('organization') || '';  // Восстанавливаем организацию
      document.getElementById('message').value = localStorage.getItem('message') || '';  // Восстанавливаем сообщение
      document.getElementById('consent').checked = localStorage.getItem('consent') === 'true';  // Восстанавливаем согласие
  };

  // Восстановление данных при загрузке страницы
  restoreFormData();

  // Функция для сохранения данных формы в LocalStorage
  const saveFormData = () => {
      // Массив с ID полей формы
      const fields = ['name', 'email', 'phone', 'organization', 'message', 'consent'];

      // Для каждого поля сохраняем его значение в LocalStorage
      fields.forEach(field => {
          const element = document.getElementById(field);
          if (element) {
              if (field === 'consent') {
                  // Для чекбокса сохраняем состояние (checked)
                  localStorage.setItem(field, element.checked);
              } else {
                  // Для остальных полей сохраняем значение (value)
                  localStorage.setItem(field, element.value);
              }
          }
      });
  };

  // Добавляем обработчик событий на элементы формы для сохранения данных в LocalStorage при каждом изменении
  const formElements = feedbackForm.querySelectorAll('input, textarea');
  formElements.forEach(element => {
      element.addEventListener('input', saveFormData);
  });

  // Открытие модального окна
  openModalButton.addEventListener('click', () => {
      modal.classList.add('active');  // Добавляем класс для отображения модального окна
      history.pushState(null, '', '#feedback');  // Добавляем хеш в URL для поддержания состояния
  });

  // Закрытие модального окна при нажатии на кнопку закрытия или при изменении URL (попытка назад)
  closeModalButton.addEventListener('click', closeModal);
  window.addEventListener('popstate', closeModal);

  // Функция закрытия модального окна
  function closeModal() {
      modal.classList.remove('active');  // Убираем класс для скрытия модального окна
      history.replaceState(null, '', window.location.pathname);  // Убираем хеш #feedback из URL
  }

  // Обработчик отправки формы
  feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();  // Отменяем стандартное поведение отправки формы

      // Собираем данные формы
      const Data = new FormData(feedbackForm);

      // Отправляем данные формы на сервер с помощью Fetch API
      fetch('https://formcarry.com/s/Qm0VvOAbYfu', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify(Object.fromEntries(Data.entries()))  // Преобразуем FormData в объект JSON
      })
      .then(response => {
          if (response.ok) {
              // Если ответ от сервера успешный, показываем сообщение об успехе
              successMessage.style.display = 'block';
              errorMessage.style.display = 'none';

              // Очищаем данные формы и LocalStorage
              feedbackForm.reset();
              localStorage.clear();
          } else {
              // Если произошла ошибка при отправке, показываем сообщение об ошибке
              errorMessage.style.display = 'block';
              successMessage.style.display = 'none';
          }
      })
      .catch(error => {
          // Если произошла ошибка при запросе (например, нет соединения), показываем сообщение об ошибке
          errorMessage.style.display = 'block';
          successMessage.style.display = 'none';
          console.error('Ошибка:', error);  // Логируем ошибку в консоль
      });
  });
});
