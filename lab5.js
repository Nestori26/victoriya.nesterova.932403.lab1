/* ПОИСК ЭЛЕМЕНТОВ (3 способа)
   getElementById, querySelector, querySelectorAll
   + проверка существования и логирование ошибок */
const dictBody        = document.getElementById('dict-body');
const addWordBtn      = document.getElementById('add-word-btn');
const clearDictBtn    = document.getElementById('clear-dict-btn');
const collapseDictBtn = document.getElementById('collapse-dict-btn');
const themeToggleBtn  = document.getElementById('theme-toggle-btn');
const dictSection     = document.querySelector('#dictionary');
const dictTableRows   = document.querySelectorAll('#dict-body tr');  // начальное состояние
/* Проверка существования критичных элементов */
function checkElements() {
    const required = {
        'dict-body':        dictBody,
        'add-word-btn':     addWordBtn,
        'clear-dict-btn':   clearDictBtn,
        'collapse-dict-btn': collapseDictBtn,
        'theme-toggle-btn': themeToggleBtn,
        '#dictionary':      dictSection
    };
    let allOk = true;
    for (const key in required) {
        if (!required[key]) {
            console.error('Элемент не найден: ' + key);
            allOk = false;
        }
    }
    return allOk;
}
/* 2. LOCALSTORAGE — сохранение и восстановление  */

const STORAGE_DICT  = 'lab5_dictionary';   // ключ для словаря
const STORAGE_THEME = 'lab5_theme';        // ключ для темы
function saveDictionary(dict) {
    try {
        localStorage.setItem(STORAGE_DICT, JSON.stringify(dict));
    } catch (e) {
        console.error('Ошибка сохранения словаря:', e);
    }
}
function loadDictionary() {
    try {
        const raw = localStorage.getItem(STORAGE_DICT);
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        console.error('Ошибка чтения словаря из localStorage:', e);
        return [];
    }
}
function saveTheme(theme) {
    localStorage.setItem(STORAGE_THEME, theme);
}
function loadTheme() {
    return localStorage.getItem(STORAGE_THEME) || 'theme-light';
}