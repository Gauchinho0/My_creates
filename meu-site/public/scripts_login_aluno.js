document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário
  
  // Obtém os valores do formulário
  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Envia uma requisição POST para a rota de login de alunos no servidor
  fetch('/login/aluno', { // Alteração na URL para corresponder à rota no servidor
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, senha: senha })
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      throw new Error('Credenciais inválidas');
    }
  })
  .then(data => {
    alert(data); // Exibe a mensagem de login bem-sucedido
    // Redireciona para a página principal ou realiza outra ação necessária após o login
    window.location.href = 'portal_aluno.html'; // Redireciona para a página principal
  })
  .catch(error => {
    alert(error.message); // Exibe a mensagem de erro
  });
});
