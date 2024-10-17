/**
 * Получение списка постов с сервера используя fetch
 */
async function fetchAndDisplayPosts() {
    try {
        const posts = await fetchPosts();
        displayPosts(posts);
    } catch (error) {
        handleError(error);
    }
}

/**
 * Получает данные с сервера
 * @returns {Promise<Array>}
 */
async function fetchPosts() {
    const API_URL = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(API_URL);
    
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    const posts = await response.json();
    console.log(posts); // Для откладки (в проде все консоль логи надо будет убрать)
    return posts;
}

/**
 * Создает ячейку таблицы с заданным текстом
 * @param {string} content
 * @returns {HTMLTableCellElement}
 */
function createTableCell(content) {
    const cell = document.createElement('td');
    cell.textContent = content;
    cell.classList.add('table__cell');
    return cell;
}

/**
 * Создает строку таблицы для поста
 * @param {Object} post
 * @returns {HTMLTableRowElement}
 */
function createTableRow(post) {
    const row = document.createElement('tr');
    row.classList.add('table__row');

    const cells = [
        createTableCell(post.userId),
        createTableCell(post.id),
        createTableCell(post.title),
        createTableCell(post.body)
    ];

    cells.forEach(cell => row.appendChild(cell));
    return row;
}

/**
 * Отображает посты в таблице
 * @param {Array} posts
 */
function displayPosts(posts) {
    const tableBody = document.querySelector('.table__body');
    const rows = posts.map(post => createTableRow(post));
    rows.forEach(row => tableBody.appendChild(row));
}

/**
 * Обрабатывает ошибки
 * @param {Error} error
 */
function handleError(error) {
    // для разработки
    console.error('😢 Произошла ошибка:', error.message);

    // для юзера
    const errorMessageElement = document.querySelector('.page__error-message');
    errorMessageElement.textContent = `😢 Упс.. Что-то пошло не так`;
    errorMessageElement.style.display = 'block';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', fetchAndDisplayPosts);