function showLoadingScreen() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingScreen';
    loadingDiv.innerHTML = `<div class="spinner"></div>`;
    document.body.appendChild(loadingDiv);
}

function hideLoadingScreen() {
    const loadingDiv = document.getElementById('loadingScreen');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}


// Verificar login e redirecionar, caso não esteja logado
function checkLogin() {
    if (!localStorage.getItem('token')) {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
    } else {
        // Obtém o nome do usuário do localStorage
        const nomeUsuario = localStorage.getItem('nome');

        // Exibe o nome do usuário (por exemplo, no cabeçalho da página)
        document.getElementById('usuarioNome').textContent = `Bem-vindo, ${nomeUsuario}`;

        // Remove a tela de carregamento após a verificação
        hideLoadingScreen();
    }
}