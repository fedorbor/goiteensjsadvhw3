import 'intersection-observer';

// Вибираємо всі теги зображень, які мають data-src атрибут
const images = document.querySelectorAll('img[data-src]');
const imageContainer = document.querySelector('.image-container');

// Функція для завантаження зображення
const loadImage = (image) => {
  const src = image.getAttribute('data-src');
  const img = new Image();
  
  img.src = src;
  
  // Викликається при успішному завантаженні зображення
  img.onload = () => {
    image.src = src; // Замінюємо src атрибут зображення на завантажене зображення
    image.removeAttribute('data-src'); // Видаляємо data-src атрибут
    image.classList.remove('placeholder'); // Видаляємо клас плейсхолдера
  };
  
  // Обробка помилки завантаження зображення
  img.onerror = () => {
    image.classList.add('error'); // Додаємо клас помилки
    image.alt = 'Failed to load image'; // Встановлюємо альтернативний текст для помилкових зображень
  };
};

// Створюємо екземпляр IntersectionObserver
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadImage(entry.target); // Викликаємо функцію завантаження зображення, коли зображення стає видимим
      observer.unobserve(entry.target); // Припиняємо спостереження за зображенням
    }
  });
});

// Функція для завантаження зображень при натисканні на кнопку
const loadImages = () => {
  images.forEach((image) => {
    observer.observe(image); // Додаємо зображення до спостереження IntersectionObserver
});
};