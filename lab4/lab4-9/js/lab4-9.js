// Objeto global que contiene las variables del juego

// email: alejo8591@gmail.com

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
	};

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

	/******************* START: Agregado en el lab4-6 ***************/

	// reset del tiempo transcurrido
	game.elapsed_time = 0;

	// start time
	game.timer = setInterval(counterTimer, 1000);

	/******************* END: Agregado en el lab4-6 *****************/

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

	/******************* START: Agregado en el lab4-6 ***************/
	if($('.card').length === 0){
		endGame();
	}
	/******************* END: Agregado en el lab4-6 *****************/ 
}

// funcion para verificar si la carta volteada coincide con el patron definido en game.sprite[posición]
function isMatchPattern(){

	var cards = $('.card-flipped');

	var pattern = $(cards[0]).data('pattern');

	console.log("el valor de la variable pattern es: " + pattern);

	var another_pattern = $(cards[1]).data('pattern');

	console.log("el valor de la variable another_pattern es: " + another_pattern);

	console.log("las cartas son iguales: " + (pattern === another_pattern));


	return (pattern === another_pattern);
}

/******************* START: Agregado en el lab4-6 ***************/

function counterTimer(){

	game.elapsed_time++;

	// Calcular los minutos y segundos de tiempo transcurridos
	var minute = Math.floor(game.elapsed_time / 60);
	var second = game.elapsed_time % 60;

	// Agregando 0 cuando los minutos o segundos son menores a 10
	if(minute < 10) minute = "0" + minute;
	if(second < 10) second = "0" + second;

	// Mostrando el tiempo transcurrido en el html
	$('#elapsed-time').html(minute + ":" + second);
}

function endGame(){
	// Deteniendo el tiempo
	clearInterval(game.timer);

	// Colocando un puntaje con respecto al tiempo transcurrido
	$('#score').html($('#elapsed-time').html());


	/******************* START: Agregado en el lab4-7 ***************/

	// cargar la ultima información almacenada en local storage con el valor identificador 'last-elapsed-time'
	// var last_elapsed_time = localStorage.getItem('last-elapsed-time');

	/******************* START: Agregado en el lab4-8 ***************/
	// Cargamos el valor del ultimo puntaje
	var last_score = localStorage.getItem('last-score');

	// Comprobar si no hay ningún registro almacenado
	last_score_object = JSON.parse(last_score);

	if(last_score === null){
		// Creando un registro vacio en caso de que no encuentre nada
		last_score_object = {"savedTime": "No record", "score" : 0};
	}

	var last_elapsed_time = last_score_object.score;

	/******************* START: Agregado en el lab4-9 ***************/
	
	// Determinar si el puntaje es mayor para el nuevo valor con respecto al anterior
	if(last_elapsed_time === 0 || game.elapsed_time < last_elapsed_time){
		$('.ribbon').removeClass('hide');
	}
	
	/******************* END: Agregado en el lab4-8 ***************/

	// Convertimos el tiempo transcurrido en minutos:segundos
	// Calculamos los minutos y segundos de tiempo transcurrido
	var minute = Math.floor(last_elapsed_time / 60);
	var second = last_elapsed_time % 60;


	// Mostrando la información construida con las variables `minute` y `second`
	$('.last-score').html(minute+":"+second);

	/******************* START: Agregado en el lab4-8 ***************/

	// Mostrar en el modal el tiempo transcurrido en el ultimo juego
	var saved_time = last_score_object.savedTime;
	$('.saved-time').html(saved_time);

	// Traer el dato real de la fecha y la hora del juego que acabo de terminar
	var current_time = new Date();
	var month = current_time.getMonth() + 1;
	var day = current_time.getDate();
	var year = current_time.getFullYear();
	var hours = current_time.getHours();
	var minutes = current_time.getMinutes();

	// volvemos agregar los ceros en caso de que este entre 0 y 9
	if(minute < 10) minute = "0" + minute;

	var seconds = current_time.getSeconds();
	if(second < 10) second = "0" + second;

	var now = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + seconds;

	// construimos el objeto del juego con la fecha y el puntaje
	var obj = {"savedTime" : now, "score": game.elapsed_time};

	// Salvando el nuevo puntaje y la fecha generada
	localStorage.setItem('last-score', JSON.stringify(obj));

	/******************* END: Agregado en el lab4-8 ***************/

	/******************* END: Agregado en el lab4-7 *****************/
	// show popup

	$('#popup').removeClass('hide');
}
/******************* END: Agregado en el lab4-6 *****************/







