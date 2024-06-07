$(document).ready(function() {
    // Carregar dicas de saúde na página de dicas
    if (window.location.pathname.includes('health-tips.html')) {
        const tips = [
            "Beba muita água",
            "Durma pelo menos 8 horas por noite",
            "Pratique exercícios físicos regularmente",
            "Mantenha uma alimentação equilibrada"
        ];
        tips.forEach(tip => {
            $('#health-tips').append(`<div class="col-md-6"><div class="card mb-4"><div class="card-body"><p class="card-text">${tip}</p></div></div></div>`);
        });
    }

    // Calcular IMC na página de calculadoras
    $('#bmi-form').on('submit', function(event) {
        event.preventDefault();
        const weight = parseFloat($('#weight').val());
        const height = parseFloat($('#height').val()) / 100;
        const bmi = (weight / (height * height)).toFixed(2);
        $('#bmi-result').html(`<p>Seu IMC é: ${bmi}</p>`);
    });

    // Processar formulário de autoavaliação na página de autoavaliação
    $('#self-assessment-form').on('submit', function(event) {
        event.preventDefault();
        const age = $('#age').val();
        const gender = $('#gender').val();
        const activityLevel = $('#activity-level').val();
        $('#self-assessment-result').html(`<p>Idade: ${age}</p><p>Gênero: ${gender}</p><p>Nível de Atividade Física: ${activityLevel}</p>`);
    });
});
