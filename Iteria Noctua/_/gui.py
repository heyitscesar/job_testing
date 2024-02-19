import tkinter as tk
from tkinter import PhotoImage

def main():
    root = tk.Tk()

    # Load the PNG image with an alpha channel
    image_path = "HUD Canon Extended ditter.png"
    photo = PhotoImage(file=image_path)

    # Set the window size to the image size
    root.geometry(f"{photo.width()}x{photo.height()}")

    # Create a label to display the image
    label = tk.Label(root, image=photo)
    label.pack()

    # Make the window transparent using the alpha channel
    root.wm_attributes("-transparentcolor", "black")  # Set the transparent color (change as needed)
    root.attributes("-alpha", 0.1)  # Set the overall window transparency (0.0 to 1.0)

    root.mainloop()

if __name__ == "__main__":
    main()
