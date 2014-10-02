var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};

// Declaramos un objeto global donde almacenamos toda variable del juego
var pingpong = {};

// una matriz para recordar qué tecla se presiona
pingpong.pressedKeys = [];

$(function(){
	// Establecemos un intervalo de tiempo de 30 milisengundos para llamar la funcion "callback"
	// llamando gameloop
	pingpong.timer = setInterval(gameloop, 30);

	// A la escucha de un evento keydown y lo almacenamos en la matriz pressedKeys
	$(document).keydown(function(e){
		pingpong.pressedKeys[e.which] = true;
	});

	$(document).keyup(function(e){
		pingpong.pressedKeys[e.which] = false;
	});
});

// Esta es la función que llamamos cada 30 milisegundos
function gameloop(){
	movePaddless();
}

function movePaddless(){
	// Utilizar el temporizador personalizado para verificar si se oprime la tecla
	if(pingpong.pressedKeys[KEY.UP]){
		// movemos la raqueta B 5 pixeles arriba
		var top = parseInt($('#racketB').css('top'));
		$('#racketB').css('top', top-5);
	}

	if(pingpong.pressedKeys[KEY.DOWN]){
		// Movemos la raquate B 5 pixeles abajo
		var top = parseInt($('#racketB').css('top'));
		$('#racketB').css('top', top+5);
	}

	if(pingpong.pressedKeys[KEY.W]){
		// Movemos la raqueta A 5 pixeles arriba
		var top = parseInt($('#racketA').css('top'));
		$('#racketA').css('top', top-5);
	}

	if(pingpong.pressedKeys[KEY.S]){
		// Movemos la raqueta A 5 pixeles abajo
		var top = parseInt($('#racketA').css('top'));
		$('#racketA').css('top', top+5);
	}
}
