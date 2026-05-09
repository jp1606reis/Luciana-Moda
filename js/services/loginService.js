

async function doLogin() {
    const email = document.getElementById('l-user').value.trim();
    const password = document.getElementById('l-pass').value;
    const userDetails = document.getElementsByClassName('nav-right')
    console.log(email)
    console.log(password)
    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        console.log('Success:', result);

        if (!response.ok) {
            console.log('Usuário ou senha incorretos')
            throw new Error();
        }


        localStorage.setItem("token", result.token);
        closeLogin();
        updateNavbar();


    } catch (error) {
        console.log(error)
        document.getElementById('login-err').style.display = 'block';
    }
}

async function forgotPassword(params) {

}


async function resetPassword(params) {

}