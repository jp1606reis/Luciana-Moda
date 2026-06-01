
// var API_BASE = "http://localhost:3000";

// 2. O que acontece quando a página carrega
// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Sistema iniciado...");
    const token = localStorage.getItem("token");
    if (token) {
        renderNavbar();
    }
    // 1. Renderiza a interface básica
    if (typeof renderNavbar === 'function') {
        renderNavbar();
    }

    // 2. Busca os produtos da vitrine
    if (typeof getAllProducts === 'function') {
        getAllProducts();
    }


});

// 3. Funções de navegação global
function goPage(page) {
    const routes = {
        'home': '/index.html',
        'colecao': '/Coleção/index.html'
    };
    window.location.href = routes[page] || '/index.html';
}