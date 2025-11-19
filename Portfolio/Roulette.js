// Function to simulate a spin
function do_the_spin(roulette_numbers) {
    const keys = Object.keys(roulette_numbers);
    const spin_result = keys[Math.floor(Math.random() * keys.length)];
    const spin_Color = roulette_numbers[spin_result];
    return [spin_result, spin_Color];
}

// Function to animate the spin
function animate_spin() {
    spin_label.textContent = "";
    for (let i = 0; i <= 100; i++) {
        spin_label.textContent = `Spinning... ${i}%`;
        setTimeout(() => {}, 20);
        if (!spinning) {
            break;
        }
    }
}

// Function to handle the spin and display results
function spin() {
    spinning = true;
    setTimeout(animate_spin, 0);
    setTimeout(stop_spin, 2000);
}

function stop_spin() {
    spinning = false;
    const Color_or_number = document.querySelector('input[name="choice"]:checked').value;
    if (Color_or_number === "Color") {
        const Color = document.getElementById("Color").value.toLowerCase();
        if (!["black", "red", "green"].includes(Color)) {
            alert("Silly, that's not black, red or green!");
            return;
        }
    } else if (Color_or_number === "number") {
        const number = document.getElementById("number").value;
        if (isNaN(number) || number < 0 || number > 36) {
            alert("Please enter a valid number between 0 and 36.");
            return;
        }
    } else {
        alert("Color OR NUMBER!");
        return;
    }

    const [spin_result, spin_Color] = do_the_spin(roulette_numbers);
    let result_text;
    if (Color_or_number === "Color") {
        result_text = `Roulette spin result: ${spin_Color}`;
        if (Color === spin_Color) {
            result_text += "\nWinner!";
        } else {
            result_text += "\nKeep gambling!";
        }
    } else if (Color_or_number === "number") {
        result_text = `Roulette spin result: ${spin_result}`;
        if (number == spin_result) {
            result_text += "\nWinner!";
        } else {
            result_text += "\nGamble more!";
        }
    }

    alert(result_text);
    spin_label.textContent = "";  // Reset the spinning percentage
}

// Function to toggle the state of the number entry
function toggle_number_entry() {
    if (document.querySelector('input[name="choice"]:checked').value === "Color") {
        document.getElementById("number").disabled = true;
    } else {
        document.getElementById("number").disabled = false;
    }
}

// Define the numbers and their colors
const roulette_numbers = {
    0: "green",
    1: "red", 2: "black", 3: "red", 4: "black", 5: "red", 6: "black", 7: "red", 8: "black",
    9: "red", 10: "black", 11: "black", 12: "red", 13: "black", 14: "red", 15: "black", 16: "red",
    17: "black", 18: "red", 19: "red", 20: "black", 21: "red", 22: "black", 23: "red", 24: "black",
    25: "red", 26: "black", 27: "red", 28: "black", 29: "black", 30: "red", 31: "black", 32: "red",
    33: "black", 34: "red", 35: "black", 36: "red"
};

// Create and place widgets
const main_frame = document.createElement("div");
main_frame.style.padding = "20px";
main_frame.style.textAlign = "center";
document.getElementById("roulette-game").appendChild(main_frame);

const choice_label = document.createElement("label");
choice_label.textContent = "Choose Color or Number:";
choice_label.style.fontSize = "16px";
main_frame.appendChild(choice_label);

const Color_radio = document.createElement("input");
Color_radio.type = "radio";
Color_radio.name = "choice";
Color_radio.value = "Color";
Color_radio.checked = true;
Color_radio.onclick = toggle_number_entry;
main_frame.appendChild(Color_radio);

const Color_label = document.createElement("label");
Color_label.textContent = "Color";
Color_label.style.fontSize = "14px";
main_frame.appendChild(Color_label);

const number_radio = document.createElement("input");
number_radio.type = "radio";
number_radio.name = "choice";
number_radio.value = "number";
number_radio.onclick = toggle_number_entry;
main_frame.appendChild(number_radio);

const number_label = document.createElement("label");
number_label.textContent = "Number";
number_label.style.fontSize = "14px";
main_frame.appendChild(number_label);

const frame_Color = document.createElement("div");
frame_Color.style.padding = "10px";
main_frame.appendChild(frame_Color);

const Color_select_label = document.createElement("label");
Color_select_label.textContent = "Choose Color:";
Color_select_label.style.fontSize = "14px";
frame_Color.appendChild(Color_select_label);

const Color_select = document.createElement("select");
Color_select.id = "Color";
["black", "red", "green"].forEach(Color => {
    const option = document.createElement("option");
    option.value = Color;
    option.textContent = Color;
    Color_select.appendChild(option);
});
frame_Color.appendChild(Color_select);

const frame_number = document.createElement("div");
frame_number.style.padding = "10px";
main_frame.appendChild(frame_number);

const number_input_label = document.createElement("label");
number_input_label.textContent = "Enter Number:";
number_input_label.style.fontSize = "14px";
frame_number.appendChild(number_input_label);

const number_input = document.createElement("input");
number_input.type = "text";
number_input.id = "number";
number_input.disabled = true;
frame_number.appendChild(number_input);

const spin_label = document.createElement("div");
spin_label.id = "spin-label";
spin_label.style.fontSize = "16px";
main_frame.appendChild(spin_label);

const spin_button = document.createElement("button");
spin_button.textContent = "Spin";
spin_button.onclick = spin;
spin_button.style.fontSize = "16px";
main_frame.appendChild(spin_button);

// Initialize spinning flag
let spinning = false;
