$(document).ready(function(){
	$('#toggleButton').click(function(){
		$('#disclaimer').slideToggle('slow', function(){
			alert("El evento slide termino de ejecutarse");
		});
	});
});