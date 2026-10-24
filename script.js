/*  1. ВВОД ИМЕНИ ЧЕРЕЗ prompt  */
const userName = prompt("Как вас зовут?", "Гость");
/*  2. ПРИВЕТСТВИЕ ЧЕРЕЗ alert  */
if (userName) {
    alert("Здравствуйте, " + userName + "! Добро пожаловать на страницу языкового энтузиаста.");
} else {
    alert("Здравствуйте! Добро пожаловать на страницу языкового энтузиаста.");
}
console.log("Пользователь: " + (userName || "аноним"));

/* 3. ИСХОДНЫЕ ДАННЫЕ 
   Массив из 7 чисел — количество новых слов, выученных за каждый день недели */
const wordsPerDay = [45, 8, 60, 12, 75, 5, 30];
console.log("Массив выученных слов по дням:", wordsPerDay);
/*4. ФУНКЦИИ*/
// Поиск максимума в массиве
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
// Фильтрация: возвращает массив дней, где выучено > 50 слов
function filterHighProgress(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 50) {
            result.push(arr[i]);
        }
    }
    return result;
}
//  Подсчёт суммы всех элементов массива
function sumArray(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
/*5. РАСЧЁТЫ*/
const totalWords  = sumArray(wordsPerDay);          // всего выучено
const highDays    = filterHighProgress(wordsPerDay); // дни с прогрессом > 50
const maxDay      = findMax(wordsPerDay);            // максимум за день
//  Цикл: считаем дни с малым прогрессом (≤ 10 слов) и их процент
let smallDaysCount = 0;
const totalDays = wordsPerDay.length;
for (let i = 0; i < wordsPerDay.length; i++) {
    if (wordsPerDay[i] <= 10) {
        smallDaysCount++;
    }
}
const smallDaysPercent = (smallDaysCount / totalDays) * 100;
// Среднее значение за день
const average = totalWords / totalDays;

