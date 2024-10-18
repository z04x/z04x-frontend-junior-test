// Здесь у нас хранятся все поля формы
const NECESSARY_FIELDS = [
    { id: 'name', name: 'organizationName', label: 'Наименование организации', type: 'text', required: true },
    { id: 'phone', name: 'phone', label: 'Телефон', type: 'tel', required: true },
    { id: 'email', name: 'email', label: 'Email', type: 'email', required: true },
];

// Отдельное поле для выбора направления. Выделил ибо оно особенное
const DIRECTION_FIELD = { 
    id: 'direction', 
    name: 'direction', 
    label: 'Направление', 
    type: 'select', 
    required: true,
    options: [
        { value: '', label: 'Выберите направление' },
        { value: 'it', label: 'IT' },
        { value: 'finance', label: 'Финансы' },
        { value: 'marketing', label: 'Маркетинг' },
        { value: 'sales', label: 'Продажи' },
        { value: 'other', label: 'Другое' }
    ]
};

// Поля для социальных сетей
const SOCIAL_FIELDS = [
    { id: 'vk', name: 'vk', label: 'VK', type: 'url', icon: 'vk.svg', required: false},
    { id: 'ok', name: 'ok', label: 'Одноклассники', type: 'url', icon: 'ok.svg', required: false },
    { id: 'facebook', name: 'facebook', label: 'Facebook', type: 'url', icon: 'fb.svg', required: false },
    { id: 'instagram', name: 'instagram', label: 'Instagram', type: 'url', icon: 'insta.svg', required: false },
    { id: 'youtube', name: 'youtube', label: 'YouTube', type: 'url', icon: 'youtube.svg', required: false },
];

// Поле для ввода информации о руководителе
const MANAGER_FIELD = { id: 'manager', name: 'manager', label: 'Руководитель', type: 'text', required: false };

// Эта функция создает все поля формы на странице
export function generateFormFields() {
    const necessaryInfoInputs = document.getElementById('necessaryInfoInputs');
    const socialLinks = document.getElementById('socialLinks');
    const form = document.getElementById('partnerForm');

    NECESSARY_FIELDS.forEach(field => {
        necessaryInfoInputs.appendChild(createFieldElement(field));
    });

    form.insertBefore(createFieldElement(DIRECTION_FIELD), socialLinks);

    SOCIAL_FIELDS.forEach(field => {
        socialLinks.appendChild(createFieldElement(field));
    });

    form.insertBefore(createFieldElement(MANAGER_FIELD), form.lastElementChild);
}

// Эта функция создает HTML-элемент для каждого поля
function createFieldElement(field) {
    const div = document.createElement('div');
    div.className = field.icon ? 'form__social-field' : 'form__field';
    
    // Для выпадающего списка создаем особую структуру
    if (field.type === 'select') {
        div.innerHTML = `
            <div class="form__input-wrapper">
                <select class="form__input form__select" 
                        id="${field.id}" name="${field.name}" 
                        ${field.required ? 'required' : ''}
                        aria-required="${field.required}" aria-label="${field.label}">
                    ${field.options.map(option => `
                        <option value="${option.value}">${escapeHTML(option.label)}</option>
                    `).join('')}
                </select>
                <label class="form__label" for="${field.id}">
                    ${field.required ? '<span class="form__required-mark" aria-hidden="true">✱</span>' : ''}
                    ${escapeHTML(field.label)}
                </label>
                <div class="form__error" aria-live="polite"></div>
            </div>
        `;
    } else {
        // Для остальных полей создаем стандартную структуру
        div.innerHTML = `
            <div class="form__input-wrapper">
                <input type="${field.type}" class="form__input ${field.icon ? 'form__social-input' : ''}" 
                       id="${field.id}" name="${field.name}" placeholder=" " ${field.required ? 'required' : ''}
                       aria-required="${field.required}" aria-label="${field.label}">
                <label class="form__label" for="${field.id}">
                    ${field.required ? '<span class="form__required-mark" aria-hidden="true">✱</span>' : ''}
                    ${escapeHTML(field.label)}
                </label>
                ${field.icon ? `<img src="assets/icons/${field.icon}" alt="${field.id.toUpperCase()}" class="form__social-icon" aria-hidden="true">` : ''}
                ${!field.icon ? '<div class="form__error" aria-live="polite"></div>' : ''}
            </div>
        `;
    }
    return div;
}

// Эта функция для защиты от вставки кода в поля формы (проверка простая, но лучше чем без нее)
function escapeHTML(str) {
    const escapeChars = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    };
    return str.replace(/[&<>'"]/g, tag => escapeChars[tag] || tag);
}
