document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCadastrarPlaca");
    const btnAbrirModal = document.getElementById("btnAbrirModal");
    const btnFecharModal = document.getElementById("btnFecharModal");
    const form = document.getElementById("formCadastrarPlaca");

    // Função para remover o backdrop
    function removerBackdrop() {
        const backdrop = document.querySelector(".modal-backdrop");
        if (backdrop) {
            backdrop.remove(); // Remove o fundo escurecido
        }
    }

    // Abre o modal e adiciona o backdrop
    btnAbrirModal.addEventListener("click", () => {
        modal.style.display = "flex";

        // Só cria o backdrop se ele ainda não existe
        if (!document.querySelector(".modal-backdrop")) {
            const backdrop = document.createElement("div");
            backdrop.classList.add("modal-backdrop", "fade", "show");
            document.body.appendChild(backdrop);
        }
    });

    // Fecha o modal ao clicar no "Cancelar" ou no "Cadastrar"
    btnFecharModal.addEventListener("click", () => {
        bootstrap.Modal.getInstance(modal).hide();
        removerBackdrop(); // Remove o backdrop ao fechar o modal
        form.reset(); // Limpa o formulário
        placaEditando = null; // Resetar a placa que está sendo editada      
        form.removeAttribute("data-editando"); // Remove o atributo de edição
    });

    // Ao cadastrar ou editar a placa
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const codigo = document.getElementById("codigo").value;
        const descricao = document.getElementById("descricao").value;
        const tipo = document.getElementById("tipo").value;
        const editandoId = form.getAttribute("data-editando");

        try {
            const url = editandoId
                ? `${API_BASE_URL}/placas/${editandoId}`
                : `${API_BASE_URL}/placas`; // Verifique se a URL de criação está correta
            const method = editandoId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo, descricao, tipo }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Erro ao salvar placa:", errorData);
                throw new Error("Erro ao salvar");
            }

            await response.json();
            bootstrap.Modal.getInstance(modal).hide();
            removerBackdrop(); // Remove o backdrop ao fechar o modal
            form.reset();
            form.removeAttribute("data-editando");
            carregarPlacas();

            if (editandoId) {
                alert("Placa atualizada com sucesso!");
            } else {
                alert("Placa cadastrada com sucesso!");
            }

        } catch (err) {
            console.error("Erro ao salvar placa:", err);
        }
    });

    // Carregar placas
    window.carregarPlacas = async function () {
        try {
            const response = await fetch(`${API_BASE_URL}/placas`);

            if (!response.ok) {
                throw new Error('Erro ao buscar placas');
            }

            const resposta = await response.json();
            const placas = Array.isArray(resposta.data) ? resposta.data : [];

            const corpoTabela = document.getElementById("corpoTabelaPlacas");
            corpoTabela.innerHTML = ""; // Limpa a tabela

            if (placas.length === 0) {
                corpoTabela.innerHTML = "<tr><td colspan='4'>Nenhuma placa encontrada.</td></tr>";
            } else {
                placas.forEach((placa) => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td>${placa.id}</td>
                        <td>${placa.codigo}</td>
                        <td>${placa.descricao}</td>
                        <td>${placa.tipo || 'Tipo não especificado'}</td>
                        <td>
                            <button class="btn btn-warning" onclick="editarPlaca(${placa.id})">Editar</button>
                            <button class="btn btn-danger" onclick="excluirPlaca(${placa.id})">Excluir</button>
                        </td>
                    `;
                    corpoTabela.appendChild(tr);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar placas:", error);
            alert("Erro ao carregar placas.");
        }
    };

    // Função para excluir uma placa
    window.excluirPlaca = async function (id) {
        // Usando a caixa de confirmação padrão do navegador
        const confirmar = window.confirm("Você tem certeza que deseja excluir esta placa?");
        if (!confirmar) return; // Se o usuário clicar em "Cancelar", a função retorna sem fazer nada

        try {
            const response = await fetch(`${API_BASE_URL}/placas/${id}`, { method: "DELETE" });

            if (!response.ok) throw new Error("Erro ao excluir placa");

            alert("Placa excluída com sucesso!");
            carregarPlacas(); // Atualiza a lista de placas
        } catch (err) {
            console.error("Erro ao excluir placa:", err);
            alert("Erro ao excluir placa.");
        }
    };



    // Função para buscar uma placa específica (editar)
    window.editarPlaca = async function (id) {
        try {
            const response = await fetch(`${API_BASE_URL}/placas/${id}`);
            if (!response.ok) {
                throw new Error("Erro ao buscar placa para edição");
            }

            const placa = await response.json();
            // Preencher os campos do modal com os dados da placa
            document.getElementById("codigo").value = placa.data.codigo;
            document.getElementById("descricao").value = placa.data.descricao;
            document.getElementById("tipo").value = placa.data.tipo;

            // Alterar o texto do botão de salvar para "Salvar"
            document.getElementById("btnSalvar").textContent = "Salvar";

            // Definir que a placa está sendo editada
            document.getElementById("formCadastrarPlaca").setAttribute("data-editando", id);

            // Exibe o modal para edição
            const modal = new bootstrap.Modal(document.getElementById("modalCadastrarPlaca"));
            modal.show();
        } catch (err) {
            console.error("Erro ao buscar placa para edição:", err);
            alert("Erro ao buscar placa para edição.");
        }
    };

    // Inicializa o carregamento das placas
    carregarPlacas();


    // Função para confirmar ação
    async function confirmarAcao(mensagem) {
        return new Promise((resolve) => {
            const confirmModalElement = document.getElementById('confirmModal');
            if (!confirmModalElement) {
                console.error("Modal de confirmação não encontrado!");
                resolve(false);
                return;
            }

            const confirmModal = new bootstrap.Modal(confirmModalElement);
            const confirmMessage = document.getElementById('confirmMessage');
            const confirmYes = document.getElementById('confirmYes');
            const confirmNo = document.getElementById('confirmNo');

            // Exibe a mensagem no modal de confirmação
            confirmMessage.textContent = mensagem;

            // Exibe o modal de confirmação
            confirmModal.show();

            // Ações dos botões no modal
            confirmYes.onclick = () => {
                confirmModal.hide();
                resolve(true);
            };

            confirmNo.onclick = () => {
                confirmModal.hide();
                resolve(false);
            };
        });
    }

});