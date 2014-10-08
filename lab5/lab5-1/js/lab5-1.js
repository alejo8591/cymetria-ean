$(document).ready(function(){
  showPerson();
  
  var container = $('#price-range');
  var max = $('#max').val();
  var min = $('#min').val();
  
  var range_slider = $('<div></div>')
    .slider({
      min: 0,
      max: 100,
      step: 10,
      values: [min, max],
      range: true,
      animate: true,
      slide: function(e,ui) {
        $(this)
          .parent()
          .find('#min')
          .val(ui.values[0]);
        $(this)
          .parent()
          .find('#max')
          .val(ui.values[1]);
        showPerson();
      }
    });
    $('#price-range').after('<h3>Seleccione el rango: </h3>');
      
  $('#price-range').after(range_slider).hide();
});

function showPerson() {
  min = $('#min').val();
  max = $('#max').val();
  $('.data tr').each(function() {
    var price = parseInt($(this).find('td:last').text());
    if(price >= min && price <= max) {
      $(this).fadeIn();
    } else {
      $(this).fadeOut();
    }
  });
}

