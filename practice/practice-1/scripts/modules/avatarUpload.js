const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function initAvatarUpload() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.querySelector('.form__avatar-placeholder');
    const avatarRemove = document.getElementById('avatarRemove');
    const errorElement = avatarInput.parentElement.querySelector('.form__error');

    avatarInput.addEventListener('change', handleAvatarChange);
    avatarRemove.addEventListener('click', handleAvatarRemove);
}

function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
        if (isValidFile(file)) {
            const reader = new FileReader();
            reader.onload = function (e) {
                updateAvatarPreview(e.target.result);
                hideError();
            }
            reader.readAsDataURL(file);
        } else {
            showError('Пожалуйста, выберите файл JPEG или PNG размером до 5MB');
            resetAvatarInput();
        }
    }
}

function handleAvatarRemove(e) {
    e.preventDefault();
    e.stopPropagation();
    resetAvatarInput();
    hideError();
}

function isValidFile(file) {
    const acceptedTypes = ['image/jpeg', 'image/png'];
    return acceptedTypes.includes(file.type) && file.size <= MAX_FILE_SIZE;
}

function updateAvatarPreview(src) {
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.querySelector('.form__avatar-placeholder');
    const avatarRemove = document.getElementById('avatarRemove');

    avatarPreview.src = src;
    avatarPreview.style.display = 'block';
    avatarPlaceholder.style.display = 'none';
    avatarRemove.style.display = 'flex';
}

function resetAvatarInput() {
    const avatarInput = document.getElementById('avatarInput');
    const avatarPreview = document.getElementById('avatarPreview');
    const avatarPlaceholder = document.querySelector('.form__avatar-placeholder');
    const avatarRemove = document.getElementById('avatarRemove');

    avatarInput.value = '';
    avatarPreview.src = '';
    avatarPreview.style.display = 'none';
    avatarPlaceholder.style.display = 'block';
    avatarRemove.style.display = 'none';
}

function showError(message) {
    const errorElement = document.querySelector('.form__field_type_avatar .form__error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function hideError() {
    const errorElement = document.querySelector('.form__field_type_avatar .form__error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}