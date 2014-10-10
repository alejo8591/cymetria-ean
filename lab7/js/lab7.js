
$(document).ready(function(){

	var hangman = null;	
	// Creando el objeto para el juego
	hangman = new Hangman($('#hangm'));

	// Verificando la palabra que ingresa en el input `text`
	$('#guess').keyup(function(e){
		hangman.guess($(this).val());
		$(this).val('');
		e.preventDefault();
	});

	// Cuando se reinicia el juego
	$('button').on('click', function(e){
		hangman.reset();
		e.preventDefault();
	});

});