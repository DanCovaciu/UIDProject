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



function send() {

    // Get the message in the input field
    const input = document.getElementById("message");
    const message = input.value;
    if (message.length === 0)
        return;
    input.value = "";

    // The div containing all the messages
    const msg_container = document.getElementById("messages_container");

    // Create a new message structure
    const envelope = document.createElement("DIV");
    envelope.classList.add("message");
    envelope.classList.add("message_user");
    msg_container.appendChild(envelope);

    const timestamp = document.createElement("DIV");
    timestamp.classList.add("timestamp");
    const now = new Date();
    const nowString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    timestamp.innerText = nowString;
    envelope.appendChild(timestamp);

    const content = document.createElement("DIV");
    content.classList.add("message_content");
    content.innerText = message;
    envelope.appendChild(content);

    envelope.scrollIntoView();

    setTimeout(function() { computer_answer(message); }, 2000);
}


function computer_answer(message) {

    // The div containing all the messages
    const msg_container = document.getElementById("messages_container");

    // Create a new message structure
    const envelope = document.createElement("DIV");
    envelope.classList.add("message");
    envelope.classList.add("message_computer");
    msg_container.appendChild(envelope);

    const timestamp = document.createElement("DIV");
    timestamp.classList.add("timestamp");
    const now = new Date();
    const nowString = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    timestamp.innerText = nowString;
    envelope.appendChild(timestamp);

    const content = document.createElement("DIV");
    content.classList.add("message_content");
    content.innerText = message;
    envelope.appendChild(content);

    envelope.scrollIntoView();
}
