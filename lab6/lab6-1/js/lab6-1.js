$(document).ready(function(){
	$('#my-form').bind('submit', function(event){
		$('[type=text], textarea').each(function(){
			if(!$(this).val().length){
				event.preventDefault();
				$(this).css({
					'border' : '2px solid red',
					'background' : 'rgba(255, 0, 0, 0.2)'
				});
			}
		});
	});
});