$(document).ready(function(){
	$('#info > div').hide();

	$('#info h3').click(function(){
		$(this).next().animate({
			'height' : 'toggle'
		}, 'slow', 'easeInOutElastic');
	});
});