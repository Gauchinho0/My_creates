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
            .then(disciplinasPorCurso => {
                // Seleciona o corpo da tabela
                const tbody = document.getElementById('disciplinasTableBody');
                // Limpa o conteúdo atual da tabela
                tbody.innerHTML = '';

                // Itera sobre os cursos
                Object.keys(disciplinasPorCurso).forEach(curso => {
                    // Itera sobre as disciplinas dentro de cada curso
                    disciplinasPorCurso[curso].forEach(disciplina => {
                        // Verifica se a disciplina possui mais de uma opção de horário
                        if (disciplina.opcao_1) {
                            // Cria uma nova linha na tabela para a segunda opção de horário
                            const trOpcao1 = document.createElement('tr');
                            trOpcao1.innerHTML = `
                                <td>${curso}</td>
                                <td>${disciplina.disciplina}</td>
                                <td>${disciplina.professor}</td>
                                <td>${disciplina.opcao_1.dia_semana}</td>
                                <td>${disciplina.opcao_1.periodo}</td>
                                <td>${disciplina.opcao_1.horario.join('<br>')}</td>
                                <td>${disciplina.vagas_disponiveis}</td>
                                <td><button class="btn btn-primary btn-sm matricular-btn" data-disciplina="${disciplina.id}">Matricular-se</button></td>
                            `;
                            tbody.appendChild(trOpcao1);
                        }

                        // Cria uma nova linha na tabela para a primeira opção de horário
                        const trOpcao2 = document.createElement('tr');
                        trOpcao2.innerHTML = `
                            <td>${curso}</td>
                            <td>${disciplina.disciplina}</td>
                            <td>${disciplina.professor}</td>
                            <td>${disciplina.opcao_2.dia_semana}</td>
                            <td>${disciplina.opcao_2.periodo}</td>
                            <td>${disciplina.opcao_2.horario.join('<br>')}</td>
                            <td>${disciplina.vagas_disponiveis}</td>
                            <td><button class="btn btn-primary btn-sm matricular-btn" data-disciplina="${disciplina.id}">Matricular-se</button></td>
                        `;
                        tbody.appendChild(trOpcao2);
                    });
                });

                // Adiciona um ouvinte de eventos para os botões de matrícula
                document.querySelectorAll(".matricular-btn").forEach(btn => {
                    btn.addEventListener("click", function() {
                        const disciplinaId = this.getAttribute("data-disciplina");
                        matricularAluno(disciplinaId);
                    });
                });
            })
            .catch(error => {
                console.error(error.message); // Exibe a mensagem de erro no console
                // Você pode adicionar tratamento de erro adicional conforme necessário
            });
    }

    // Função para matricular o aluno em uma disciplina
    function matricularAluno(disciplinaId) {
        // Exibe a mensagem de matrícula bem-sucedida
        alert("Matrícula efetuada com sucesso!");
    }

    // Chamada da função para carregar as disciplinas quando a página carrega
    carregarDisciplinasCursos();
});
