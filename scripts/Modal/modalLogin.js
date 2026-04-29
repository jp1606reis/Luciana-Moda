function openLogin(){
    el = document.getElementById("login-modal")
    console.log("ABRIU PELO MODAL LOGIN")
    el.innerHTML = `
    <div class="login-card">
    <div class="login-logo"><span>Luciana</span> Moda</div>
    <div class="login-sub">Área de Login</div>
    <div class="login-err" id="login-err">Usuário ou senha incorretos.</div>
    <div class="lf">
      <label>Usuário</label>
      <input id="l-user" placeholder="Digite seu Usuário" autocomplete="username">
    </div>
    <div class="lf">
      <label>Senha</label>
      <input type="password" id="l-pass" placeholder="••••••••" autocomplete="current-password">
    </div>
    <button class="login-btn" onclick="doLogin()">Entrar →</button><br>
    <button class="login-cancel" onclick="closeLogin()">Cancelar</button>
  </div>
    `
    document.getElementById('login-modal').classList.add('show');

}

function closeLogin(){
    document.getElementById('login-modal').classList.remove('show');
}