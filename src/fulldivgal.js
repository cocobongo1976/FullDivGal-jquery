/**
 * jQuery.FullDivGal
 * Version 0.2.1
 * Copyright (c) 2012 Jacobo Tabernero - http://xarope.eu
 * MIT license - See LICENSE for more information.
**/
(function($) {
	$.fn.fullDivGal = function(){
		// RECOGE DATOS Y CREA LAS CAPAS NECESARIAS
		var divGal = $(this),
			listas = divGal.find('li'),  // recoge los li
			imgs = listas.find('img'),  // recoge las imagenes
			nimgs = listas.length,  //numero de imagenes
			posicion = 0,
			slides = divGal.find('ul'),
			fdgThumbs = $('<ul id="fdgThumbs"></ul>'),
			divThumbs = $('<div id="divThumbs"></div>'),
			fdgNav = $('<div id="fdgNav"></div>'),
			fdgPrev = $('<span id="fdgPrev">Prev</span>'),
			fdgNext = $('<span id="fdgNext">Next</span>');
		
		// CREA ELEMENTOS SLIDE Y THUMBS
		function creaLista(valor){
			var lThumb = $('<li id="fdgt'+ valor +'"><img src="'+ imgs.eq(valor).attr('src')+'" /></li>');
			lThumb.click(function(){
				posicion = valor;
				coloca();
			});
			fdgThumbs.append(lThumb);
		}
		for ( i=0; i < nimgs; i++){
			creaLista(i);
		}
		// PRECARGA Y CARGA DE IMAGENES
		for ( i = 0 ; i < nimgs ; i++ ){
			imgs.eq(i).load(function(){
				escala($(this));
			});
		}
		
		// ASIGNA FUNCIONES
		fdgPrev.click(function(){
			if (posicion !== 0){
				posicion--;
				coloca();
			}
		});
		fdgNext.click(function(){
			if (posicion < (nimgs - 1) ){
				posicion++;
				coloca();
			}
		});
		
		// SLIDE - Coloca el ul#slide horizontalmente
		function coloca(){
			slides.stop();
			slides.animate({ left : '-'+divGal.width() * posicion }, 500);
			if ( posicion === 0 ) {
				fdgPrev.addClass('hide');
			} else {
				fdgPrev.removeClass('hide');
			}
			if ( posicion === ( nimgs - 1) ){
				fdgNext.addClass('hide');
			} else {
				fdgNext.removeClass('hide');
			}
		}
		
		// CENTRA LAS CAPAS
		function fdgCenter(){
			var slidesLi = slides.find('li');
			var ratGal =  divGal.width() / divGal.height();
			// fix width ul#slide
			slides.width( divGal.width() * nimgs );
			slides.height( divGal.height());
			// fix width ul#slide li
			slidesLi.width( divGal.width());
			slides.css( 'left', '-' + divGal.width() * posicion +'px' );
		}
		$(window).resize(function(){
			fdgCenter();
			escala();
		});
	
		// ESCALA IMAGENES
		function escala(e){
			var adios =  slides.find('li');
			var imagenes = adios.find('img');
			var ratGal = divGal.width() / divGal.height();
			var cual;
			function escalada(x){
				var ratCual = x.width() / x.height();
				if ( ratCual > ratGal){
					x.width('100%');
					x.height('auto');
				} else{
					x.width('auto');
					x.height('100%');
				}
				x.css('margin-top', '-' + ( cual.height() / 2 ) + 'px');
			}
			if (e){
				cual = imagenes.eq(e);
				escalada(cual);
			}else{
				for (i= 0; i < nimgs ; i++){
					cual = imagenes.eq(i);
					escalada(cual);
				};
			};
		};
		
		// :hover LINK IMAGES
		function hoverimg(){ // <-- FIX THIS
			$('ul#fdgSlides li a img').mouseenter(function(){
				$(this).stop().animate({
					'opacity': 0.4
				}, 700);
			});
			$('ul#fdgSlides li a img').mouseleave(function(){
				$(this).stop().animate({
					'opacity': 1
				}, 700);
			});
		}
		
		// SUBE Y BAJA LOS THUMBS
		divThumbs.mouseenter(function(){
			$(this).stop();
			$(this).animate({
				marginTop: '-75px'
			}, 500);
		});
		divThumbs.mouseleave(function(e){
			$(this).stop();
			$(this).animate({
				marginTop: 0
			}, 1000 );
		});
		divThumbs.mouseleave();
		
		// AGREGA LOS ELEMENTOS CREADOS Y CENTRA Y ESCALA LAS CAPAS
		fdgNav.append(fdgPrev);
		fdgNav.append(fdgNext);
		divGal.append(fdgNav);
		divThumbs.append(fdgThumbs);
		divThumbs.append($('<span id="up">&uarr;</span>'));
		divGal.append(divThumbs);
		hoverimg();
		
		fdgCenter();
		escala();
		coloca();
		$(window).resize();
	};
})(jQuery);