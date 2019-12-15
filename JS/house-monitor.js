jQuery(document).ready(function () {
    $("#modal1").hide();
	$("#rinverter").click(open_modal);
});

function open_modal() {
     $(".btns").hide();
	 $("#modal1").show();
}