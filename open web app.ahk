; AutoHotkey script to open URL from clipboard in Chrome app mode with Shift+F4

+F4::
    ; Retrieve the URL from the clipboard
    url := Clipboard
    
    ; Check if the clipboard contains text
    if url != ""
    {
        ; Open Chrome in app mode with the URL from the clipboard
        Run, C:\Program Files\Google\Chrome\Application\chrome.exe --app=%url%
    }
    else
    {
        ; Notify the user that the clipboard is empty
        MsgBox, Clipboard is empty or does not contain a valid URL.
    }
return
