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
	
	$('#close').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
	
	$('#closeDataFeatures').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
	
	$('#closeSolarProductionMonitor').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").fadeIn();
	});
});

function open_solar_production_monitor() {
     $(".btns").hide();
	 $("#solarProductionMonitor").show();
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