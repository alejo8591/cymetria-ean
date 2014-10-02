$(function(){
	$('#cards').children().each(function(){
		$(this).click(function(){
			$(this).toggleClass('card-flipped');
		});
	});
});