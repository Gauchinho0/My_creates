document.addEventListener("DOMContentLoaded", function() {
  const cadastroForm = document.getElementById("cadastroForm");

  cadastroForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Enviar os dados do cadastro para a rota de cadastro de professores no servidor
    fetch('/cadastro/professor', { // Alteração na URL para corresponder à rota no servidor
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome: nome, email: email, senha: senha })
    })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Não foi possível realizar o cadastro. Tente novamente.');
      }
    })
    .then(data => {
      alert(data); // Exibe a mensagem de cadastro bem-sucedido
      window.location.href = "login_professor.html"; // Redirecionar para a página de login do professor
    })
    .catch(error => {
      alert(error.message); // Exibe a mensagem de erro
    });
  });
});
