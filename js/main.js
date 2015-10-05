
mastermind = {};

mastermind.PlayMGame = function(){

	"use strict";
	
	var settings = {

		pegColours: ["black","blue","yellow","green","red","orange"],
		attempsNumber: 10,
		activeColor: "black",
		countR:1,
        add: function(){
			this.countR ++;
        }
		
	};


	var init = function() {
		printActiveColor();
		printCololors();
		printBoard();
		bindFunctions();
	};

	//Upload colors
	var printCololors = function(){
		var mastermindColorsBox = $("#mastermind-colorsBox"),
			html = "",
			pegColours = settings.pegColours;

		for (var i = 0; i < pegColours.length; i++)
		{
			html += '<div class="circle '+ pegColours[i] +'" id="color-'+ pegColours[i] +'"></div>';
		}
		mastermindColorsBox.html(html);
	};

	//bind functions
	var bindFunctions = function() {
		$( "div[id|='color']" ).on("click", function(){
			var color = $(this).attr("id").split("-")[1];

			//Change property
			settings.activeColor = color;
			printActiveColor();
			
		});

		$( "div[class='empty-circle']" ).on("click", function(){
			addColor($(this));
		});
	};

	//activeColor
	var printActiveColor = function() {
		var mastermindColorsBox = $("#mastermind-activeColor");
		mastermindColorsBox.html(settings.activeColor);
		
	};

	//activeColor
	var printBoard = function() {
		var tableBoard = $("#mastermind-tableBoard"),
			html = "",
			attempsNumber = settings.attempsNumber;

		for (var i = 0; i < attempsNumber; i++)
		{
		
			html += '<tr id="row-' + (i+1) + '">';
				html += '<td><b>' + (i+1) + '</b></td>';
                html += '<td align="center"><div class="empty-circle"></div></td>';
                html += '<td align="center"><div class="empty-circle"></div></td>';
                html += '<td align="center"><div class="empty-circle"></div></td>';
                html += '<td align="center"><div class="empty-circle"></div></td>';
                html += '<td align="center"><!-- --></td>';
                html += '<td align="center">Check</td>';
            html += '</tr>';
		}


		tableBoard.html(html);
		
	};

	//addColor
	var addColor = function(subj) {

		var row = subj.parent().parent(),
		rowNumber = $(row).attr("id").split("-")[1];

		if(rowNumber == settings.countR){
			subj.css("background-color",settings.activeColor);
		}else{
			alert("one row at the time!");
		}
		
	};

	//checkRow
	var checkRow = function(subj) {
		
		//4 color
		//
		
	};

	init.call(this);
};

new mastermind.PlayMGame();

