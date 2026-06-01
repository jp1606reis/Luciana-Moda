function toast(msg, duration = 3000) {
    const el = document.getElementById('toast-el');
    if (!el) return;

    // Define a mensagem
    el.textContent = msg;

    // Mostra o elemento
    el.classList.add('show');

    // Remove após o tempo definido
    setTimeout(() => {
        el.classList.remove('show');
    }, duration);
}