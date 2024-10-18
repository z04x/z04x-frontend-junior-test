import { initModal } from './modules/modal.js';
import { initAvatarUpload } from './modules/avatarUpload.js';
import { initFormValidation } from './modules/formValidation.js';
import { generateFormFields } from './modules/formGenerator.js';

document.addEventListener('DOMContentLoaded', () => {
    try {
        generateFormFields();

        const modal = document.getElementById('partnerModal');
        const form = document.getElementById('partnerForm');
        const openButton = document.querySelector('.button-action-open-modal');
        const cancelButton = document.querySelector('.button-action-cancel-modal');

        if (!modal) throw new Error('Элемент модального окна не найден');
        if (!form) throw new Error('Элемент формы не найден');
        if (!openButton) throw new Error('Кнопка открытия не найдена');
        if (!cancelButton) throw new Error('Кнопка отмены не найдена');

        initModal(modal, openButton, cancelButton);
        initAvatarUpload();
        initFormValidation(form);
    } catch (error) {
        console.error('Ошибка инициализации:', error); // Не для продакшена (в продакшен добавляем нормальные логеры)
    }
});
