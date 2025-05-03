document.addEventListener("DOMContentLoaded", () => {
    // Modal de Alerta
    const alertModalEl = document.getElementById("alertModal");
    if (!alertModalEl) {
        console.error("Modal de alerta não encontrado no DOM");
        return;
    }

    const alertMessage = document.getElementById("alertMessage");
    const alertCloseBtn = document.getElementById("alertCloseBtn");
    const alertCloseBtnFooter = document.getElementById("alertCloseBtnFooter");
    const alertModal = new bootstrap.Modal(alertModalEl);

    // Exibir o alerta
    window.mostrarAlerta = function (mensagem) {
        alertMessage.textContent = mensagem;
        alertModal.show();
    };

    // Fechar o modal de alerta
    const fecharAlerta = () => {
        alertModal.hide();
    };

    alertCloseBtn?.addEventListener("click", fecharAlerta);
    alertCloseBtnFooter?.addEventListener("click", fecharAlerta);

    // Modal de Confirmação
    const confirmModalEl = document.getElementById("confirmModal");
    if (!confirmModalEl) {
        console.error("Modal de confirmação não encontrado no DOM");
        return;
    }

    const confirmMessage = document.getElementById("confirmMessage");
    const btnYes = document.getElementById("confirmYes");
    const btnNo = document.getElementById("confirmNo");
    const confirmModal = new bootstrap.Modal(confirmModalEl);

    // Função para mostrar a confirmação e retornar a resposta
    window.confirmarAcao = function (mensagem) {
        return new Promise((resolve) => {
            confirmMessage.textContent = mensagem;
            confirmModal.show();

            const aceitar = () => {
                confirmModal.hide();
                resolve(true);
                limparEventos();
            };

            const cancelar = () => {
                confirmModal.hide();
                resolve(false);
                limparEventos();
            };

            btnYes.addEventListener("click", aceitar);
            btnNo.addEventListener("click", cancelar);

            function limparEventos() {
                btnYes.removeEventListener("click", aceitar);
                btnNo.removeEventListener("click", cancelar);
            }
        });
    };
});
