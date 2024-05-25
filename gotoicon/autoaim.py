import cv2
import numpy as np
import pyautogui
import screeninfo
import keyboard
import os

# Disable fail-safe
pyautogui.FAILSAFE = False

def get_screenshot(region):
    """
    Takes a screenshot of the specified region and returns it as a NumPy array.

    Args:
        region: A tuple (left, top, width, height) specifying the region to capture.

    Returns:
        A NumPy array representing the screenshot.
    """
    screenshot = np.array(pyautogui.screenshot(region=region))
    return cv2.cvtColor(screenshot, cv2.COLOR_BGR2GRAY)

def find_image_around_cursor(image_folder, search_size=256):
    """
    Finds the coordinates of an image within a 256px by 256px region around the cursor using OpenCV.

    Args:
        image_folder: Path to the folder containing PNG image files.
        search_size: The width and height of the search area in pixels (default is 256).

    Returns:
        A tuple containing the (x, y) coordinates of the center of the found image,
        or None if not found.
    """
    # Get the current mouse position
    mouse_x, mouse_y = pyautogui.position()

    # Calculate the top-left corner of the search region
    top_left_x = mouse_x - search_size // 2
    top_left_y = mouse_y - search_size // 2

    # Ensure the search region is within screen bounds
    monitors = screeninfo.get_monitors()
    active_monitor = next((monitor for monitor in monitors if 
                           monitor.x <= mouse_x < monitor.x + monitor.width and 
                           monitor.y <= mouse_y < monitor.y + monitor.height), None)
    
    if not active_monitor:
        print("Cursor is not on any detected monitor.")
        return None, None

    # Adjust coordinates relative to the active monitor
    top_left_x = max(active_monitor.x, min(active_monitor.x + active_monitor.width - search_size, top_left_x))
    top_left_y = max(active_monitor.y, min(active_monitor.y + active_monitor.height - search_size, top_left_y))

    # Take a screenshot of the search region
    screenshot = get_screenshot((top_left_x, top_left_y, search_size, search_size))

    # Iterate over each image in the folder
    for image_name in os.listdir(image_folder):
        image_path = os.path.join(image_folder, image_name)

        # Read the PNG image (preserve original data type)
        template = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)

        # Check data types (for debugging)
        print(f"Template data type for {image_name}: {template.dtype}")
        print(f"Screen data type: {screenshot.dtype}")

        # Handle potential alpha channel issues (if applicable)
        if template.shape[2] == 4:  # Check if template has alpha channel
            template = cv2.cvtColor(template, cv2.COLOR_BGRA2GRAY)  # Remove alpha channel

        # Apply template matching (various methods available, experiment for best results)
        result = cv2.matchTemplate(screenshot, template, cv2.TM_CCOEFF_NORMED)
        # Find the location of the best match
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

        # Check if a good enough match is found (adjust threshold as needed)
        if max_val > 0.8:
            # Get template dimensions (width, height)
            template_w, template_h = template.shape[1], template.shape[0]

            # Calculate center coordinates based on top-left corner and template size
            center_x = top_left_x + max_loc[0] + int(template_w / 2)
            center_y = top_left_y + max_loc[1] + int(template_h / 2)

            return (center_x, center_y), image_name

    return None, None

def on_hotkey_pressed():
    """
    Function to be triggered when the hotkey (Tab) is pressed.
    """
    image_folder = "sprites"  # Ensure correct path

    coordinates, image_name = find_image_around_cursor(image_folder)

    if coordinates:
        x, y = coordinates
        # Move cursor to the center of the found image
        pyautogui.moveTo(x, y)
        print(f"Image '{image_name}' found at coordinates: ({x}, {y})")
    else:
        print("No image found around cursor.")

# Set up the hotkey (Tab) to trigger the on_hotkey_pressed function, suppressing the default Tab action
keyboard.add_hotkey('tab', on_hotkey_pressed, suppress=True)

print("Press Tab to move the cursor to the next icon.")
# Keep the script running
keyboard.wait('esc')  # Press Esc to exit the script
