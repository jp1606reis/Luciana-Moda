function updateNavbar() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const username = payload.username || 'Usuário';
        const primeiraLetra = username.charAt(0).toUpperCase();
        
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.innerHTML = `
                <!-- Botão de Usuário Estilo Pílula -->
                <div class="user-nav-container" onclick="openUserMenu()">
                    <div class="user-initial-avatar">${primeiraLetra}</div>
                    <span class="user-nav-name">${username}</span>
                </div>

                <div class="cart-wrap">
                    <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
                    <div class="cart-badge" id="cart-badge">0</div>
                </div>

                <button class="admin-btn logout-btn" onclick="logout()" style="margin-left:10px">Sair</button>
            `;
        }
    } catch (e) {
        console.error("Erro ao atualizar navbar:", e);
    }
}

function renderNavbar() {
    // 1. Verifica se o usuário está logado
    const isLogged = !!localStorage.getItem("token");

    document.body.insertAdjacentHTML("afterbegin", `
        <nav id="navbar">
            <div class="logo" onclick="goPage('home')">
                <span class="logo-script">L</span>
                <span>uciana</span>
            </div>
            <ul class="nav-center">
                <li><a href="/index.html">Início</a></li>
                <li><a href="/Coleção/index.html">Coleção</a></li>
                <li><a onclick="openContato()">Contato</a></li>
            </ul>
            <div class="nav-right">
                ${isLogged ? `
                    <!-- Se logado: Mostra Sair -->
                    <button class="admin-btn logout-style" onclick="logout()">Sair ✕</button>
                ` : `
                    <!-- Se não logado: Mostra Login -->
                    <button class="admin-btn" onclick="openLogin()">Login ✦</button>
                `}
                
                <div class="cart-wrap">
                    <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
                    <div class="cart-badge" id="cart-badge">0</div>
                </div>
            </div>
        </nav>
        <aside class="cart-sidebar" id="cart-sidebar"></aside>
        <div class="login-bg" id="login-modal"></div>
    `);
}