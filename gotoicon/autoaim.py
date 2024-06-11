import cv2
import numpy as np
import pyautogui
import screeninfo
import keyboard
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

pyautogui.FAILSAFE = False

visited_coords = []
last_trigger_time = 0
cache = {}

def debounce(interval=0.1):
    def decorator(fn):
        def wrapper(*args, **kwargs):
            global last_trigger_time
            current_time = time.time()
            if current_time - last_trigger_time > interval:
                last_trigger_time = current_time
                return fn(*args, **kwargs)
        return wrapper
    return decorator

def get_screenshot(region):
    screenshot = np.array(pyautogui.screenshot(region=region))
    return cv2.cvtColor(screenshot, cv2.COLOR_BGR2GRAY)

def match_template(template, screenshot, top_left_x, top_left_y, threshold=0.8):
    result = cv2.matchTemplate(screenshot, template, cv2.TM_CCOEFF_NORMED)
    _, max_val, _, max_loc = cv2.minMaxLoc(result)

    if max_val > threshold:
        template_w, template_h = template.shape[1], template.shape[0]
        center_x = top_left_x + max_loc[0] + template_w // 2
        center_y = top_left_y + max_loc[1] + template_h // 2
        return (center_x, center_y), max_val
    return None

def find_nearest_sprite(image_folder, search_sizes=[256, 512, 1024]):
    mouse_x, mouse_y = pyautogui.position()
    monitors = screeninfo.get_monitors()
    active_monitor = next((monitor for monitor in monitors if 
                           monitor.x <= mouse_x < monitor.x + monitor.width and 
                           monitor.y <= mouse_y < monitor.y + monitor.height), None)
    
    if not active_monitor:
        return None, None

    matches = []
    cache_key = (mouse_x, mouse_y, tuple(search_sizes))
    
    if cache_key in cache:
        return cache[cache_key]

    for search_size in search_sizes:
        top_left_x = max(active_monitor.x, min(active_monitor.x + active_monitor.width - search_size, mouse_x - search_size // 2))
        top_left_y = max(active_monitor.y, min(active_monitor.y + active_monitor.height - search_size, mouse_y - search_size // 2))
        screenshot = get_screenshot((top_left_x, top_left_y, search_size, search_size))

        with ThreadPoolExecutor() as executor:
            futures = []
            for image_name in os.listdir(image_folder):
                image_path = os.path.join(image_folder, image_name)
                template = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                
                if template is None or template.shape[0] > search_size or template.shape[1] > search_size:
                    continue

                futures.append(executor.submit(match_template, template, screenshot, top_left_x, top_left_y))

            for future in as_completed(futures):
                result = future.result()
                if result:
                    matches.append((result[0], result[1], image_name))

        if matches:
            nearest_match = min(matches, key=lambda match: np.hypot(match[0][0] - mouse_x, match[0][1] - mouse_y))
            cache[cache_key] = (nearest_match[0], nearest_match[2])
            return nearest_match[0], nearest_match[2]

    cache[cache_key] = (None, None)
    return None, None

@debounce(interval=0.1)
def on_hotkey_pressed():
    global visited_coords

    image_folder = "sprites"
    coordinates, image_name = find_nearest_sprite(image_folder)

    if coordinates:
        x, y = coordinates
        current_position = pyautogui.position()
        if (x, y) == current_position:
            update_hud("OK", "ONLINE", (x, y), "At the coordinates already, moving to the next sprite")
            visited_coords.append((x, y))
            # Move to the next nearest match
            find_and_move_to_next_nearest(image_folder, current_position)
        else:
            pyautogui.moveTo(x, y)
            visited_coords.append((x, y))
            update_hud("OK", "ONLINE", (x, y), "Target Acquired")
    else:
        update_hud("WARNING", "ONLINE", (0, 0), "No Target Found")

def find_and_move_to_next_nearest(image_folder, current_position):
    mouse_x, mouse_y = current_position
    search_sizes = [256, 512]
    matches = []

    for search_size in search_sizes:
        top_left_x = max(mouse_x - search_size // 2, 0)
        top_left_y = max(mouse_y - search_size // 2, 0)
        screenshot = get_screenshot((top_left_x, top_left_y, search_size, search_size))

        with ThreadPoolExecutor() as executor:
            futures = []
            for image_name in os.listdir(image_folder):
                image_path = os.path.join(image_folder, image_name)
                template = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                
                if template is None or template.shape[0] > search_size or template.shape[1] > search_size:
                    continue

                futures.append(executor.submit(match_template, template, screenshot, top_left_x, top_left_y))

            for future in as_completed(futures):
                result = future.result()
                if result:
                    matches.append((result[0], result[1], image_name))

    if matches:
        matches = [(match, np.hypot(match[0][0] - mouse_x, match[0][1] - mouse_y)) for match in matches if (match[0][0], match[0][1]) not in visited_coords]
        if matches:
            nearest_match = min(matches, key=lambda match: match[1])
            coordinates, _, image_name = nearest_match[0]
            pyautogui.moveTo(coordinates[0], coordinates[1])
            update_hud("OK", "ONLINE", coordinates, "Target Acquired")
            visited_coords.append(coordinates)

def update_hud(status, system, coords, target):
    os.system('cls' if os.name == 'nt' else 'clear')
    hud = f"""
    STATUS: {status}
    SYSTEM: {system}
    COORDS: X={coords[0]} Y={coords[1]}
    TARGET: {target}
    """
    print(hud)

keyboard.add_hotkey('f22', on_hotkey_pressed, suppress=True)

print("Press F22 to move the cursor to the next icon.")
keyboard.wait('esc')

