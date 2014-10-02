$(document).ready(function(){
	$('#celebs tbody tr:even').addClass('lines');

	$('#celebs tbody tr').mouseover(function(){
		$(this).addClass('linesHover');
	});
	$('#celebs tbody tr').mouseout(function(){
		$(this).removeClass('linesHover');
	});
});