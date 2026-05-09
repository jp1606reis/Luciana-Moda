function openUserMenu() {
    const token = localStorage.getItem("token");

    if (!token) {
        openLogin();
        return;
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    document.getElementById("login-modal").innerHTML = `
        <div class="login-card">
            <button class="login-close" onclick="closeLogin()">✕</button>
            <div class="login-logo"><span>Luciana</span> Moda</div>
            <div class="login-sub">Área do Usuário</div>

            <div class="user-info-box">
                <div class="user-avatar">${payload.username.charAt(0).toUpperCase()}</div>
                <div class="user-details">
                    <div class="user-name">${payload.username}</div>
                    <div class="user-email">${payload.email}</div>
                </div>
            </div>

            <div class="user-menu-actions">
                <button class="user-menu-btn" onclick="openOrders()">
                    <span>📦</span> Meus Pedidos
                </button>
                <button class="user-menu-btn" onclick="openEditProfile()">
                    <span>✏️</span> Editar Perfil
                </button>
            </div>

            <div class="logout-divider"></div>

            <button class="logout-btn" onclick="logout()">Sair da Conta →</button>
        </div>
    `;
    document.getElementById('login-modal').classList.add('show');
}


function updateNavbar() {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
        // Decodifica o payload do JWT
        const payload = JSON.parse(atob(token.split(".")[1]));
        
        const navRight = document.querySelector('.nav-right');
        if (navRight) {
            navRight.innerHTML = `
                <button class="admin-btn" onclick="openUserMenu()">
                    ${payload.username || 'Usuário'} ✦
                </button>
                <div class="cart-wrap">
                    <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
                    <div class="cart-badge" id="cart-badge">0</div>
                </div>
                <button class="admin-btn logout-btn" onclick="logout()">Sair</button>
            `;
        }
    } catch (e) {
        console.error("Erro ao decodificar token:", e);
        logout(); // Se o token estiver corrompido, melhor deslogar
    }
}



function logout() {
    localStorage.removeItem("token");
    document.querySelector('.nav-right').innerHTML = `
        <button class="admin-btn" onclick="openLogin()">Login ✦</button>
        <div class="cart-wrap">
            <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
            <div class="cart-badge" id="cart-badge">0</div>
        </div>
    `;
}



