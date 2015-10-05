
mastermind = {};

mastermind.PlayMGame = function(){

	"use strict";
	
	var settings = {

		pegColours: ["black","blue","yellow","green","red","orange"],
		attempsNumber: 10
		
	};

	var init = function() {
		printCololors();
	};

	//Upload colors
	var printCololors = function(){
		var mastermindColorsBox = $("#mastermind-colorsBox"),
			html = "",
			pegColours = settings.pegColours;

		for (var i = 0; i < pegColours.length; i++)
		{
			console.log(i);
			html += '<div class="circle '+ pegColours[i] +'" id="color-'+ pegColours[i] +'"></div>';
		}
		mastermindColorsBox.html(html);
	};

	init.call(this);
};

new mastermind.PlayMGame();

