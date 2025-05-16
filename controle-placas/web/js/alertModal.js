document.addEventListener("DOMContentLoaded", () => {
    // Seletores do modal de alerta
    const alertModalEl = document.getElementById("alertModal");
    const alertMessage = document.getElementById("alertMessage");
    const alertCloseBtn = document.getElementById("alertCloseBtn");
    const alertCloseBtnFooter = document.getElementById("alertCloseBtnFooter");

    let alertaCallback = null;

    // Tornar funções globais
    window.mostrarAlerta = function (mensagem, callback = null) {
        alertMessage.textContent = mensagem;
        new bootstrap.Modal(alertModalEl).show();
        alertaCallback = callback;
    };

    window.fecharAlerta = function () {
        new bootstrap.Modal(alertModalEl).hide();
        if (typeof alertaCallback === 'function') {
            alertaCallback();
            alertaCallback = null;
        }
    };

    // Eventos de clique para fechar o modal
    if (alertCloseBtn) {
        alertCloseBtn.addEventListener("click", window.fecharAlerta);
    }

    if (alertCloseBtnFooter) {
        alertCloseBtnFooter.addEventListener("click", window.fecharAlerta);
    }
});

// Para exibir o modal de sucesso
window.mostrarSucesso = function () {
    const modalSucesso = new bootstrap.Modal(document.getElementById("modalSucesso"));
    modalSucesso.show();
};

// Para exibir o modal de erro
window.mostrarErro = function () {
    const modalErro = new bootstrap.Modal(document.getElementById("modalErro"));
    modalErro.show();
};
