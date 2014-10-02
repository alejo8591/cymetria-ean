$(document).ready(function(){
	// Comentario de una linea
	/*
	Comentario
	multi
	linea
	*/
	$('#photo_inner').toggle(function(){
		console.log("primer evento del toggle");
		var scrollAmount = $(this).width() - $(this).parent().width();
		$(this).animate({'left' : '-=' + scrollAmount}, 'slow');
	}, function(){
		console.log("segundo evento del toggle");
		$(this).animate({'left' : '0'}, 'slow');
	});
});