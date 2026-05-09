function toggleCart() {
    renderCart()
    getCart()
    document.getElementById('cart-sidebar').classList.toggle('open');
}

function renderCart() {
    console.log('entrou')
    document.getElementById("cart-sidebar").innerHTML = `
        <div class="cart-hdr">
            <h2>Carrinho</h2>
            <button class="cart-close" onclick="toggleCart()">✕</button>
        </div>
        <div class="cart-items" id="cart-items">
            <p>Carregando...</p>
        </div>
    `;
}


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

function openLogin() {
    document.getElementById("login-modal").innerHTML = `
        <div class="login-card">
            <button class="login-close" onclick="closeLogin()">✕</button>
            <div class="login-logo"><span>Luciana</span> Moda</div>
            <div class="login-sub">Área de Login</div>
            <div class="login-err" id="login-err">Usuário ou senha incorretos.</div>
            <div class="lf">
                <label>Usuário</label>
                <input id="l-user" placeholder="Digite seu email" autocomplete="username">
            </div>
            <div class="lf">
                <label>Senha</label>
                <input type="password" id="l-pass" placeholder="••••••••" autocomplete="current-password">
            </div>
            <button class="login-btn" onclick="doLogin()">Entrar →</button>
            <div class="login-links">
                <button class="login-cancel" onclick="openForgotPassword()">Esqueceu a senha?</button>
            </div>
            <div class="login-links">
                <button class="login-cancel" onclick="openRegister()">Novo Usuário?</button>
            </div>
        </div>
    `;
    document.getElementById('login-modal').classList.add('show');
}

function openForgotPassword() {
    document.getElementById("login-modal").innerHTML = `
        <div class="login-card">
            <div class="login-logo"><span>Luciana</span> Moda</div>
            <div class="login-sub">Recuperar Senha</div>
            <div class="login-err" id="login-err">E-mail não encontrado.</div>
            <div class="lf">
                <label>E-mail</label>
                <input id="l-email" placeholder="Digite seu e-mail" autocomplete="email">
            </div>
            <button class="login-btn" onclick="doForgotPassword()">Enviar →</button>
            <button class="login-cancel" onclick="openLogin()">← Voltar</button>
        </div>
    `;
}

function openRegister() {
    document.getElementById("login-modal").innerHTML = `
        <div class="login-card">
            <button class="login-close" onclick="closeLogin()">✕</button>
            <div class="login-logo"><span>Luciana</span> Moda</div>
            <div class="login-sub">Criar Conta</div>
            <div class="login-err" id="login-err">Verifique os campos e tente novamente.</div>
            <div class="lf">
                <label>Nome</label>
                <input id="r-name" placeholder="Digite seu nome" autocomplete="name">
            </div>
            <div class="lf">
                <label>Username</label>
                <input id="r-username" placeholder="Como você quer ser chamado?" autocomplete="username">
            </div>
            <div class="lf">
                <label>E-mail</label>
                <input id="r-email" placeholder="Digite seu e-mail" autocomplete="email">
            </div>
            <div class="lf">
                <label>Senha</label>
                <input type="password" id="r-pass" placeholder="••••••••" autocomplete="new-password">
            </div>
            <div class="lf">
                <label>Confirmar Senha</label>
                <input type="password" id="r-pass-confirm" placeholder="••••••••" autocomplete="new-password">
            </div>
            <button class="login-btn" onclick="createUser()">Criar Conta →</button>
            <div class="login-links">
                <span>Já tem conta?</span>
                <button class="login-cancel" onclick="openLogin()">← Voltar</button>
            </div>
        </div>
    `;
    document.getElementById('login-modal').classList.add('show');
}

function closeLogin() {
    document.getElementById('login-modal').classList.remove('show');
}