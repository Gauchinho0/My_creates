document.addEventListener("DOMContentLoaded", function() {
    // Aqui você pode adicionar lógica para carregar as disciplinas dos cursos
    // do servidor e exibi-las na página

    // Exemplo de carregamento das disciplinas dos cursos
    const disciplinasCursos = {
        "Engenharia Civil": ["Mecânica dos Fluidos", "Estruturas de Concreto Armado", "Geotecnia"],
        "Medicina": ["Anatomia Humana", "Farmacologia Clínica", "Neurologia"],
        "Administração de Empresas": ["Marketing Estratégico", "Contabilidade Financeira", "Gestão de Recursos Humanos"]
    };

    // Função para carregar as disciplinas dos cursos na página
    function carregarDisciplinasCursos() {
        // Loop sobre os cursos e suas disciplinas para adicionar na página
        Object.keys(disciplinasCursos).forEach(curso => {
            const disciplinas = disciplinasCursos[curso];
            const divCurso = document.createElement("div");
            divCurso.classList.add("col-md-4", "mb-4");
            divCurso.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${curso}</h5>
                        <p class="card-text">
                            ${disciplinas.map(disciplina => `<strong>${disciplina}</strong>`).join("<br>")}
                        </p>
                    </div>
                </div>
            `;
            document.getElementById("cursos-container").appendChild(divCurso);
        });
    }

    // Função chamada quando a página carrega para carregar as disciplinas dos cursos
    carregarDisciplinasCursos();
});
