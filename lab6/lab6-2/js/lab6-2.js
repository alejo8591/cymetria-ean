$(document).ready(function(){
	$('.max-length')
		.after('<span></span>')
		.next()
		.hide()
		.end()
		.keypress(function(event){
			var current = $(this).val().length;

			if(current >= 140){
				if(event.which != 0 && event.which !=8){
					event.preventDefault();
				}
			}

			$(this).next().show().text(140 - current);
		});
});