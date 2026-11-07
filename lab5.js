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
/*  ДОБАВЛЕНИЕ СЛОВА В DOM 
   Создаёт <tr> с тремя ячейками: слово, перевод, кнопка «Удалить» */
function createRow(word, translation, saveFlag) {
    if (!dictBody) {
        console.error('Тело таблицы #dict-body не найдено');
        return;
    }
    // Создаём строку
    const tr = document.createElement('tr');
    // Ячейка «Слово»
    const tdWord = document.createElement('td');
    tdWord.textContent = word;
    tr.appendChild(tdWord);
    // Ячейка «Перевод»
    const tdTrans = document.createElement('td');
    tdTrans.textContent = translation;
    tr.appendChild(tdTrans);
    // Ячейка с кнопкой удаления
    const tdAction = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.textContent = 'Удалить';
    delBtn.className = 'row-delete-btn';
    delBtn.setAttribute('aria-label', 'Удалить слово ' + word);
    // Обработчик удаления конкретной строки
    delBtn.addEventListener('click', function () {
        removeRow(tr);
    });
    tdAction.appendChild(delBtn);
    tr.appendChild(tdAction);
    // Добавляем строку в таблицу
    dictBody.appendChild(tr);
    // Сохраняем в localStorage
    if (saveFlag) {
        const dict = loadDictionary();
        dict.push({ word: word, translation: translation });
        saveDictionary(dict);
    }
}
/* УДАЛЕНИЕ СТРОКИ С АНИМАЦИЕЙ  */
function removeRow(tr) {
    if (!tr) return;
    tr.classList.add('row-removed');  // запускаем анимацию
    setTimeout(function () {
        tr.remove();
        // Обновляем localStorage после удаления
        rebuildDictionaryStorage();
    }, 300);
}
/* Пересобираем словарь из текущего DOM после удаления строки */
function rebuildDictionaryStorage() {
    if (!dictBody) return;
    const rows = dictBody.querySelectorAll('tr');
    const dict = [];
    rows.forEach(function (row) {
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
            dict.push({
                word:       cells[0].textContent,
                translation: cells[1].textContent
            });
        }
    });
    saveDictionary(dict);
}
/*  ДОБАВЛЕНИЕ СЛОВА ЧЕРЕЗ PROMPT  */
function addWord() {
    const word = prompt('Введите слово:', '');
    if (!word) {
        console.log('Добавление слова отменено пользователем');
        return;
    }
    const translation = prompt('Введите перевод для слова "' + word + '":', '');
    if (!translation) {
        console.log('Перевод не введён — слово не добавлено');
        return;
    }
    createRow(word.trim(), translation.trim(), true);
    console.log('Добавлено слово: ' + word + ' — ' + translation);
}
/* ОЧИСТКА ВСЕГО СЛОВАРЯ */
function clearDictionary() {
    if (!dictBody) {
        console.error('Тело таблицы #dict-body не найдено');
        return;
    }
    const rows = dictBody.querySelectorAll('tr');
    if (rows.length === 0) {
        alert('Словарь уже пуст');
        console.log('Словарь пуст — нечего удалять');
        return;
    }
    if (!confirm('Удалить все слова из словаря?')) {
        console.log('Очистка словаря отменена пользователем');
        return;
    }
    rows.forEach(function (row) {
        row.remove();
    });
    saveDictionary([]);
    console.log('Словарь очищен');
}
/* ПЕРЕКЛЮЧЕНИЕ ТЕМЫ  */
function toggleTheme() {
    if (!document.body) {
        console.error('body не найден');
        return;
    }
    const isDark = document.body.classList.contains('theme-dark');
    if (isDark) {
        document.body.classList.remove('theme-dark');
        document.body.classList.add('theme-light');
        saveTheme('theme-light');
        console.log('Тема переключена на светлую');
    } else {
        document.body.classList.remove('theme-light');
        document.body.classList.add('theme-dark');
        saveTheme('theme-dark');
        console.log('Тема переключена на тёмную');
    }
}

/* СКРЫТИЕ/ПОКАЗ СЛОВАРЯ  */
function toggleCollapse() {
    if (!dictSection) {
        console.error('Секция #dictionary не найдена');
        return;
    }
    const table = dictSection.querySelector('.dict-table');
    if (!table) {
        console.error('Таблица .dict-table не найдена');
        return;
    }
    table.classList.toggle('hidden');
    const isHidden = table.classList.contains('hidden');
    collapseDictBtn.textContent = isHidden ? 'Развернуть словарь' : 'Свернуть словарь';
    console.log('Словарь ' + (isHidden ? 'свёрнут' : 'развёрнут'));
}

