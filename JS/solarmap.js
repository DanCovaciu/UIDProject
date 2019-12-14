const identifiers = ['usa', 'south_america', 'europe', 'africa', 'asia', 'oceania' ];

$(document).ready(function () {

    identifiers.forEach(
        function (value, index, array) {
            const img = document.getElementById('m_g_' + value);
            img.addEventListener("click", function(){
                hide_all_descriptions();
                show_description(value);
            });
            const close_icon = document.getElementById('close_' + value);
            close_icon.addEventListener("click", function(){hide_description(value)});
        }
    )
});

function hide_all_descriptions() {
    identifiers.forEach(
        function (value, index, array) {
            hide_description(value);
        }
    )
}

function show_description(identifier) {
    document.getElementById('desc_' + identifier).hidden = false;
}

function hide_description(identifier) {
    document.getElementById('desc_' + identifier).hidden = true;
}


