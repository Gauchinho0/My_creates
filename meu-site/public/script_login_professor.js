document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;
  
      // Extrair a parte do email após "@"
      const dominio = email.split('@')[1];
  
      // Verificar se o email pertence ao domínio instituicao.com.br
      if (dominio === "instituicaoeducaomais.com.br") {
        // Aqui você pode adicionar lógica para validar as credenciais do professor
        // e fazer uma requisição ao servidor para verificar o login

        // Simulação de autenticação bem-sucedida
        if (senha === "senha123") {
          alert("Login bem-sucedido!");
          // Redirecionar para a página de dashboard ou outra página de sucesso
          window.location.href = "dashboard_professor.html";
        } else {
          alert("Senha incorreta. Tente novamente.");
        }
      } else {
        alert("Email inválido para professor. Use um email válido da instituição.");
      }
    });
  });