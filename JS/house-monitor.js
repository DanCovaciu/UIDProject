var oldValue = 100;

jQuery(document).ready(function () {
    $("#readInverter").hide();
	$('#confirm').on('click', doOnConfirm);
	$('#cancel').on('click', doOnCancel);
	$("#rinverter").click(open_modal);
	
	$('#close').on('click', function() {
		$(this).parent().fadeOut();
		$(".btns").show();
	});
});

function open_modal() {
     $(".btns").hide();
	 $("#readInverter").show();
	 $("#oldIndex").val(oldValue);
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