$(document).ready(function(){
	// Creando un Objeto en javaScript
	function Validate(){}

	Validate.prototype = {
		email: function(email){
			// Evaluando una expresión regular para el correo
			var pattern = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
			// Returnamos Falso o Verdadero
			return pattern.test(email);
		},
		userid: function(uid){
			// Evaluando una expresión regular para que el campo sea numerico
			var pattern = new RegExp(/^[0-9]+/);
			return pattern.test(uid);
		}
	};

	$('#nid').focus(function(){
		$(this).addClass('inputs');
	});

	$('#username').focus(function(){
		$(this).addClass('inputs');
	});
	$('.password').focus(function(){
		$(this).addClass('inputs');
	});

	$('.conf-password').focus(function(){
		$(this).addClass('inputs');
	});

	$('.email-add').focus(function(){
		$(this).addClass('inputs');
	});

	// Quitando los nodos que tienen el span con clase `error` para que no sean visibles
	// Asignación multiple de selectores con jQuery
	$('.nid-error, .user-error, .password-error, .conf-password-error, .email-error, .food-error').addClass('error');
	$('.nid-error, .user-error, .password-error, .conf-password-error, .email-error, .food-error').hide();

	// Removiendo el elemento con id `info` aplicada al Modal
	$('#info').remove();

	// Evento principal para cuando presionan el boton enviar
	$('.button').bind('click',function(event){
		// Verificando de nuevo que no exista el nodo con id `info` sino hasta que se indique

		$('#info').remove();

		// Limpiando la información que se encuentra en el Modal
		$('#open-modal > div').empty();

		// Creando la variable para validar los datos necesarios
		var validate = new Validate();

		// validando el documento del usuario
		var data = $('#nid').val();

		if(validate.userid(data)){
			// Cuando el documento del usuario cumple con la regla de que sean numeros y no letras u otro caracter, retira la clase `error` y agrega `success`
			$('#nid').removeClass('error').addClass('success');
			$('.nid-error').hide();
			// almacenando la información de manera local con localStorage
			localStorage.setItem('nid', data);
		
		} else {
			$('#nid').next().show();
			$('input#nid').removeClass('success').addClass('error');
			$('.nid-error').next().show();
			$('.nid-error').text('Indique su documento de identidad');
			event.preventDefault();
		}

		// verificando el nombre de usuario

		var data = $('#username').val();

		var len = data.length;

		if(len < 1 && data === ""){
			$('#username').next().show();
			$('#username').addClass('error');
			$('.user-error').next().show();
			$('.user-error').text('Por favor indique su(s) Nombre(s) y Apellido(s)');
			event.preventDefault();
		
		} else {
			$('#username').next().hide();
			$('.user-error').next().hide();
			localStorage.setItem('username', data);
		}

		// validando la contraseña
		var data = $('.password').val();

		var len = data.length;

		if(len < 1 && len !== ""){
			$('.password').next().show();
			$('.password').addClass('error');
			$('.password-error').next().show();
			$('.password-error').text('Indique una contraseña');
			event.preventDefault();
		} else {
			$('.password').next().show();
			$('.password-error').next().hide();
		}

		var conf_data = $('.conf-password').val();

		var len = conf_data.length;

		if(len < 1){
			$('.conf-password').next().show();
			$('.conf-password-error').next().show();
			$('.conf-password').removeClass('success').addClass('error');
			$('.conf-password-error').text('Confirme la contraseña o ingrese datos');
			event.preventDefault();
		
		} else{
			$('.conf-password').next().show();
			$('.conf-password-error').next().hide();
		}

		// comprobando que las contraseñas sean correctas
		if($('.password').val() !== $('.conf-password').val()){
			$('.conf-password').next().show();
			$('.conf-password-error').next().show();
			$('.conf-password').removeClass('success').addClass('error');
			$('.conf-password-error').text('¡Las contraseñas no coinciden!');
		} else {
			$('.conf-password').next().show();
			$('.conf-password-error').hide();
			localStorage.setItem('password', data);
		}

		// Validando el email
		var data = $('.email-add').val();

		if(validate.email(data)){
			$('.email-error').hide();
			$('.email-add').addClass('success');
			localStorage.setItem('email', data);

			$('#buttons').append('<a id="info" href="#open-modal">Ver pedido</a>');
		} else {
			$('.email-add').next().show();
			$('.email-error').show();
			$('.email-add').removeClass('success').addClass('error');
			$('.email-error').text('¡El email es incorrecto!');
			event.preventDefault();
		}
	});
});

