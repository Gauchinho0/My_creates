$(document).ready(function() {
    // Calculadora de IMC
    $('#bmi-form').submit(function(event) {
        event.preventDefault();
        var weight = parseFloat($('#bmi-weight').val());
        var height = parseFloat($('#bmi-height').val()) / 100; // Convertendo para metros
        var bmi = weight / (height * height);

        // Verifica se o peso está dentro do intervalo desejado
        if (weight > 0 && weight <= 1000) {
            $('#bmi-result').html('Seu IMC: ' + bmi.toFixed(2));
        } else {
            $('#bmi-result').html('Peso deve ser maior que 0 e menor ou igual a 1000 kg');
        }
    });

    // Calculadora de TMB
    $('#bmr-form').submit(function(event) {
        event.preventDefault();
        var weight = parseFloat($('#bmr-weight').val());
        var height = parseFloat($('#bmr-height').val());
        var age = parseInt($('#bmr-age').val());
        var gender = $('#bmr-gender').val();
        var bmr;

        // Verifica se o peso está dentro do intervalo desejado
        if (weight > 0 && weight <= 1000) {
            if (gender === 'male') {
                bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
            } else {
                bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
            }
            $('#bmr-result').html('Seu TMB: ' + bmr.toFixed(2) + ' calorias/dia');
        } else {
            $('#bmr-result').html('Peso deve ser maior que 0 e menor ou igual a 1000 kg');
        }
    });
});
