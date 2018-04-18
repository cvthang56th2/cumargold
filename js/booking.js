function show_money() {
    var form_total_value = $('#uso_total_value').val(); 
    var uso_total_value = parseInt(form_total_value);
    var total_bill = uso_total_value * 169000;
    $('#total_bill').html(total_bill.toLocaleString());
}

$('.input-stepper-advanced').inputStepper({
	selectorButtonIncrease: '.increase',
	selectorButtonDecrease: '.decrease',
	dataAttributeIncrease: 'increase',
	dataAttributeDecrease: 'decrease'
});