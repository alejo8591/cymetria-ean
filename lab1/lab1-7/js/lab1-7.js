$(document).ready(function(){
	$('#hideButton').click(function(){
		$('p').animate({
			padding : '30px',
			fontSize : '40px'
		}, 2000);
	});
});