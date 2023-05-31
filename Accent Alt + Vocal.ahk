#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.
; Ctrl + Alt + a combination
^!a::Send, á
; Alt + Shift + A combination
!+a::Send, Á

; Ctrl + Alt + e combination
^!e::Send, é
; Alt + Shift + E combination
!+e::Send, É

; Ctrl + Alt + i combination
^!i::Send, í
; Alt + Shift + I combination
!+i::Send, Í

; Ctrl + Alt + o combination
^!o::Send, ó
; Alt + Shift + O combination
!+o::Send, Ó

; Ctrl + Alt + u combination
^!u::Send, ú
; Alt + Shift + U combination
!+u::Send, Ú

; Ctrl + ? combination
^/::Send, ¿

; Ctrl + Alt + n combination
^!n::Send, ñ


return
