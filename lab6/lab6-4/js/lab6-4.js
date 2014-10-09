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

	/* Estas clases se agregan para cuando se quiere verificar 
	 *en tiempo real lo que se escribe en el campo `text`
	*/

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
	$('.nid-error, .user-error, .password-error, .conf-password-error, .email-error, .food-error, .city-error, .pay-error').addClass('error');
	$('.nid-error, .user-error, .password-error, .conf-password-error, .email-error, .food-error, .city-error, .pay-error').hide();

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
			// Ocultando el span que nos indica el error
			$('.nid-error').hide();
			// almacenando la información de manera local con localStorage
			localStorage.setItem('nid', data);
		
		} else {
			// Verificando que el nodo siguiente pueda ser visualizado y no se oculte
			$('#nid').next().show();
			// Removiendo la clase `success` y agregando la clase `error`
			$('input#nid').removeClass('success').addClass('error');
			// Habilitando el span que contiene la clase `nid-error` para el documento de identidad
			$('.nid-error').next().show();
			// Agregando texto al span con clase `nid-error` con el mensaje personalizado y dinamico
			$('.nid-error').text('Indique su documento de identidad');
			// Deteniendo cualquier evento que pida alguna solicitud con el servidor
			event.preventDefault();
		}

		// verificando el nombre de usuario

		var data = $('#username').val();

		var len = data.length;

		if(len < 1 && data === ""){
			$('#username').next().show();
			$('#username').removeClass('success').addClass('error');
			$('.user-error').next().show();
			$('.user-error').text('Por favor indique su(s) Nombre(s) y Apellido(s)');
			event.preventDefault();
		
		} else {
			$('#username').next().hide();
			$('.user-error').next().hide();
			$('#username').removeClass('error').addClass('success');
			localStorage.setItem('username', data);
		}

		// validando la contraseña
		var data = $('.password').val();

		var len = data.length;

		if(len < 1 && len !== ""){
			$('.password').next().show();
			$('.password').removeClass('success').addClass('error');
			$('.password-error').next().show();
			$('.password-error').text('Indique una contraseña');
			event.preventDefault();
		} else {
			$('.password').next().show();
			$('.password').removeClass('error').addClass('success');
			$('.password-error').hide();
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
			$('.conf-password').show();
			$('.conf-password').removeClass('error').addClass('success');
			$('.conf-password-error').hide();
		}

		// comprobando que las contraseñas sean correctas
		if($('.password').val() !== $('.conf-password').val() || $('.password').val().length === 0 || $('.conf-password').val().length === 0 || $('.password').val() === "" || $('.conf-password').val() === ""){
			$('.conf-password').show();
			$('.conf-password-error').show();
			$('.conf-password').removeClass('success').addClass('error');
			$('.conf-password-error').text('¡Las contraseñas no coinciden!');
		} else {
			$('.conf-password').next().show();
			$('.conf-password').removeClass('error').addClass('success');
			$('.conf-password-error').hide();
			// Si las contraseñas son correctas la almacena en el localStorage
			localStorage.setItem('password', data);
		}

		// Validando el email
		var data = $('.email-add').val();
		// Enviando al objeto validate y su metodo `validate.email` para que returne un `true` o un `false`
		if(validate.email(data)){
			$('.email-error').hide();
			$('.email-add').removeClass('error').addClass('success');
			localStorage.setItem('email', data);
		} else {
			$('.email-add').next().show();
			$('.email-error').show();
			$('.email-add').removeClass('success').addClass('error');
			$('.email-error').text('¡El email es incorrecto!');
			event.preventDefault();
		}

		// Verificar los elemento seleccionados del tipo `checkbox`

		/* Variables para el valor de los alimentos seleccionados 
		y un objeto para almacenar la información de la comida */  
		var count=0, meals={};
    	
    	/* 
    	* $('#checkboxes').find(':checkbox').each -> iterando sobre los elementos 
    	* selecionados `:checkbox`
    	*/
	    $('#checkboxes').find(':checkbox').each(function(){
	    	// Si el elemneto esta seleccionado
		      if($(this).is(':checked')){
		      	// sumando los elementos con el valor indicado en `value`
		        count+=parseInt($(this).val());
		        // Adicionando el elemento seleccionado al objeto `meals`
		        meals[$(this).attr('name')] = parseInt($(this).val());
		      }
	    });
    
	    // Si no selecciona ninguno de los alimentos
	    if(count === 0){
	      $('.food-error').css({'margin':50}).show();
	      $('.food-error').text('¡Debe seleccionar un Alimento!');
	    }
	    else{
	      $('.food-error').hide();
	      $('.food-total').show();
	      $('.food-total').text('Total de la compra: $' + count + ' M/Cte');
	      /* Si la información es correcta la guardamos en localStorage 
	       * `total` suma de los valores de cada producto seleccionado
	       * `meals` un objeto parseado de JSON a una cadena de caracteres
	       * para poder almacenar en el localStorage
	      */
	      localStorage.setItem('total', count);
	      localStorage.setItem('meals', JSON.stringify(meals));
	    }
 

	    // Verificar los elemento seleccionados del tipo `radio`

	    count = 0;

	    $('#radios').find(':radio').each(function(){
	      if($(this).is(':checked')){
	        count++;
	        localStorage.setItem('paymode', $(this).val());
	      }
	    });

	    if(count === 0){
	      $('.pay-error').css({'margin-left':50}).show();
	      $('.pay-error').text('Debe seleccionar un modo de Pago');
	    }
	    else{
	      $('.pay-error').hide();
	    }
 
	    count = $('select option:selected').val();
	    if(count === "0"){
	      $('.city-error').show();
	      $('.city-error').text('¡Debe seleccionar una Ciudad!');
	    }
	    else{
	      $('.city-error').hide();
	      localStorage.setItem('city', count);
	      $('#buttons').append(
	        '<a id="info" href="#open-modal" class="button">Ver Pedido</a>'
	      );
	      $('.inputs').removeClass('error').addClass('success');
	    }
	    event.preventDefault();
	});

  // Delegando un evento a través del `click` para el nodo con id `info`
  $(document).on('click', '#info', function(){

  	/* Agregando información al modal desde localStorage
	 * teniendo en cuenta que estos valores son validados
	 * con el evento `bind` con la libreria jQuery 
  	 */
    $('#open-modal > div').append(
      '<a href="#close" title="Close" class="close">X</a>'+
      '<h2>Este es tu pedido</h2>' +
      '<ul>' +
      '<li>Su nombre es: ' + localStorage.getItem('username') + '</li>' +
      '<li>Su documento es: ' + localStorage.getItem('nid') + '</li>' +
      '<li>Su email es: ' + localStorage.getItem('email') + '</li>' +     
      '<li id="list-meals">Los alimentos que Solicita son: <ul></ul></li>' + 
      '<li>El modo de pago es: ' + localStorage.getItem('paymode') + '</li>' +  
      '<li>La ciudad donde habita es: ' + localStorage.getItem('city') + '</li></ul>'  
    );

    /* Cargando la información de los alimentos 
    * almacenada en el localStorage como un objeto
    * parseado en JSON
    */
    var meals =  JSON.parse(localStorage.getItem('meals'));

    // Iterando sobre el objeto que contiene los alimentos
    $.each(meals, function(key, value){
          $('#list-meals > ul').append('<li>El producto ' + key + ' cuesta $' + value + ' M/Cte</li>');
    });
  });
});
