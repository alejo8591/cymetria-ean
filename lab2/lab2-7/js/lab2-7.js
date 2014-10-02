var KEY = {
	UP: 38,
	DOWN: 40,
	W: 87,
	S: 83
};

// Declaramos un objeto global donde almacenamos toda variable del juego
var pingpong = {
	scoreA : 0, // puntaje para jugador A
	scoreB : 0  // puntaje para jugador B
};

// una matriz para recordar qué tecla se presiona
pingpong.pressedKeys = [];

// Caracteristicas del pingpong
pingpong.ball = {
	speed : 5,
	directionX : 1,
	directionY : 1
};

$(function(){
	// Establecemos un intervalo de tiempo de 30 milisengundos para llamar la funcion "callback"
	// llamando gameloop
	$('#gamePlay').on("click", function(){
		pingpong.timer = setInterval(gameloop, 30);
	});
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
	moveBall();
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

function moveBall(){
	// El pinpong se mueve cada 30 milisegundos
	var ballTop = parseInt($('#ball').css('top'));
	var	ballLeft = parseInt($('#ball').css('left'));
	var playHeight = parseInt($('#play').height() - 20);
	var playWidth = parseInt($('#play').width() -20);
	var ball = pingpong.ball;

	// Comprobar los limites
	// Verificar el borde inferior
	if(ballTop + ball.speed * ball.directionY > playHeight){
		ball.directionY = -1;
	}

	// Verificar el borde superior
	if(ballTop + ball.speed * ball.directionY < 0){
		ball.directionY = 1;
	}

	// Verificar el borde derecho de la raqueta izquierda
	if(ballLeft + ball.speed * ball.directionX > playWidth){

		// Aumentando el puntaje del jugador A
		pingpong.scoreA++;
		// pingpong.scoreA = pingpong.scoreA + 1;

		$('#scoreA').html(pingpong.scoreA);

		// Reiniciando los valores del jugador B

		$('#ball').css({
			'left' : "150px",
			'top' : "100px"
		});

		// Actualizar los valores de movimiento del pingpong
		ballTop = parseInt($('#ball').css('top'));
		ballLeft = parseInt($('#ball').css('left'));
		ball.directionX = -1;
	}

	// Verificar el borde izquierdo
	if(ballLeft + ball.speed * ball.directionX < 0){

		// Aumentando el puntaje del jugador B
		pingpong.scoreB++;
		// pingpong.scoreB = pingpong.scoreB + 1; 

		$('#scoreB').html(pingpong.scoreB);

		// Reiniciando los valores del jugador A

		$('#ball').css({
			'left' : "150px",
			'top' : "100px"
		});

		// Actualizar los valores de movimiento del pingpong
		ballTop = parseInt($('#ball').css('top'));
		ballLeft = parseInt($('#ball').css('left'));
		ball.directionX = 1;
	}

	// Verificando movimiento para la raqueta izquierda en este caso racketA
	var paddleAX = parseInt($('#racketA').css('left')) + parseInt($('#racketA').css('width'));
	var paddleAYBottom = parseInt($('#racketA').css('top')) + parseInt($('#racketA').css('height'));
	var paddleAYTop = parseInt($('#racketA').css('top'));

	if(ballLeft + ball.speed * ball.directionX < paddleAX){

		if(ballTop + ball.speed * ball.directionY <= paddleAYBottom && 
			ballTop + ball.speed * ball.directionY >= paddleAYTop){
			
			ball.directionX = 1;
		}
	}

	// Verificando movimiento para la raqueta derecha en este caso racketB
	var paddleBX = parseInt($('#racketB').css('left')) - 20;
	var paddleBYBottom = parseInt($('#racketB').css('top')) + parseInt($('#racketB').css('height'));
	var paddleBYTop = parseInt($('#racketB').css('top'));

	if(ballLeft + ball.speed * ball.directionX > paddleBX){
		
		if(ballTop + ball.speed * ball.directionY <= paddleBYBottom &&
			ballTop + ball.speed * ball.directionY >= paddleBYTop){
			ball.directionX = -1;
		}
	}

	// Movimiento del pinpong
	$('#ball').css({
		'left' : ballLeft + ball.speed * ball.directionX,
		'top' : ballTop + ball.speed * ball.directionY
	});

}