// function updateNavbar() {
//     const token = localStorage.getItem("token");
//     if (!token) return;
//     console.log("ENTROU DEPOIS DE LOGAR")
//     try {
//         const payload = JSON.parse(atob(token.split(".")[1]));
//         const username = payload.username || 'Usuário';
//         const primeiraLetra = username.charAt(0).toUpperCase();

//         const navRight = document.querySelector('.nav-right');
//         if (navRight) {
//             navRight.innerHTML = `
//                 <!-- Botão de Usuário Estilo Pílula -->
//                 <div class="user-nav-container" onclick="openUserMenu()">
//                     <div class="user-initial-avatar">${primeiraLetra}</div>
//                     <span class="user-nav-name">${username}</span>
//                 </div>

//                 <div class="cart-wrap">
//                     <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
//                     <div class="cart-badge" id="cart-badge">0</div>
//                 </div>

//                 <button class="admin-btn logout-btn" onclick="logout()" style="margin-left:10px">Sair</button>
//             `;
//         }

//         renderNavbar()
//     } catch (e) {
//         console.error("Erro ao atualizar navbar:", e);
//     }
// }

function renderNavbar() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    const token = localStorage.getItem("token");

    if (!token) {
        navRight.innerHTML = `
            <button class="admin-btn" onclick="openLogin()">Login ✦</button>
            <div class="cart-wrap">
                <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
                <div class="cart-badge" id="cart-badge">0</div>
            </div>
        `;
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const username = payload.username || 'Usuário';
        const inicial = username.charAt(0).toUpperCase();

        navRight.innerHTML = `
            <div class="user-nav-container" onclick="openUserMenu()">
                <div class="user-initial-avatar">${inicial}</div>
                <span class="user-nav-name">${username}</span>
            </div>

            <div class="cart-wrap">
                <button class="nav-icon-btn" onclick="toggleCart()">🛍</button>
                <div class="cart-badge" id="cart-badge">0</div>
            </div>

            <button class="admin-btn logout-btn" onclick="logout()" style="margin-left:10px">Sair </button>
        `;

    } catch (e) {
        console.error("Erro ao processar token na Navbar:", e);
        localStorage.removeItem("token"); 
    }
}