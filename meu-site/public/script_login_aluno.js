document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      // Aqui você pode adicionar lógica para validar os dados do formulário
      // e fazer uma requisição ao servidor para verificar o login
      // Por exemplo, você pode usar o método fetch() para enviar os dados para o servidor

      // Simulação de autenticação bem-sucedida
      if (email === "exemplo@aluno.com" && senha === "senha123") {
          alert("Login bem-sucedido!");
          // Redirecionar para a página de matrícula de turmas após o login bem-sucedido
          window.location.href = "matricula_turmas.html";
      } else {
          alert("Credenciais inválidas. Tente novamente.");
      }
  });
});
