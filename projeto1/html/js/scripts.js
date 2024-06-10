$(document).ready(function() {
    // Calculadora de IMC
    $('#bmi-form').submit(function(event) {
        event.preventDefault();
        var weight = parseFloat($('#bmi-weight').val());
        var height = parseFloat($('#bmi-height').val()) / 100; // Convertendo para metros
        var bmi = weight / (height * height);
        $('#bmi-result').text('Seu IMC é: ' + bmi.toFixed(2));
    });

    // Calculadora de TMB
    $('#bmr-form').submit(function(event) {
        event.preventDefault();
        var weight = parseFloat($('#bmr-weight').val());
        var height = parseFloat($('#bmr-height').val());
        var age = parseInt($('#bmr-age').val());
        var gender = $('#bmr-gender').val();
        var bmr;

        if (gender === 'male') {
            bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
        } else {
            bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
        }

        $('#bmr-result').text('Sua TMB é: ' + bmr.toFixed(2) + ' calorias/dia');
    });
});
