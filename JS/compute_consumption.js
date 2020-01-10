const appliances = ['air conditioner', 'dishwasher', 'clothes dryer', 'freezer', 'refrigerator', 'kitchen stoves',
    'water heater', 'washing machine', 'microwave oven', 'oven', 'other'];

var nb_dropdowns = 0;

$(document).ready(function () {
    create_dropdown_line(1, 1);
});


function create_dropdown_line(id_generator, dropdown_number) {

    // Try to get the existing input field
    const input = document.getElementById("input" + id_generator);
    if (input != null) {
        console.log("Line already exists.");
        return;
    }

    nb_dropdowns++;

    // Get the div containing the dropdown lines
    const div_dropdowns = document.getElementById("dropdowns");

    // Create a new line in the dropdowns div
    const dd_line = document.createElement("DIV");
    dd_line.id = "line" + dropdown_number;
    div_dropdowns.appendChild(dd_line);

    // Write the appliance's number at the beginning of the line
    const title = document.createElement("SPAN");
    title.innerText = "Appliance " + dropdown_number;
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
        create_dropdown_line(dropdown_number, nb_dropdowns + 1);
        show_input_field(dropdown_number);

    });

    // Create a line to display the errors regarding the consumption field
    const dd_error_line = document.createElement("DIV");
    dd_error_line.id = "line_error_consumption" + dropdown_number;
    dd_error_line.setAttribute("hidden", "true");
    dd_error_line.innerHTML = "The consumption must be a positive number !";
    dd_error_line.classList.add("error_line");
    div_dropdowns.appendChild(dd_error_line);

    // Create a line to display the errors regarding the duration field
    const dd_error_duration = document.createElement("DIV");
    dd_error_duration.id = "line_error_duration" + dropdown_number;
    dd_error_duration.setAttribute("hidden", "true");
    dd_error_duration.innerHTML = "The duration must be a number between 0 and 24 !";
    dd_error_duration.classList.add("error_line");
    div_dropdowns.appendChild(dd_error_duration);

}

function show_input_field(dropdown_number) {

    // Get the corresponding line
    const line = document.getElementById("line" + dropdown_number);

    // Try to get the existing input field
    let input = document.getElementById("input" + dropdown_number);
    if (input == null) {
        // The field doesn't exist, it should be created
        const label = document.createElement("LABEL");
        label.innerText = "Energy consumption : ";
        line.appendChild(label);
        // Create the input field
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

    // Try to get the input field for duration
    let input_duration = document.getElementById("duration" + dropdown_number);
    if (input_duration == null) {
        // The field doesn't exist, it should be created
        const label = document.createElement("LABEL");
        label.innerText = "Duration : ";
        line.appendChild(label);
        // Create the input field
        input_duration = document.createElement("INPUT");
        input_duration.id = "duration" + dropdown_number;
        input_duration.setAttribute("type", "text");
        input_duration.classList.add("input_with_appended_duration_unit");
        line.appendChild(input_duration);
        // Also create a span element for the unit
        const span = document.createElement("SPAN");
        span.classList.add("appended_duration_unit");
        span.innerText = "hours per day";
        line.appendChild(span);

        // Attach an event in order to check the value typed by the user
        input_duration.addEventListener("blur", function () {
            check_input_duration(dropdown_number);
        });
    }

}

// Validation of field input consumption
function check_input_value(dropdown_number) {
    // Retrieve the value typed by the user
    const value = document.getElementById("input" + dropdown_number).value;
    // Retrieve the error line
    const error_line = document.getElementById("line_error_consumption" + dropdown_number);
    if (isNaN(value) || (value.length === 0) || (value < 0)) {
        // The value is not a number, show the error line
        error_line.removeAttribute("hidden");
        return false;
    } else {
        // The value is a number, hide the error line
        error_line.setAttribute("hidden", "true");
        return true;
    }
}

// Validation of field input duration
function check_input_duration(dropdown_number) {
    // Retrieve the value typed by the user
    const value = document.getElementById("duration" + dropdown_number).value;
    // Retrieve the error line
    const error_line = document.getElementById("line_error_duration" + dropdown_number);
    if (isNaN(value) || (value.length === 0) || (value < 0) || (value > 24)) {
        // The value is not a number, show the error line
        error_line.removeAttribute("hidden");
        return false;
    } else {
        // The value is a number, hide the error line
        error_line.setAttribute("hidden", "true");
        return true;
    }
}

// Compute the total energy consumption
function compute() {

    // Verify that all the fields were correctly filed in
    if ( no_error() == false ) {
        return;
    }

    // Initialisation
    let cumulative_consumption = 0;
    let max_consumption = 0;
    let max_consumption_appliance = "";

    // Iterate on every line
    for (let i = 1; i < nb_dropdowns; i++) {
        const consumption = document.getElementById("input" + i).value;
        const duration = document.getElementById("duration" + i).value;
        const annual_consumption = consumption * duration * 365;
        if (annual_consumption > max_consumption) {
            max_consumption = annual_consumption;
            const select_appliance = document.getElementById("dd"+i);
            max_consumption_appliance = select_appliance.options[select_appliance.selectedIndex].value;
        }
        cumulative_consumption += annual_consumption;
    }

    if (cumulative_consumption <= 0) {
        return;
    }

    // Toggle visibility of elements
    const div_editor = document.getElementById("dropdowns");
    div_editor.setAttribute("hidden", "true");
    const div_buttons = document.getElementById("buttons");
    div_buttons.setAttribute("hidden", "true");
    const span_result = document.getElementById("result");
    span_result.innerText = cumulative_consumption.toString();
    document.getElementById("appliance").innerText = max_consumption_appliance;
    document.getElementById("consumption").innerText = max_consumption;
    const div_compute = document.getElementById("computation_result");
    div_compute.removeAttribute("hidden");
}

// Remove all the fields from the div dropdowns and recreate the first line
function reset() {
    const div_dropdowns = document.getElementById("dropdowns");
    for (let i = 1; i <= nb_dropdowns; i++) {
        const line = document.getElementById("line" + i);
        div_dropdowns.removeChild(line);
        const error_consumption = document.getElementById("line_error_consumption" + i);
        if( error_consumption != null )
            div_dropdowns.removeChild(error_consumption);
        const error_duration = document.getElementById("line_error_duration" + i);
        if( error_duration != null )
            div_dropdowns.removeChild(error_duration);
    }
    nb_dropdowns = 0;
    create_dropdown_line(1, 1);
}

function return_to_editor() {
    // Toggle visibility of elements
    const div_compute = document.getElementById("computation_result");
    div_compute.setAttribute("hidden", "true");
    const div_editor = document.getElementById("dropdowns");
    div_editor.removeAttribute("hidden");
    const div_buttons = document.getElementById("buttons");
    div_buttons.removeAttribute("hidden");
}

function no_error() {
    let errors = true;
    for (let i = 1; i < nb_dropdowns; i++) {
        console.log(i);
        errors = errors & check_input_duration(i);
        errors = errors & check_input_value(i);
    }
    return errors;
}
