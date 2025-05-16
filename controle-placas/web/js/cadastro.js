document.getElementById('cadastroForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Pegando os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;  // Novo campo
    const endereco = document.getElementById('endereco').value;  // Novo campo

    // Enviando os dados para o backend
    const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, telefone, endereco })  // Incluindo os novos campos
    });

    // Processando a resposta do servidor
    const data = await response.json();

    if (data.success) {
        alert('Cadastro realizado com sucesso!');
        setTimeout(() => {
            window.location.replace('login.html'); // Usando replace para forçar o redirecionamento
        }, 500); // Atraso de 1 segundo
    } else {
        alert(data.message); // Exibe a mensagem de erro
    }
});

document.getElementById('telefone').addEventListener('input', function (e) {
    let num = e.target.value.replace(/\D/g, '');

    // Aplica máscara: 00 0 0000-0000
    if (num.length > 11) num = num.slice(0, 11);
    let formatado = num.replace(/^(\d{2})(\d{1})(\d{4})(\d{0,4})/, '$1 $2 $3-$4');
    e.target.value = formatado;
});
