
async function createUser() {
    const name     = document.getElementById('r-name').value.trim();
    const username = document.getElementById('r-username').value.trim();
    const email    = document.getElementById('r-email').value.trim();
    const pass     = document.getElementById('r-pass').value;
    const confirm  = document.getElementById('r-pass-confirm').value;
    const err      = document.getElementById('login-err');

    if (!name || !username || !email || !pass) {
        err.textContent = 'Preencha todos os campos.';
        err.style.display = 'block';
        return;
    }

    if (pass !== confirm) {
        err.textContent = 'As senhas não coincidem.';
        err.style.display = 'block';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, email, password: pass }),
        });

        if (!res.ok) throw new Error();

        openLogin();
    } catch {
        err.textContent = 'Erro ao criar conta. Tente novamente.';
        err.style.display = 'block';
    }
}

async function updateUser(params) {
    
}
