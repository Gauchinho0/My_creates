document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar as disciplinas dos cursos a partir do servidor
    function carregarDisciplinasCursos() {
        // Envia uma requisição GET para o servidor para obter as disciplinas
        fetch('/disciplinas')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível carregar as disciplinas. Tente novamente.');
                }
            })
            .then(disciplinasCursos => {
                // Seleciona o corpo da tabela
                const tbody = document.querySelector('#turmasTable tbody');
                // Limpa o conteúdo atual da tabela
                tbody.innerHTML = '';

                // Itera sobre os cursos e suas disciplinas para adicionar na tabela
                disciplinasCursos.forEach(curso => {
                    curso.disciplinas.forEach(disciplina => {
                        const tr = document.createElement('tr');
                        tr.innerHTML = `
                            <td>${curso.numero}</td>
                            <td>${curso.nome}</td>
                            <td>${disciplina.disciplina}</td>
                            <td>${disciplina.professor}</td>
                            <td>${disciplina.horario.manha.join('<br>')}</td>
                            <td>${disciplina.horario.tarde.join('<br>')}</td>
                            <td>${disciplina.horario.noite.join('<br>')}</td>
                        `;
                        tbody.appendChild(tr);
                    });
                });
            })
            .catch(error => {
                console.error(error.message); // Exibe a mensagem de erro no console
                // Você pode adicionar tratamento de erro adicional conforme necessário
            });
    }

    // Chamada da função para carregar as disciplinas dos cursos quando a página carrega
    carregarDisciplinasCursos();
});
