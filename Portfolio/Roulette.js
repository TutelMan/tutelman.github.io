import random
import tkinter as tk
from tkinter import messagebox

// Function to simulate a spin
function do_the_spin(roulette_numbers) {
    const keys = Object.keys(roulette_numbers);
    const spin_result = keys[Math.floor(Math.random() * keys.length)];
    const spin_colour = roulette_numbers[spin_result];
    return [spin_result, spin_colour];
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
    const colour_or_number = document.querySelector('input[name="choice"]:checked').value;
    if (colour_or_number === "colour") {
        const colour = document.getElementById("colour").value.toLowerCase();
        if (!["black", "red", "green"].includes(colour)) {
            alert("Silly, that's not black, red or green!");
            return;
        }
    } else if (colour_or_number === "number") {
        const number = document.getElementById("number").value;
        if (isNaN(number) || number < 0 || number > 36) {
            alert("Please enter a valid number between 0 and 36.");
            return;
        }
    } else {
        alert("COLOUR OR NUMBER!");
        return;
    }

    const [spin_result, spin_colour] = do_the_spin(roulette_numbers);
    let result_text;
    if (colour_or_number === "colour") {
        result_text = `Roulette spin result: ${spin_colour}`;
        if (colour === spin_colour) {
            result_text += "\nWinner!";
        } else {
            result_text += "\nKeep gambling!";
        }
    } else if (colour_or_number === "number") {
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
    if (document.querySelector('input[name="choice"]:checked').value === "colour") {
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
choice_label.textContent = "Choose Colour or Number:";
choice_label.style.fontSize = "16px";
main_frame.appendChild(choice_label);

const colour_radio = document.createElement("input");
colour_radio.type = "radio";
colour_radio.name = "choice";
colour_radio.value = "colour";
colour_radio.checked = true;
colour_radio.onclick = toggle_number_entry;
main_frame.appendChild(colour_radio);

const colour_label = document.createElement("label");
colour_label.textContent = "Colour";
colour_label.style.fontSize = "14px";
main_frame.appendChild(colour_label);

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

const frame_colour = document.createElement("div");
frame_colour.style.padding = "10px";
main_frame.appendChild(frame_colour);

const colour_select_label = document.createElement("label");
colour_select_label.textContent = "Choose Colour:";
colour_select_label.style.fontSize = "14px";
frame_colour.appendChild(colour_select_label);

const colour_select = document.createElement("select");
colour_select.id = "colour";
["black", "red", "green"].forEach(colour => {
    const option = document.createElement("option");
    option.value = colour;
    option.textContent = colour;
    colour_select.appendChild(option);
});
frame_colour.appendChild(colour_select);

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
