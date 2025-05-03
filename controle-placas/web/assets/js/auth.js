// Verifica se o usuário está logado assim que o script é carregado
const token = localStorage.getItem('token');
if (!token) {
    window.location.replace('login.html'); // Redireciona sem adicionar ao histórico
}

// Quando a janela terminar de carregar
window.onload = function () {
    showLoadingScreen();

    // Exibe o nome do usuário
    const nomeUsuario = localStorage.getItem('nome');
    if (nomeUsuario && document.getElementById('usuarioNome')) {
        document.getElementById('usuarioNome').textContent = `Bem-vindo, ${nomeUsuario}`;
    }

    hideLoadingScreen(); // Esconde a tela de loading depois de carregar tudo
};

// Função para fazer logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    window.location.href = 'login.html';
}
