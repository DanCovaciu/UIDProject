var count = 0;
var details;
var productQty;
const prices = {
    solarPanel: 300,
	solarTank: 700,
	chargeController: 1000,
	battery: 100,
	powerInverter: 200,
	generator: 400
};
var totalCost = 0;

$(document).ready(function (){

    $('#modalNoPieces').hide();

    $('#continue').on('click', validateQuantity);
	$('#computeCostButton').on('click', computeCost);
	
	checkSelectionsPanel();

});

var currentItem;

function checkSelectionsPanel() {
	
	$( "#sort1, #sort2" ).sortable({
      helper:"clone", 
      opacity:0.5,
      cursor:"crosshair",
      connectWith: ".list",
      receive: function( event, ui ){ 
	  
		$('#nopieces').val('');
		$('#modalNoPieces').show();
		
		//todo
		//when qty is entered, attach it to <p> that contains the item name
		
		// no more than 10 at once
         if($(ui.sender).attr('id')==='sort1' && $('#sort2').children('li').length> 10){
           $(ui.sender).sortable('cancel');
         }
      }	
	});
	
	$( "#sort1,#sort2" ).disableSelection();
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
		
  currentItem = data;
  details = $("#" + data + " p").text();
  
  console.log(details);
  count = count + 1;
  
  if (count % 2 != 0){
	  $('#nopieces').val('');
	  $('#modalNoPieces').show();
  }
}

function computeCost(){
	console.log("Computing cost...");
	totalCost += parseInt(productQty);
	console.log(totalCost);
	
	var array = $('#sort2').get();
	console.log(array);
	
	//todo
	// take all the elements in the selections list
	// take the <p> content from each one
	// add the prices to totalCost depending on the item name taken from <p> tag
	$('#price').val(totalCost);
}

function validateQuantity(){
    var qty = document.getElementById("nopieces");
    if (qty.value < 0 || qty.value.match(/^[A-Za-z]+$/) || qty.value == '')
    {
		$('#nopieces').css("border-color" , "red");
    }
	else {
		$('#nopieces').css("border-color" , "black");
		productQty = $('#nopieces').val();
		$("#" + currentItem + " p").text(details + " x" + productQty);
		$('#modalNoPieces').hide();
	}
	
	console.log(productQty);
}