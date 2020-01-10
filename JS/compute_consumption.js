const appliances = ['air conditioner', 'dishwasher', 'clothes dryer', 'freezer', 'refrigerator', 'kitchen stoves',
    'water heater', 'washing machine', 'microwave oven', 'oven', 'other'];
const frequencies = ['per hour', 'per day', 'per week', 'per month', 'per year'];

var nb_dropdowns = 1;

$(document).ready(function () {
    create_dropdown_line(1);
});


function create_dropdown_line(dropdown_number) {

    nb_dropdowns++;

    // Get the div containing the dropdown lines
    const div_dropdowns = document.getElementById("dropdowns");

    // Create a new line in the dropdowns div
    const dd_line = document.createElement("DIV");
    dd_line.id = "line" + dropdown_number;
    div_dropdowns.appendChild(dd_line);

    // Write the appliance's number at the beginning of the line
    const title = document.createElement("SPAN");
    title.innerText = "Appliance " + dropdown_number + " : ";
    title.classList.add("title");
    dd_line.appendChild(title);

    // Create a new dropdown in the line
    const select = document.createElement("SELECT");
    select.id = "dd" + dropdown_number;
    dd_line.appendChild(select);

    // Add the default selected option to the dropdown
    const default_option = document.createElement("OPTION");
    default_option.textContent = "Select ..."
    default_option.value = "default";
    default_option.setAttribute("selected", "true");
    default_option.setAttribute("disabled", "true");
    select.appendChild(default_option);

    // Populate the dropdown options
    for (let i = 0; i < appliances.length; i++) {
        const opt = appliances[i];
        const el = document.createElement("OPTION");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

    // Attach an event in order to create the rest of the line when something
    // is selected in the dropdown
    select.addEventListener("change", function () {
        show_input_field(dropdown_number);
        create_dropdown_line(nb_dropdowns);
    });

    // Create a line to display the errors
    const dd_error_line = document.createElement("DIV");
    dd_error_line.id = "line_error" + dropdown_number;
    dd_error_line.setAttribute("hidden", "true");
    dd_error_line.innerText = "You must enter a positive number !";
    dd_error_line.classList.add("error_line");
    div_dropdowns.appendChild(dd_error_line);

}

function show_input_field(dropdown_number) {

    // Get the corresponding line
    const line = document.getElementById("line" + dropdown_number);

    // Try to get the existing input field
    let input = document.getElementById("input" + dropdown_number);
    if (input == null) {
        // The field doesn't exist, it should be created
        input = document.createElement("INPUT");
        input.id = "input" + dropdown_number;
        input.setAttribute("type", "text");
        input.classList.add("input_with_appended_unit");
        line.appendChild(input);
        // Also create a span element for the unit
        const span = document.createElement("SPAN");
        span.classList.add("appended_unit");
        span.innerText = "kWh";
        line.appendChild(span);

        // Attach an event in order to check the value typed by the user
        input.addEventListener("blur", function () {
            check_input_value(dropdown_number);
        });
    }

    // Try to get the existing dropdown for frequencies
    let dd_frequencies = document.getElementById("frequence" + dropdown_number);
    if (dd_frequencies == null) {
        // The dropdown doesn't exist, create it
        dd_frequencies = document.createElement("SELECT");
        dd_frequencies.id = "frequence" + dropdown_number;
        line.appendChild(dd_frequencies);

        // Add the default selected option to the dropdown
        const default_option = document.createElement("OPTION");
        default_option.textContent = "Select ..."
        default_option.value = "default";
        default_option.setAttribute("selected", "true");
        default_option.setAttribute("disabled", "true");
        dd_frequencies.appendChild(default_option);

        // Populate the dropdown options
        for (let i = 0; i < frequencies.length; i++) {
            const opt = frequencies[i];
            const el = document.createElement("OPTION");
            el.textContent = opt;
            el.value = opt;
            dd_frequencies.appendChild(el);
        }
    }

}


function check_input_value(dropdown_number) {
    // Retrieve the value typed by the user
    const value = document.getElementById("input" + dropdown_number).value;
    // Retrieve the error line
    const error_line = document.getElementById("line_error" + dropdown_number);
    if ( isNaN(value)  || (value.length === 0) || ( value < 0 ) )  {
        // The value is not a number, show the error line
        error_line.removeAttribute("hidden");
    } else {
        // The value is a number, hide the error line
        error_line.setAttribute("hidden", "true");
    }
}

