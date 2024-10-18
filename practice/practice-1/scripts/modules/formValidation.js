// Проверка на валидность email и телефона
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^\+?[0-9]{10,14}$/;

// Запуск валидации формы
export function initFormValidation(form) {
    form.addEventListener('input', handleInput);
    form.addEventListener('submit', handleSubmit);
    validateForm(form);
}

// Проверка поля при вводе
function handleInput(event) {
    const input = event.target;
    if (input.tagName === 'INPUT') {
        validateInput(input);
        validateForm(input.form);
    }
}

// Проверка формы на валидность
function validateForm(form) {
    const submitButton = form.querySelector('.button-type-submit');
    if (!submitButton) {
        console.error('Кнопка отправки формы не найдена'); // Не для продакшена
        return false;
    }

    const isValid = Array.from(form.querySelectorAll('input[required]')).every(input => input.validity.valid);

    submitButton.disabled = !isValid;
    submitButton.classList.toggle('button-disabled', !isValid);
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';

    return isValid;
}

// Проверка поля на правильность заполнения
function validateInput(input) {
    const errorElement = input.parentElement.querySelector('.form__error');
    let isValid = true;
    let errorMessage = '';

    if (input.validity.valueMissing) {
        errorMessage = 'Это поле обязательно для заполнения';
        isValid = false;
    } else if (input.type === 'email' && !EMAIL_REGEX.test(input.value)) {
        errorMessage = 'Введите корректный email';
        isValid = false;
    } else if (input.type === 'tel' && !PHONE_REGEX.test(input.value)) {
        errorMessage = 'Введите корректный номер телефона';
        isValid = false;
    } else if (input.type === 'file' && input.files.length === 0) {
        errorMessage = 'Выберите файл изображения';
        isValid = false;
    }

    if (isValid) {
        hideError(input, errorElement);
    } else {
        showError(input, errorElement, errorMessage);
    }

    return isValid;
}

// Показ сообщения об ошибке
function showError(input, errorElement, message) {
    input.classList.add('form__input_error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Скрытие сообщения об ошибке
function hideError(input, errorElement) {
    input.classList.remove('form__input_error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Обработка отправки формы
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    if (validateForm(form)) {
        const formData = new FormData(form);
        const jsonData = JSON.stringify(Object.fromEntries(formData), null, 2);

        console.log('Данные формы в формате JSON:'); // Не для продакшена
        console.log(jsonData); // Не для продакшена

        form.reset();
        resetAvatarPreview();
        validateForm(form);
    } else {
        console.log('Форма содержит ошибки'); // Не для продакшена
    }
}

// Сбрасываем предпросмотр аватара
function resetAvatarPreview() {
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.querySelector('.form__avatar-placeholder');
    if (avatarPreview && avatarPlaceholder) {
        avatarPreview.style.display = 'none';
        avatarPlaceholder.style.display = 'block';
    }
}
