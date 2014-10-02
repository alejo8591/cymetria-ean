$(function(){
	$('#cards').children().each(function(e){
		// a la escucha de eventos del tipo click sobre los DIV de las cartas
		$(this).click(function(){
			// adicionar la clase "card-flipped"
			// El browser debe animar los estilos entre el estado actual y el estado con la tarjeta volteada
			$(this).toggleClass('card-flipped');
		});
	});
});