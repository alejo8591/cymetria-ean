// Objeto global que contiene las variables dek juego
var game = {};

// todas los posibles valores que puede tomar del sprite-sheed

game.sprite = [
	'card-a-k', 'card-a-k',
	'card-a-q', 'card-a-q',
	'card-a-j', 'card-a-j',
	'card-b-k', 'card-b-k',
	'card-b-q', 'card-b-q',
	'card-b-j', 'card-b-j',
];

function randomNum(){
	// Esta función utilizar un valor positivo generado entre -0.5 a 0-5
	return 0.5 - Math.random();
}

$(function(){
	// Poniendo el tablero en modo aleatorio
	game.sprite.sort(randomNum);

	// Clonar 12 copias de la carta
	for (var i = 0 ; i < 11; i++) {
		$('.card:first-child').clone().appendTo('#cards');
	}

	// Inicializar cada carta
	$('#cards').children().each(function(e){
		// alineando las cartas
		$(this).css({
			"left" : ($(this).width() + 20) * (e % 4),
			"top" : ($(this).height() + 20) * Math.floor(e/4)
		});

		// Patron que se obtiene del sprite de manera aleatoria con respecto a los valores cargados en CSS
		var pattern = game.sprite.pop();

		// Visualizando el patron generado por la variable `pattern` correspondiente a las clases definidas en styles.css
		$(this).find('.back').addClass(pattern);

		// Embebiendo el patron en el DOM del elemento
		$(this).attr('data-pattern', pattern);

		$(this).click(selectCard);
	});

});

function selectCard(){
	// No hace nada si hay dos cartas volteadas
	if($('.card-flipped').size() > 1){
		return;
	}
	// Agregando la clase "card-flipped"
	// En este caso el navegador lleva a cabo la animación entre el estado actual y el estado de la carta volteada
	$(this).addClass('card-flipped');

	// Verificando el valor del patron al voltear las cartas
	if($('.card-flipped').size() == 2){
		// intervalo en 0.7 Segundo
		setTimeout(checkPattern, 700);
	}

}

// funcion para cuando ambas tarjetas son iguales o no
function checkPattern(){
	if(isMatchPattern()){
		$('.card-flipped').removeClass('card-flipped').addClass('card-removed');

		// Eliminando la carta del DOM, despues de el efecto de transición
		$('.card-removed').bind("webkitTransitionEnd", removeTookCards);

	} else {

		$('.card-flipped').removeClass('card-flipped');
	}
}

// funcion para remover las cartas cuando son iguales
function removeTookCards(){

	$('.card-removed').remove();
}

// funcion para verificar si la carta volteada coincide con el patron definido en game.sprite[posición]
function isMatchPattern(){

	var cards = $('.card-flipped');

	var pattern = $(cards[0]).data('pattern');

	var another_pattern = $(cards[1]).data('pattern');

	return (pattern === another_pattern);
}



