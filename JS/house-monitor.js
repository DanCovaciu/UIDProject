var oldValue = 100;
var dummyDataInitial = ["100 kW", "20 kW", "90 kW", "120 kW", "170 kW"];
var dummyDataNextDay = ["199 kW", "230 kW", "780 kW", "120 kW", "70 kW"];
var dummyDataPreviousDay = ["567 kW", "342 kW", "900 kW", "1200 kW", "170 kW"];

$(document).ready(function () {
	// click actions
	$('#confirm').on('click', doOnConfirm);
	$('#cancel').on('click', doOnCancel);
	$("#readInverterButton").click(open_read_inverter_modal);
	$("#dataFeaturesButton").click(open_system_data_modal);
	$("#systemGenerationPowerButton").click(open_solar_production_monitor);
	
	$("#prevButton").on('click', view_previous_day_statistics);
	$("#nextButton").on('click', view_next_day_satistics);
	
	$('#close').on('click', function() {
		$(this).parent().hide();
		$("#solarHouse").show();
	});
	
	$('#closeDataFeatures').on('click', function() {
		$(this).parent().hide();
		$("#solarHouse").show();
	});
	
	
	// solar production monitoring
	$('#closeSolarProductionMonitor').on('click', function() {
		$(this).parent().hide();
		$("#solarHouse").show();
	});
	
	// initialize the chart
	initialize(dummyDataInitial);
});

var day, date;

function open_solar_production_monitor() {
	 $("#readInverter").hide();
	 $("#dataFeatures").hide();
	 $("#solarHouse").hide();
	 $("#solarProductionMonitor").show();
	 console.log(date);
}

function open_read_inverter_modal() {
	 $("#solarProductionMonitor").hide();
	 $("#dataFeatures").hide();
	 $("#solarHouse").hide();
	 $("#readInverter").show();
	 $("#oldIndex").val(oldValue + " kW");
}

function open_system_data_modal() {
	$("#solarProductionMonitor").hide();
	$("#readInverter").hide();
	$("#solarHouse").hide();
	$("#dataFeatures").show();
}

function doOnConfirm() {
	 if ($("#newIndex").val() == 0){
		 $("#newIndex").css("border-color" , "red");
	 }
	 else {
		oldValue = $("#newIndex").val();
		$("#readInverter").hide();
		$(".btns").show();
		$("#solarHouse").show();
		$("#newIndex").val('');
	 }
}

function doOnCancel() {
	 $("#readInverter").hide();
	 $(".btns").show();
	 $("#solarHouse").show();
	 $("#newIndex").val('');
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var monthDurationDays = [31, 29, 31, 30, 31, 30, 31, 31, 39, 31, 30, 31];

function view_previous_day_statistics() {
	day = parseInt($('#currentDate').text().replace(/[^0-9]/g, '')) - 1;
	console.log("Now DAY: " + day);
	
	var newDate;
	// check if day is 0, then go to first day of previous month
	if(day == 0){
		date = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "").replace(/\s/g,'');
		console.log("Date NOW: " + date);
		
		// first month from the year
		if (months.indexOf(date) == 0){
			console.log(months);
			console.log(months.length);
			newDate = months[months.length - 1] + " " + monthDurationDays[months.length - 1];
			
			var currentYear = parseInt($('#currentYear').text());
			$('#currentYear').text(currentYear - 1);
			
			console.log("New date: " + newDate);
			console.log("Year: " + currentYear-1);
		}
		else {
			newDate = months[months.indexOf(date) - 1] + " " + monthDurationDays[months.length - 1];
		}
	}
	else {
		newDate = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "");
		newDate += day;
	}
	$('#currentDate').text(newDate);
	initialize(dummyDataPreviousDay);
}

function view_next_day_satistics() {
	day = parseInt($('#currentDate').text().replace(/[^0-9]/g, '')) + 1;
	console.log("NOW day: " + day);
	
	var newDate;
	
	var currentMonthName = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "").replace(/\s/g,'');
	var monthName = months[months.indexOf(currentMonthName)];
	var monthDay = monthDurationDays[months.indexOf(currentMonthName)] + 1;
	
	console.log("currentMonthName: " + currentMonthName);
	console.log("monthName: " + monthName);
	console.log("monthDay: " + monthDay);
	
	// check if is the last day of the month
	if(monthDay == day && monthName == currentMonthName){
		// last month from the year
		if (months.indexOf(currentMonthName) == months.length - 1){
			console.log("last month");
			newDate = months[0] + " 1";
			
			var currentYear = parseInt($('#currentYear').text());
			$('#currentYear').text(currentYear + 1);
		}
		else {
			console.log("not last month");
			newDate = months[months.indexOf(currentMonthName) + 1] + " 1";
			console.log(newDate);
		}
	}
	else {
		newDate = $('#currentDate').text().replace(new RegExp("[0-9]","g"), "");
		newDate += day;
		console.log("Next date: " + newDate);
	}
	$('#currentDate').text(newDate);
	initialize(dummyDataNextDay);
}

function initialize(data){
	var energyValuesList = $('.evalue').get();
	console.log(energyValuesList);
	
	var a = [];
	for ( var i = 0; i < energyValuesList.length; i++ ) {
		energyValuesList[ i ].innerHTML = data[ i ];
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
				{ label: "08:00", y:  parseInt(a[0].replace(' kW','')) },	
				{ label: "12:00", y:  parseInt(a[1].replace(' kW','')) },	
				{ label: "16:00", y:  parseInt(a[2].replace(' kW','')) },
				{ label: "20:00", y:  parseInt(a[3].replace(' kW','')) },
				{ label: "00:00", y:  parseInt(a[4].replace(' kW','')) }
			]
		}]
	};
	
	$("#chartContainer").CanvasJSChart(options);
}