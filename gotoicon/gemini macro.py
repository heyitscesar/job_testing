import os
import time
from pynput import keyboard, mouse
import tkinter as tk
from tkinter import filedialog, messagebox, Listbox, simpledialog

# Global variables for recording and playback state
recording = False
actions = []
start_time = None
playing = False

# Directory to save and load macros
macro_folder = os.path.join(os.getcwd(), "macros")
if not os.path.exists(macro_folder):
    os.makedirs(macro_folder)

# Mouse and keyboard controllers for playback
mouse_controller = mouse.Controller()
keyboard_controller = keyboard.Controller()

# Mouse listener to capture clicks and cursor positions
def on_click(x, y, button, pressed):
    global start_time
    if recording:
        action_time = int((time.time() - start_time) * 1000)
        start_time = time.time()
        if pressed:
            actions.append(f"[click] {x}x{y}\n[wait] {action_time}")

# Keyboard listener to capture key presses
def on_press(key):
    global start_time
    if recording:
        action_time = int((time.time() - start_time) * 1000)
        start_time = time.time()
        try:
            actions.append(f"[sendkey] {key.char}\n[wait] {action_time}")
        except AttributeError:  # For special keys like tab, enter, etc.
            actions.append(f"[sendkey] {key}\n[wait] {action_time}")

# Start recording function
def start_recording():
    global recording, start_time, actions
    recording = True
    start_time = time.time()
    actions = []
    record_btn.config(state=tk.DISABLED)
    stop_btn.config(state=tk.NORMAL)
    print("Recording started...")

# Stop recording function and prompt to save
def stop_recording():
    global recording
    recording = False
    record_btn.config(state=tk.NORMAL)
    stop_btn.config(state=tk.DISABLED)
    if actions:
        save_as()

# Save macro to file
def save_as():
    if not actions:
        messagebox.showinfo("Info", "No actions recorded!")
        return
    file_path = filedialog.asksaveasfilename(defaultextension=".mcr", initialdir=macro_folder,
                                             title="Save Macro As", filetypes=(("Macro files", "*.mcr"),))
    if file_path:
        with open(file_path, "w") as file:
            file.write("\n".join(actions))
        load_macros()

# Load existing macros from the macros folder
def load_macros():
    macro_list.delete(0, tk.END)
    for file in os.listdir(macro_folder):
        if file.endswith(".mcr"):
            macro_list.insert(tk.END, file)

# Parse macro actions and execute them
def play_macro(file_path, loop_count=1):
    global playing
    playing = True

    with open(file_path, "r") as file:
        macro = file.readlines()

    # Execute the macro actions
    for _ in range(loop_count):
        for line in macro:
            if "[click]" in line:
                coords = line.split(" ")[1].strip().split("x")
                x, y = int(coords[0]), int(coords[1])
                mouse_controller.position = (x, y)
                mouse_controller.click(mouse.Button.left, 1)
            elif "[sendkey]" in line:
                key = line.split(" ")[1].strip()
                if "Key." in key:  # Handle special keys like 'enter' or 'tab'
                    key_attr = getattr(keyboard.Key, key.replace("Key.", ""))
                    keyboard_controller.press(key_attr)
                    keyboard_controller.release(key_attr)
                else:
                    keyboard_controller.press(key)
                    keyboard_controller.release(key)
            elif "[wait]" in line:
                wait_time = int(line.split(" ")[1].strip())
                time.sleep(wait_time / 1000)  # Convert milliseconds to seconds

    playing = False
    print("Macro playback finished.")

# Playback selected macro
def play_selected_macro():
    selected_macro = macro_list.get(tk.ACTIVE)
    if not selected_macro:
        messagebox.showwarning("Warning", "No macro selected!")
        return

    file_path = os.path.join(macro_folder, selected_macro)
    
    # Ask user for the number of loops
    loop_count = simpledialog.askinteger("Loop Count", "Enter the number of times to loop:", minvalue=1, initialvalue=1)
    if loop_count is None:
        return  # Cancelled
    
    play_macro(file_path, loop_count)

# Main window setup
root = tk.Tk()
root.title("Macro Recorder")
root.geometry("400x400")

record_btn = tk.Button(root, text="Record Macro", command=start_recording)
record_btn.pack(pady=5)

stop_btn = tk.Button(root, text="Stop Recording", state=tk.DISABLED, command=stop_recording)
stop_btn.pack(pady=5)

save_btn = tk.Button(root, text="Save As", command=save_as)
save_btn.pack(pady=5)

reload_btn = tk.Button(root, text="Reload Macro Folder", command=load_macros)
reload_btn.pack(pady=5)

play_btn = tk.Button(root, text="Play Selected Macro", command=play_selected_macro)
play_btn.pack(pady=5)

macro_list = Listbox(root, width=50, height=10)
macro_list.pack(pady=10)

load_macros()

# Mouse and keyboard listeners
mouse_listener = mouse.Listener(on_click=on_click)
keyboard_listener = keyboard.Listener(on_press=on_press)

# Start listeners and main GUI loop
mouse_listener.start()
keyboard_listener.start()
root.mainloop()
