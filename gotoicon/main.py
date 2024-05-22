import cv2
import numpy as np
import pyautogui
import screeninfo
import keyboard

# Disable fail-safe
pyautogui.FAILSAFE = False

def switch_to_display(display_number):
    """
    Switches the active window to the specified display.

    Args:
        display_number: The number of the display to switch to (0-indexed).
    """
    screen_list = screeninfo.get_monitors()
    if display_number < len(screen_list):
        screen = screen_list[display_number]
        pyautogui.moveTo(screen.x, screen.y)
    else:
        print(f"Display {display_number} not found.")

def find_image_on_display(image_path, display_number):
    """
    Finds the coordinates of an image on the specified display using OpenCV.

    Args:
        image_path: Path to the PNG image file.
        display_number: The number of the display to search on (0-indexed).

    Returns:
        A tuple containing the (x, y) coordinates of the center of the found image,
        or None if not found.
    """
    switch_to_display(display_number)

    # Read the PNG image (preserve original data type)
    template = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

    # Get the screenshot
    screenshot = np.array(pyautogui.screenshot())
    screen = cv2.cvtColor(screenshot, cv2.COLOR_BGR2GRAY)

    # Check data types (for debugging)
    print(f"Template data type: {template.dtype}")
    print(f"Screen data type: {screen.dtype}")

    # Handle potential alpha channel issues (if applicable)
    if template.shape[2] == 4:  # Check if template has alpha channel
        template = cv2.cvtColor(template, cv2.COLOR_BGRA2GRAY)  # Remove alpha channel

    # Apply template matching (various methods available, experiment for best results)
    result = cv2.matchTemplate(screen, template, cv2.TM_CCOEFF_NORMED)
    # Find the location of the best match
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    # Check if a good enough match is found (adjust threshold as needed)
    if max_val > 0.8:
        # Get template dimensions (width, height)
        template_w, template_h = template.shape[1], template.shape[0]

        # Calculate center coordinates based on top-left corner and template size
        center_x = max_loc[0] + int(template_w / 2)
        center_y = max_loc[1] + int(template_h / 2)

        return (center_x, center_y)
    else:
        return None

def on_hotkey_pressed():
    """
    Function to be triggered when the hotkey (Tab) is pressed.
    """
    image_to_find = "match.png"  # Ensure correct path
    display_number = 1  # Assuming display 2 is at index 1

    coordinates = find_image_on_display(image_to_find, display_number)

    if coordinates:
        x, y = coordinates
        # Move cursor to the center of the found image
        pyautogui.moveTo(x, y)
        print(f"Image found at coordinates: ({x}, {y})")
    else:
        print("Image not found on display.")

# Set up the hotkey (Tab) to trigger the on_hotkey_pressed function, suppressing the default Tab action
keyboard.add_hotkey('tab', on_hotkey_pressed, suppress=True)

print("Press Tab to move the cursor to the next icon.")
# Keep the script running
keyboard.wait('esc')  # Press Esc to exit the script
