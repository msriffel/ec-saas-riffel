document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modalCadastrarPlaca");
    const btnAbrirModal = document.getElementById("btnAbrirModal");
    const btnFecharModal = document.getElementById("btnFecharModal");
    const form = document.getElementById("formCadastrarPlaca");
    let placaEditando = null;  // Variável para armazenar a placa que está sendo editada

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
        // Adiciona o fundo escurecido manualmente
        const backdrop = document.createElement("div");
        backdrop.classList.add("modal-backdrop", "fade", "show");
        document.body.appendChild(backdrop);
    });

    // Fecha o modal ao clicar no "Cancelar" ou no "Cadastrar"
    btnFecharModal.addEventListener("click", () => {
        modal.style.display = "none";
        removerBackdrop(); // Remove o backdrop ao fechar o modal
        placaEditando = null; // Resetar a placa que está sendo editada
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
                ? `http://localhost:3000/api/placas/${editandoId}`
                : "http://localhost:3000/api/placas";
            const method = editandoId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ codigo, descricao, tipo }),
            });

            if (!response.ok) throw new Error("Erro ao salvar");

            await response.json();
            modal.style.display = "none";
            form.reset();
            form.removeAttribute("data-editando");
            listarPlacas();
        } catch (err) {
            console.error("Erro ao salvar placa:", err);
            alert("Erro ao salvar placa.");
        }
    });


    // Função para listar as placas na tabela
    async function listarPlacas() {
        try {
            const response = await fetch("http://localhost:3000/api/placas");
            const result = await response.json();
            const placas = result.data;

            const tbody = document.getElementById("corpoTabelaPlacas");
            tbody.innerHTML = "";

            placas.forEach((p) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
              <td>${p.codigo}</td>
              <td>${p.descricao}</td>
              <td>${p.tipo || '-'}</td>
              <td>
                <button onclick="editarPlaca(${p.id})">✏️</button>
                <button onclick="excluirPlaca(${p.id})">🗑️</button>
              </td>
            `;
                tbody.appendChild(tr);
            });
        } catch (err) {
            console.error("Erro ao listar placas:", err);
        }
    }

    // Função para editar uma placa
    window.editarPlaca = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/placas/${id}`);
            if (!response.ok) throw new Error("Placa não encontrada");

            const placa = await response.json();

            // Preenche os campos do modal com os dados da placa
            document.getElementById("codigo").value = placa.codigo;
            document.getElementById("descricao").value = placa.descricao;
            document.getElementById("tipo").value = placa.tipo || '';

            // Abre o modal
            document.getElementById("modalCadastrarPlaca").style.display = "block";

            // Salva o ID da placa editando (em memória temporária)
            form.setAttribute("data-editando", id);
        } catch (err) {
            console.error("Erro ao carregar placa para edição:", err);
            alert("Erro ao carregar placa.");
        }
    };


    // Função para excluir uma placa
    window.excluirPlaca = async (id) => {
        if (!confirm("Deseja realmente excluir esta placa?")) return;

        try {
            const response = await fetch(`http://localhost:3000/api/placas/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Erro ao excluir");

            listarPlacas();
        } catch (err) {
            console.error("Erro ao excluir placa:", err);
            alert("Erro ao excluir placa.");
        }
    };


    listarPlacas();
});  