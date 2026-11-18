// 1. Регистрация service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((reg) => console.log('[SW] registered, scope:', reg.scope))
            .catch((err) => console.error('[SW] error:', err));
    });
}
// 2. Запрос к /api/uuid по клику
document.getElementById('generate-btn').addEventListener('click', () => {
    const count = document.getElementById('count').value;
    fetch('/api/uuid?count=' + encodeURIComponent(count))
        .then((r) => r.ok ? r.json() : r.json().then((e) => Promise.reject(e)))
        .then((data) => renderUuids(data.uuids))
        .catch((err) => showStatus('Ошибка: ' + err.error));
});
