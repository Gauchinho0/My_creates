document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar as disciplinas dos cursos a partir do arquivo JSON
    function carregarDisciplinasCursos() {
        // Envia uma requisição GET para o arquivo JSON de disciplinas
        fetch('data/disciplinas.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Não foi possível carregar as disciplinas. Tente novamente.');
                }
            })
            .then(disciplinasCursos => {
                // Loop sobre os cursos e suas disciplinas para adicionar na página
                Object.keys(disciplinasCursos).forEach(curso => {
                    const disciplinas = disciplinasCursos[curso];
                    const divCurso = document.createElement("div");
                    divCurso.classList.add("col-md-4", "mb-4");
                    divCurso.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${curso}</h5>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Disciplina</th>
                                            <th>Professor</th>
                                            <th>Período</th>
                                            <th>Horários</th>
                                            <th>Editar Horário</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${disciplinas.map((disciplina, index) => `
                                            <tr>
                                                <td>${index + 1}</td>
                                                <td>${disciplina.disciplina}</td>
                                                <td>${disciplina.professor}</td>
                                                <td>${disciplina.periodo}</td>
                                                <td>${disciplina.horarios.join("<br>")}</td>
                                                <td><button class="btn btn-sm btn-primary editar-horario" data-disciplina="${disciplina.disciplina}">Editar</button></td>
                                            </tr>
                                        `).join("")}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `;
                    document.getElementById("cursos-container").appendChild(divCurso);
                });

                // Adiciona os ouvintes de evento para os botões de editar horário
                const botoesEditarHorario = document.querySelectorAll('.editar-horario');
                botoesEditarHorario.forEach(botao => {
                    botao.addEventListener('click', function() {
                        const disciplina = this.getAttribute('data-disciplina');
                        // Aqui você pode adicionar a lógica para abrir um modal ou navegar para a página de edição de horário
                        // por exemplo, exibir um modal com campos de entrada para editar o horário da disciplina
                        // ou navegar para outra página de edição de horário
                        alert(`Editar horário da disciplina: ${disciplina}`);
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
