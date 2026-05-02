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

function closeLogin(){
    document.getElementById('login-modal').classList.remove('show');
}