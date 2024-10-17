// Состояние приложения
const state = {
    posts: [],          
    sortConfig: {
        column: null,   // Текущая колонка для сортировки
        isAscending: true // Направление сортировки (по возрастанию/убыванию)
    }
};

// Константы
const API_CONFIG = {
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    ENDPOINTS: {
        POSTS: '/posts'
    }
};

const SEARCH_CONFIG = {
    MIN_QUERY_LENGTH: 3
};

// Основные функции для работы с API
const api = {
    /**
     * Загружает посты с сервера
     * @returns {Promise<Array>} Массив постов
     */
    async getPosts() {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.POSTS}`);
        if (!response.ok) {
            console.error(response)
        }
        return response.json();
    }
};

// Функции для работы с DOM
const domHelpers = {
    /**
     * Создает ячейку таблицы с подсветкой найденного текста
     */
    createTableCell(content, searchQuery = '') {
        const cell = document.createElement('td');
        cell.classList.add('table__cell');

        if (searchQuery) {
            const highlightPattern = new RegExp(`(${searchQuery})`, 'gi');
            cell.innerHTML = content.toString().replace(highlightPattern, '<mark>$1</mark>');
        } else {
            cell.textContent = content;
        }

        return cell;
    },

    /**
     * Создает строку таблицы для поста
     */
    createTableRow(post, searchQuery = '') {
        const row = document.createElement('tr');
        row.classList.add('table__row');

        const cellsContent = [
            post.userId,
            post.id,
            post.title,
            post.body
        ];

        cellsContent.forEach(content => {
            row.appendChild(this.createTableCell(content, searchQuery));
        });

        return row;
    }
};

// Функции для работы с постами
const postsManager = {
    /**
     * Отображает посты в таблице
     */
    displayPosts(posts, searchQuery = '') {
        const tableBody = document.querySelector('.table__body');
        tableBody.innerHTML = '';

        posts.forEach(post => {
            tableBody.appendChild(domHelpers.createTableRow(post, searchQuery));
        });
    },

    /**
     * Сортирует посты по указанной колонке
     */
    sortPosts(column) {
        if (state.sortConfig.column === column) {
            state.sortConfig.isAscending = !state.sortConfig.isAscending;
        } else {
            state.sortConfig.column = column;
            state.sortConfig.isAscending = true;
        }

        const sortedPosts = [...state.posts].sort((a, b) => {
            const direction = state.sortConfig.isAscending ? 1 : -1;
            return a[column] > b[column] ? direction : -direction;
        });

        this.updateSortIndicators();
        this.displayPosts(sortedPosts);
    },

    /**
     * Обновляет индикаторы сортировки в заголовках таблицы
     */
    updateSortIndicators() {
        document.querySelectorAll('.sortable').forEach(header => {
            const column = header.dataset.sort;
            header.textContent = header.dataset.label;

            if (column === state.sortConfig.column) {
                header.textContent += state.sortConfig.isAscending ? ' ▲' : ' ▼';
            }
        });
    },

    /**
     * Фильтрует посты по поисковому запросу
     */
    filterPosts(query) {
        if (query.length < SEARCH_CONFIG.MIN_QUERY_LENGTH) {
            this.displayPosts(state.posts);
            return;
        }

        const filteredPosts = state.posts.filter(post =>
            post.title.toLowerCase().includes(query) ||
            post.body.toLowerCase().includes(query)
        );

        this.displayPosts(filteredPosts, query);
    }
};

// Обработчики событий
const eventHandlers = {
    /**
     * Инициализирует обработчики событий сортировки
     */
    initSortingHandlers() {
        document.querySelectorAll('.sortable').forEach(header => {
            header.addEventListener('click', () => {
                postsManager.sortPosts(header.dataset.sort);
            });
        });
    },

    /**
     * Инициализирует обработчик поиска
     */
    initSearchHandler() {
        const searchInput = document.querySelector('.page__search-input');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            postsManager.filterPosts(query);
        });
    }
};

/**
 * Обработчик ошибок
 */
function handleError(error) {

    const errorElement = document.querySelector('.page__error-message');
    errorElement.textContent = `😢 Упс.. Что-то пошло не так`;
    errorElement.style.display = 'block';
}

/**
 * Инициализация приложения
 */
async function initApp() {
    try {
        state.posts = await api.getPosts();
        postsManager.displayPosts(state.posts);
        eventHandlers.initSortingHandlers();
        eventHandlers.initSearchHandler();
    } catch (error) {
        handleError(error);
    }
}

// Запуск приложения при загрузке страницы
document.addEventListener('DOMContentLoaded', initApp);