var details;
var totalCost = 0;
var myMap = new Map(); 
myMap.set('solar panel', 300);
myMap.set('solar tank', 700);
myMap.set('battery', 100);
myMap.set('charge controller', 1000);
myMap.set('power inverter', 200);
myMap.set('generator', 400);

$(document).ready(function (){

    $('#modalNoPieces').hide();
    $('#continue').on('click', validateQuantity);
	$('#showMore').on('click', showMoreAboutComponents);
	$('#computeCostButton').on('click', computeCost);
	
	$('#closeInfo').on('click', function() {
		$(this).parent().hide();
	});
	
	viewSelectionsPanel();

});

function showMoreAboutComponents(){
	$('#componentsInfo').show();
}

var item, optionsPanelItem;

function viewSelectionsPanel() {
	$( "#sort1, #sort2" ).sortable({
      helper:"clone", 
      opacity:0.5,
      cursor:"crosshair",
      connectWith: ".list",
      receive: function( event, ui ){ 
	  
	    // if the sender is list sort1 then open modal
		if($(ui.sender).attr('id') ==='sort1'){
			$('#nopieces').val('');
			$('#modalNoPieces').show();
		}
		else {
			// restore price field to empty
			$('#price').val('');
			
			// if the sender is list 2, keep only the items name
			var itemsList = $("#sort1").children().children('p');
			console.log(itemsList);

			var i;
			for(i = 0; i < itemsList.length; i++){
				console.log(itemsList[i].innerHTML);
				if (arr.includes(itemsList[i].innerHTML)){
					itemsList[i].innerHTML = arr[arr.indexOf(itemsList[i].innerHTML)].replace(/\x.*/,'');
				}
			}
		}
		
		// no more than 8 at once in the selections panel
         if($(ui.sender).attr('id')==='sort1' && $('#sort2').children('li').length> 8){
           $(ui.sender).sortable('cancel');
         }
      }	
	});
	
	$( "#sort1,#sort2" ).disableSelection();
}
 
function computeCost(){
	// always when computing intialize with 0
	totalCost = 0;
	console.log("Computing cost...");
	
	var itemsList = $("#sort2").children().children('p');
	console.log(itemsList);

	var i;
	for(i = 0; i < itemsList.length; i++){
		console.log(itemsList[i].innerHTML);
		var it = itemsList[i].innerHTML;
		var key = it.substring(0, it.indexOf('x') + 'x'.length - 2);
		console.log(key);
		console.log(myMap.get(key));
		
		// get qty by getting the number after x
		var qty = it.match(/\d/g);
		qty = qty.join("");
		console.log(qty);
		totalCost += parseInt(qty) * myMap.get(key) ;
	}
	
	console.log("TotalCost: ", totalCost);
	$('#price').val(totalCost + " RON");
}

var arr = [];

function validateQuantity(){
    var qty = document.getElementById("nopieces");
    if (qty.value < 0 || qty.value.match(/^[A-Za-z]+$/) || qty.value == '')
    {
		$('#nopieces').css("border-color" , "red");
    }
	else {
		$('#nopieces').css("border-color" , "black");
		productQty = $('#nopieces').val();
		
		var itemsList = $("#sort2").children().children('p');
		console.log(itemsList);

		var i;
		for(i = 0; i < itemsList.length; i++){
			console.log(i + itemsList[i].innerHTML);
			optionsPanelItem = itemsList[i].innerHTML;
			if (!arr.includes(itemsList[i].innerHTML)){
				itemsList[i].innerHTML = itemsList[i].innerHTML + " x" + productQty;
				arr.push(itemsList[i].innerHTML);
			}
		}
	
		$('#modalNoPieces').hide();
	}
	
	console.log(productQty);
}