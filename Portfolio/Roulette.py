import random
import sys
import tkinter as tk
from tkinter import messagebox
import itertools

# Function to simulate a spin
def do_the_spin(roulette_numbers):
    spin_result = random.choice(list(roulette_numbers.keys()))
    spin_colour = roulette_numbers[spin_result]
    return spin_result, spin_colour

# Function to animate the spin
def animate_spin():
    spin_label.config(text="")
    for i in range(101):
        spin_label.config(text=f"Spinning... {i}%")
        root.update_idletasks()
        root.after(20)
        if not spinning:
            break

# Function to handle the spin and display results
def spin():
    global spinning
    spinning = True
    root.after(0, animate_spin)
    root.after(2000, stop_spin)

def stop_spin():
    global spinning
    spinning = False
    colour_or_number = var_choice.get()
    if colour_or_number == "colour":
        colour = var_colour.get().lower()
        if colour not in ["black", "red", "green"]:
            messagebox.showerror("Error", "Silly, that's not black, red or green!")
            return
        # Removed the check for 0 or 00 when green is selected
    elif colour_or_number == "number":
        number = entry_number.get()
        if not number.isdigit() or int(number) < 0 or int(number) > 36:
            messagebox.showerror("Error", "Please enter a valid number between 0 and 36.")
            return
    else:
        messagebox.showerror("Error", "COLOUR OR NUMBER!")
        return

    spin_result, spin_colour = do_the_spin(roulette_numbers)
    if colour_or_number == "colour":
        result_text = f"Roulette spin result: {spin_colour}"
        if colour == spin_colour:
            result_text += "\nWinner!"
        else:
            result_text += "\nKeep gambling!"
    elif colour_or_number == "number":
        result_text = f"Roulette spin result: {spin_result}"
        if number == str(spin_result):
            result_text += "\nWinner!" 
        else:
            result_text += "\nGamble more!"
    
    messagebox.showinfo("Result", result_text)
    spin_label.config(text="")  # Reset the spinning percentage

# Function to toggle the state of the number entry
def toggle_number_entry():
    if var_choice.get() == "colour":
        entry_number.config(state=tk.DISABLED)
    else:
        entry_number.config(state=tk.NORMAL)

# Define the numbers and their colors
roulette_numbers = {
    0: "green",
    1: "red", 2: "black", 3: "red", 4: "black", 5: "red", 6: "black", 7: "red", 8: "black",
    9: "red", 10: "black", 11: "black", 12: "red", 13: "black", 14: "red", 15: "black", 16: "red",
    17: "black", 18: "red", 19: "red", 20: "black", 21: "red", 22: "black", 23: "red", 24: "black",
    25: "red", 26: "black", 27: "red", 28: "black", 29: "black", 30: "red", 31: "black", 32: "red",
    33: "black", 34: "red", 35: "black", 36: "red"
}

# Create the main window
root = tk.Tk()
root.title("Roulette Game")
root.state('zoomed')  # Make the window full screen

# Create and place widgets
main_frame = tk.Frame(root, padx=20, pady=20)
main_frame.pack(expand=True)

tk.Label(main_frame, text="Choose Colour or Number:", font=("Helvetica", 16)).pack(pady=10)
var_choice = tk.StringVar(value="colour")
tk.Radiobutton(main_frame, text="Colour", variable=var_choice, value="colour", font=("Helvetica", 14), command=toggle_number_entry).pack(pady=5)
tk.Radiobutton(main_frame, text="Number", variable=var_choice, value="number", font=("Helvetica", 14), command=toggle_number_entry).pack(pady=5)

frame_colour = tk.Frame(main_frame, pady=10)
frame_colour.pack()
tk.Label(frame_colour, text="Choose Colour:", font=("Helvetica", 14)).pack(side=tk.LEFT, padx=5)
var_colour = tk.StringVar(value="black")
tk.OptionMenu(frame_colour, var_colour, "black", "red", "green").pack(side=tk.LEFT, padx=5)

frame_number = tk.Frame(main_frame, pady=10)
frame_number.pack()
tk.Label(frame_number, text="Enter Number:", font=("Helvetica", 14)).pack(side=tk.LEFT, padx=5)
entry_number = tk.Entry(frame_number, font=("Helvetica", 14), state=tk.DISABLED)
entry_number.pack(side=tk.LEFT, padx=5)

spin_label = tk.Label(main_frame, text="", font=("Helvetica", 16))
spin_label.pack(pady=10)

tk.Button(main_frame, text="Spin", command=spin, font=("Helvetica", 16)).pack(pady=20)

# Initialize spinning flag
spinning = False

# Start the Tkinter event loop
root.mainloop()
