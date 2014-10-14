/* Juego ahorcado en Javascript y HTML5 */

// función principal para el juego
function Hangman(element){

	// Inicializando la variable global
	this.element = '#' + $(element).attr('id');

	// reiniciamos el juego en general
	this.reset();
}

// Heredando todas las caracteristicas de la función principal
Hangman.prototype.reset = function(){

	// elementos para reiniciar el juego
	$(this.element + ' .h').fadeOut();
	this.STOPPED = false;
	this.MISTAKES = 0;
	this.GUESSES = [];
	this.CLUE = '';
	var that = this;

	// Array con las palabras que posiblemente puede usar el juego
	var things = [
					{
						'w': 'ean',
					 	'clue' : 'emprendimiento'
					},

					{
						'w' : 'universidad',
						'clue' : 'Educación Superior'
					},

					{
						'w' : 'colombia',
						'clue' : 'Viaja por ella'
					},

					{
						'w' : 'pais',
						'clue' : 'Comunidad social'
					},

					{
						'w' : 'bogota',
						'clue' : 'atenas'
					},

					{
						'w' : 'calle',
						'clue' : 'Vía principal'
					}
				];

	// Cargando objeto con una posición del Array que contiene un objeto con la palabra y la pista
	var obj = things[Math.floor(Math.random() * things.length)];

	// Cargando la palabra
	that.WORD = obj.w.toUpperCase();
	// Cargando la pista
	that.CLUE = obj.clue;

	// Imprimir en consola la palabra que selecciona del Array `things`
	console.log(that.WORD + ' ' + that.CLUE);

	// Agregando las lineas "_" para que el usuario llene
	$(that.element + '-word').html(that.GetGuessedfWord()).fadeIn();
	// Mostrando la pista
	$(that.element + '-clue').html(that.CLUE).fadeIn();
};

Hangman.prototype.guess = function(guess){

	// Verificando el primer caracter que el usuario ingresa
	var guess = guess.charAt(0).toUpperCase();

	if(this.STOPPED || $.inArray(guess, this.GUESSES) > - 1){
		// El juego finaliza cuando el usuario finalizo o adivino la palabra
		return;
	}

	// Adicionando element al Array `GUESSES` que contiene la información de la palabra a adivinar
	this.GUESSES.push(guess);

	$(this.element + '-word').html(this.GetGuessedfWord()).fadeIn();
	$(this.element + '-guesses').html(this.GUESSES);

	// Dibujando las partes del monachito que se ahorca
	if($.inArray(guess, this.WORD) < 0){

		this.MISTAKES++;

		// pintando el monachito
		$(this.element + '-' + this.MISTAKES).fadeIn();

		if(this.MISTAKES === 6){
			// GAME OVER y el monachito pintado totalmente
			$(this.element + '-end').html('¡PERDISTE!<br />La palabra era: ' + this.WORD).fadeIn();
			this.STOPPED = true;
			return;
		}

	} else if((this.WORD.indexOf(this.GetGuessedfWord()) != -1) ? true : false){
		// Cuando el usuario es un GANADOR y el monachito no se pinta parcial o totalmente
		$(this.element + '-end').html('¡Muy bien!<br />La palabra es: ' + this.WORD).fadeIn();
		this.STOPPED = true;
		return;
	}
};

Hangman.prototype.GetGuessedfWord = function(){
	var result = '';
	for(var i = 0; i < this.WORD.length; i++){
		/* Fraccionando la palabra en caracteres para que el usuario
		 * vea el simbolo "_" mientras lo reemplaza la palabra correcta
		*/
		result += ($.inArray(this.WORD[i], this.GUESSES) > -1) ? this.WORD[i] : '_';
	}

	return result;
};
