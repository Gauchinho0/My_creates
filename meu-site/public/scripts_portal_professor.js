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
                        if (disciplina.opcao_2) {
                            // Cria uma nova linha na tabela para a segunda opção de horário
                            const trOpcao2 = document.createElement('tr');
                            trOpcao2.innerHTML = `
                                <td>${curso}</td>
                                <td>${disciplina.disciplina}</td>
                                <td>${disciplina.professor}</td>
                                <td>${disciplina.opcao_2.dia_semana}</td>
                                <td>${disciplina.opcao_2.periodo}</td>
                                <td>${disciplina.opcao_2.horario.join('<br>')}</td>
                                <td>${disciplina.vagas_disponiveis}</td>
                                <td>${disciplina.alunos_matriculados.length}</td>
                                <td><button class="btn btn-primary btn-sm editar-btn" data-toggle="modal" data-target="#detalhesDisciplinaModal">Editar</button></td>
                            `;
                            tbody.appendChild(trOpcao2);
                        }

                        // Cria uma nova linha na tabela para a primeira opção de horário
                        const trOpcao1 = document.createElement('tr');
                        trOpcao1.innerHTML = `
                            <td>${curso}</td>
                            <td>${disciplina.disciplina}</td>
                            <td>${disciplina.professor}</td>
                            <td>${disciplina.opcao_1.dia_semana}</td>
                            <td>${disciplina.opcao_1.periodo}</td>
                            <td>${disciplina.opcao_1.horario.join('<br>')}</td>
                            <td>${disciplina.vagas_disponiveis}</td>
                            <td>${disciplina.alunos_matriculados.length}</td>
                            <td><button class="btn btn-primary btn-sm editar-btn" data-toggle="modal" data-target="#detalhesDisciplinaModal">Editar</button></td>
                        `;
                        tbody.appendChild(trOpcao1);
                    });
                });

                // Adiciona um ouvinte de eventos para os botões "Editar"
                const editarBtns = document.querySelectorAll(".editar-btn");
                editarBtns.forEach(btn => {
                    btn.addEventListener("click", function() {
                        // Obtém a linha (tr) pai do botão clicado
                        const row = this.closest("tr");

                        // Obtém os dados da disciplina da linha clicada
                        const curso = row.cells[0].textContent;
                        const disciplina = row.cells[1].textContent;
                        const professor = row.cells[2].textContent;
                        const diaSemana = row.cells[3].textContent;
                        const periodo = row.cells[4].textContent;
                        const horario = row.cells[5].textContent;
                        const vagasDisponiveis = row.cells[6].textContent;

                        // Atualiza os campos do modal com os detalhes da disciplina
                        document.getElementById("modal-curso").textContent = curso;
                        document.getElementById("modal-disciplina").textContent = disciplina;
                        document.getElementById("modal-professor").textContent = professor;
                        document.getElementById("modal-diaSemana").textContent = diaSemana;
                        document.getElementById("modal-periodo").textContent = periodo;
                        document.getElementById("modal-horarios").textContent = horario;
                        document.getElementById("modal-vagasDisponiveis").textContent = vagasDisponiveis;
                    });
                });
            })
            .catch(error => {
                console.error(error.message); // Exibe a mensagem de erro no console
                // Você pode adicionar tratamento de erro adicional conforme necessário
            });
    }

    // Chamada da função para carregar as disciplinas quando a página carrega
    carregarDisciplinasCursos();
});
