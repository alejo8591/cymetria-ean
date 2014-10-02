/*
* Variable es un objeto la cual nos va servir como definición de los controles
* para mover las raquetas:
* Raqueta izquierda: con W (arriba) y S (abajo) 
* Raqueta derecha: con tecla flecha arriba ("arriba") y flecha abajo ("abajo")
*/
var KEY = {
	UP : 38,
	DOWN : 40,
	W: 87,
	S: 83
};

$(function(){
	// jQuery a la escucha del evento presionar boton
	$(document).keydown(function(e){
		switch(e.which){
			case KEY.UP:
				// Obtener el valor superior para la flecha que indica hacia arriba
				var top = parseInt($('#racketB').css('top'));
				$('#racketB').css('top', top-5);
				break;
			case KEY.DOWN:
				var top = parseInt($('#racketB').css('top'));
				// Mover la raqueta B 5 pixeles abajo
				$('#racketB').css('top', top+5);
				break;
			case KEY.W:
				var top = parseInt($('#racketA').css('top'));
				// Mover la raqueta 5 pixeles arriba
				$('#racketA').css('top', top-5);
				break;
			case KEY.S:
				var top = parseInt($('#racketA').css('top'));
				// Mover la raqueta 5 pixeles abajo
				$('#racketA').css('top', top+5);
				break;
		}
	});
});

