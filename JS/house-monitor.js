var oldValue = 100;

jQuery(document).ready(function () {
	// visibility of components
	$("#solarProductionMonitor").hide();
    $("#readInverter").hide();
	$("#dataFeatures").hide();
	$(".btns").show();
	
	// click actions
	$('#confirm').on('click', doOnConfirm);
	$('#cancel').on('click', doOnCancel);
	$("#readInverterButton").click(open_read_inverter_modal);
	$("#dataFeaturesButton").click(open_system_data_modal);
	$("#systemGenerationPowerButton").click(open_solar_production_monitor);
	
	$("#prevButton").on('click', view_previous_day_statistics);
	$("#nextButton").on('click', view_next_day_satistics);
	
	$('#close').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
	
	$('#closeDataFeatures').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
	
	
	// solar production monitoring
	$('#closeSolarProductionMonitor').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
	
	var energyValuesList = $('.evalue').get();
	console.log(energyValuesList);
	var a = [];
	for ( var i = 0; i < energyValuesList.length; i++ ) {
		a.push( energyValuesList[ i ].innerHTML );
	}
	
	console.log("Data");
	console.log(a);
	
	var options = {
		animationEnabled: true,
		title: {
			text: "Solar Production"
		},
		axisY: {
			title: "Energy Values in kWh",
			includeZero: false
		},
		axisX: {
			title: "Hours"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ label: "08:00", y:  parseInt(a[0].replace(' kWh','')) },	
				{ label: "12:00", y:  parseInt(a[1].replace(' kWh','')) },	
				{ label: "16:00", y:  parseInt(a[2].replace(' kWh','')) },
				{ label: "20:00", y:  parseInt(a[3].replace(' kWh','')) },
				{ label: "00:00", y:  parseInt(a[4].replace(' kWh','')) }
			]
		}]
	};
	$("#chartContainer").CanvasJSChart(options);

});

var day, date;

function open_solar_production_monitor() {
     $(".btns").hide();
	 $("#solarProductionMonitor").show();
	 date = $('#currentDate').text();
	 console.log(date);
	 day = parseInt(date.replace(/[^0-9]/g, ''));
}

function open_read_inverter_modal() {
     $(".btns").hide();
	 $("#readInverter").show();
	 $("#oldIndex").val(oldValue);
}

function open_system_data_modal() {
	$(".btns").hide();
	$("#dataFeatures").show();
}

function doOnConfirm() {
	 oldValue = $("#newIndex").val();
	 $("#readInverter").hide();
	 $(".btns").show();
	 $("#newIndex").val('');
}

function doOnCancel() {
	 $("#readInverter").hide();
	 $(".btns").show();
	 $("#newIndex").val('');
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthDurationDays = [31, 29, 31, 30, 31, 30, 31, 31, 39, 31, 30, 31];

function view_previous_day_statistics() {
	day = day - 1;
	
	var newDate;
	// check if day is 0, then first day of previous month
	if(day == '0'){
		date = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "").replace(/\s/g,'');
		
		// first month from the year
		if (months.indexOf(date) == 0){
			console.log(months);
			console.log(months.length);
			newDate = months[months.length - 1] + " 1";
			day = 1;
			
			var currentYear = parseInt($('#currentYear').text());
			$('#currentYear').text(currentYear - 1);
		}
		else {
			newDate = months[months.indexOf(date) - 1] + " 1";
			day = 1;
		}
		$('#currentDate').text(newDate);
	}
	else {
		date = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "");
		date += day;
		console.log("Previous date: " + date);
		$('#currentDate').text(date);
	}
}

function view_next_day_satistics() {
	day = day + 1;
	console.log("here day: " + day);
	
	var newDate;
	
	var currentMonthName = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "").replace(/\s/g,'');
	var monthName = months[months.indexOf(currentMonthName)];
	var monthDay = monthDurationDays[months.indexOf(currentMonthName)];
	
	// check if is January and day 31 then next month
	if(monthDay == day && monthName == currentMonthName){
		// last month from the year
		if (months.indexOf(currentMonthName) == months.length){
			newDate = months[0] + " 1";
			day = 1;
			
			var currentYear = parseInt($('#currentYear').text());
			$('#currentYear').text(currentYear + 1);
		}
		else {
			console.log("must be here");
			newDate = months[months.indexOf(currentMonthName) + 1] + " 1";
			console.log(newDate);
			day = 1;
		}
		//$('#currentDate').text(newDate);
	}
	else {
		newDate = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "");
		newDate += day;
		console.log("Next date: " + newDate);
		
	}
	$('#currentDate').text(newDate);
	rewriteData();
}

var dummyData = ["100 kWh", "20 kWh", "90 kWh", "120 kWh", "170 kWh"];

function rewriteData() {
	
	var energyValuesList = $('.evalue').get();
	
	console.log(energyValuesList);
	var a = [];
	for ( var i = 0; i < energyValuesList.length; i++ ) {
		energyValuesList[ i ].innerHTML = dummyData[ i ];
		a.push( energyValuesList[ i ].innerHTML );
	}
	
	console.log("Data");
	console.log(a);
	
	var options = {
		animationEnabled: true,
		title: {
			text: "Solar Production"
		},
		axisY: {
			title: "Energy Values in kWh",
			includeZero: false
		},
		axisX: {
			title: "Hours"
		},
		data: [{
			type: "column",
			dataPoints: [
				{ label: "08:00", y:  parseInt(a[0].replace(' kWh','')) },	
				{ label: "12:00", y:  parseInt(a[1].replace(' kWh','')) },	
				{ label: "16:00", y:  parseInt(a[2].replace(' kWh','')) },
				{ label: "20:00", y:  parseInt(a[3].replace(' kWh','')) },
				{ label: "00:00", y:  parseInt(a[4].replace(' kWh','')) }
			]
		}]
	};
	$("#chartContainer").CanvasJSChart(options);
}