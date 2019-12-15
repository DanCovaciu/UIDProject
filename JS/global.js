jQuery(document).ready(function () {
    $("#close_chat").click(shrink_chat);
    $("#chat_footer").click(enlarge_chat);
});

function enlarge_chat() {
    // hide footer
    $("#chat_footer").hide();
    // enlarge height
    $("#chat").animate(
        {
            height: '300px',
        },
        500,
        null,
    );
    // show components
    $("#close_chat").show();
    $("#messages_container").show();
    $("#div_message").show();
}

function shrink_chat() {
    // hide components
    $("#close_chat").hide();
    $("#messages_container").hide();
    $("#div_message").hide();

    // Shrink height
    $("#chat").animate(
        {
            height: '30px',
        },
        500,
        null,
    );

    // show footer
    $("#chat_footer").show();
}
