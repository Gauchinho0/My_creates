document.addEventListener("DOMContentLoaded", function() {
    const cadastroForm = document.getElementById("cadastroForm");

    cadastroForm.addEventListener("submit", function(event) {
        event.preventDefault();
        // Simulação de cadastro bem-sucedido
        alert("Cadastro realizado com sucesso!");
        // Redirecionar para a página de login do aluno
        window.location.href = "login_aluno.html";
    });
});
