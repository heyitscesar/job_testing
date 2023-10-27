#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

; Press Ctrl+Alt+B to set the active window to always be on bottom and non-activating
^!b::
WinGet, hWnd, ID, A
WinSet, Bottom, , A
WinSet, ExStyle, ^0x20, ahk_id %hWnd%
return

; Open URL on Chrome app mode
+F4:: 
;+#z:: 

; Check if clipboard has data
If (Clipboard)
{
    ; Get clipboard content
    ClipboardContent := Clipboard
    
    ; Run the command with clipboard content as argument
    ;MsgBox, Clipboard content: %ClipboardContent%
    Run, "C:\Program Files\Google\Chrome\Application\chrome.exe" -app="%ClipboardContent%"
}
else
{
    ; If clipboard is empty, show a message (optional)
    MsgBox, Clipboard is empty!
}