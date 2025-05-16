document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
    });

    const data = await response.json();

    if (data.token) {
        alert('Login bem-sucedido!');
        localStorage.setItem('token', data.token);
        localStorage.setItem('nome', data.usuario.nome); // Armazenar nome do usuário
        window.location.href = 'index.html'; // Redireciona para o index após login
    } else {
        alert(data.message);
    }
});