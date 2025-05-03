document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pegando os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;  // Novo campo
    const endereco = document.getElementById('endereco').value;  // Novo campo

    // Enviando os dados para o backend
    const response = await fetch('http://localhost:3000/api/auth/registrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, telefone, endereco })  // Incluindo os novos campos
    });

    // Processando a resposta do servidor
    const data = await response.json();

    // Verificando se o cadastro foi bem-sucedido
if (data.success) {
    alert('Cadastro realizado com sucesso!');
} else {
    alert(data.message);
}

// Redirecionando para a página de login após o cadastro
if (data.success) {
    window.location.href = 'login.html';
}
});

