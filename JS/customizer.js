var count = 0;
var details;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));

  details = $("#item1 p").val();
  console.log(details);
  count = count + 1;
  if (count % 2 != 0){
	  $('#nopieces').val('');
	  $('#modalNoPieces').show();
  }
}

var productQty;
const prices = {
    solarpanel: 200,
	solartank: 700
};
var totalCost = 0;

$(document).ready(function (){

    $('#modalNoPieces').hide();

    $('#continue').on('click', validateQuantity);
	$('#computeCostButton').on('click', computeCost);
});

function computeCost(){
	console.log("Computing cost...");
	totalCost += productQty;
	console.log(totalCost);
	// take all the elements in the drop div
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
		$('#modalNoPieces').hide();
	}
	
	console.log(productQty);
}