
mastermind = {};

mastermind.PlayMGame = function(){

	"use strict";
	
	var settings = {

		pegColours: ["black","blue","yellow","green","red","orange"],
		attempsNumber: 10,
		activeColor: "black",
		numberOfColorToGuess:4,
		countR:1,
		randomPegsArray: [],
        add: function(){
			this.countR ++;
        }
		
	};


	var init = function() {
		randomColors();
		printActiveColor();
		printCololors();
		printBoard();
		bindFunctions();
	};

	var randomColors = function () {

		var guessColorsArray = [],
			pegColours = settings.pegColours;

		for (var i = 0; i < settings.numberOfColorToGuess; i++)
		{
			guessColorsArray.push(pegColours[Math.floor(Math.random() * pegColours.length)]);
		}

		settings.randomPegsArray = guessColorsArray;
	}

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
		
		//Pick up color when someone clicks on it
		$( "div[id|='color']" ).on("click", function(){
			var color = $(this).attr("id").split("-")[1];

			//Change property
			settings.activeColor = color;
			printActiveColor();
			
		});

		// Add color to the board empty circle when someone clicks on it
		$( "div[class='empty-circle']" ).on("click", function(){
			addColor($(this));
		});

		// Check button listener
		$( "#mastermind-checkButton" ).on("click", function(){
			evaluateSolution();
		});

		// Give up button listener
		$( "#mastermind-giveupButton" ).on("click", function(){
			giveup();
		});
	};

	//giveup
	var giveup = function() {
		alert(settings.randomPegsArray);	
	};

	//giveup
	var newgame = function() {
		init.call(this);	
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
				html += '<td align="left" valign="center"><b>' + (i+1) + '</b></td>';
                html += '<td align="center" valign="middle"><div class="empty-circle" id="row-' + (i+1) + '-1"></div></td>';
                html += '<td align="center" valign="middle"><div class="empty-circle" id="row-' + (i+1) + '-2"></div></td>';
                html += '<td align="center" valign="middle"><div class="empty-circle" id="row-' + (i+1) + '-3"></div></td>';
                html += '<td align="center" valign="middle"><div class="empty-circle" id="row-' + (i+1) + '-4"></div></td>';
                html += '<td align="center" valign="middle" id="row-' + (i+1) + '-exactMatches"></td>';
                html += '<td align="center" valign="middle" id="row-' + (i+1) + '-colorMatches"></td>';
            html += '</tr>';
		}


		tableBoard.append(html);
		
	};


	//addColor to the board circle
	var addColor = function(subj) {

		var row = subj.parent().parent(),
		rowNumber = $(row).attr("id").split("-")[1];

		if(rowNumber == settings.countR){

			var extraClass = subj.attr("class").split(' ')[1];

			if(extraClass){
				subj.removeClass(extraClass);
			}
			subj.addClass(settings.activeColor);

		}else{
			alert("One row at the time! Finish to compile row number "+settings.countR);
		}		
	};

	var giveGuess = function () {
		
		var userCombinationArray = [];

		for (var i = 1; i < settings.numberOfColorToGuess+1; i++)
		{			
			var userColor = $("#row-"+settings.countR+"-"+i).attr("class").split(' ')[1]; 

			if(userColor){
				userCombinationArray.push(userColor);
			}
			else{
				break;
			}			
		}

		if (userCombinationArray.length < settings.numberOfColorToGuess){
			alert("Pick a color from Pick a color panel and then click the empty circle you want to color.");
			return;
				
		}
		else{
			return userCombinationArray;				
		}		
	}

	//checkRow
	var checkPegs = function(subj) {

		//User attemps array
		var userPegs = giveGuess();

		if(!userPegs){return};
		
		//Computer array
		var computerPegs = settings.randomPegsArray;

		var i, l,
		foundIndex,
		exactMatches = 0,
		colorMatches = 0;

		// copy the arrays, so we don't ruin the orignals
		var code = computerPegs.slice(0);
		var pegs = userPegs.slice(0);

		// First: Look for color & position matches
		  
		for( i = pegs.length - 1 ; i >= 0 ; i-- ) {
		    
		    if(pegs[i] === code[i]) {
		      exactMatches++;
		      pegs.splice(i, 1);
		      code.splice(i, 1);
		    }
		}		  

		// Second : Look for color matches anywhere in the code
		for( i = 0 , l = pegs.length ; i < l ; i++ ) {
		    
		    foundIndex = code.indexOf(pegs[i]);
		    if( foundIndex !== -1 ) {
		      colorMatches++;
		      code.splice(foundIndex, 1);
		    }
		}
		
		return {
		    exactMatches: exactMatches,
		    colorMatches: colorMatches
		};		  
		
	};

	var evaluateSolution = function () {
		var results = checkPegs ();

		console.log(settings.randomPegsArray);
		
		if(results.exactMatches === 4){
			alert("you won!!");
		}else{
			$("#row-"+settings.countR+"-exactMatches").html(results.exactMatches);
			$("#row-"+settings.countR+"-colorMatches").html(results.colorMatches);
		}

		settings.add();
	}

	init.call(this);
};

new mastermind.PlayMGame();

