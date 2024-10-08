/**
 * This script handles click and mouseover events on specific elements within a webpage.
 * 
 * Features:
 * - Stores 8-digit case numbers and copies them all at once to the clipboard.
 * - Prevents copying certain text based on predefined exceptions.
 * - Custom CSS is applied to elements for styling.
 */

let caseNumbers = []; // Array to store 8-digit case numbers
const exceptions = ["[x]", "Ticket Comment", "Dashboard"]; // Array of exceptions

// Function to handle click events
function handleClick(event) {
    if (event.target.classList.contains("dataValue") &&
        "caseIdSpan" === event.target.getAttribute("data-dojo-attach-point")) {
        var t = event.target.textContent.trim(); // Get the trimmed text content
        
        // Check if the text contains any exceptions
        if (!exceptions.some(exception => t.includes(exception))) {
            // Store only 8-digit numbers
            if (/^\d{8}$/.test(t)) {
                if (!caseNumbers.includes(t)) { // Avoid duplicates
                    caseNumbers.push(t);
                    console.log("8-digit case number stored:", t);
                }
            } else {
                copyToClipboard(t); // Copy other text to clipboard
                console.log("Text content copied to clipboard:", t);
            }
        } else {
            console.log("Text content matches exception, not copied:", t);
        }
    }
}

// Function to copy text to clipboard
function copyToClipboard(t) {
    var e = document.createElement("textarea");
    e.value = t;
    document.body.appendChild(e);
    e.select();
    document.execCommand("copy");
    document.body.removeChild(e);
}

// Event listener to copy case numbers to clipboard when F2 is pressed
document.addEventListener('keydown', function(event) {
    if (event.key === "F2") {
        if (caseNumbers.length > 0) {
            const casesText = caseNumbers.join('\n'); // Join case numbers with newline
            copyToClipboard(casesText);
            console.log("Copied case numbers to clipboard:\n", casesText);
        } else {
            console.log("No case numbers to copy.");
        }
    }
});

// Function to handle mouseover events
function handleMouseover(event) {
    if (event.target.tagName === "SPAN") {
        event.target.style.cursor = "pointer"; // Change cursor to pointer
    }
}

// Object to handle span-related events
var SpanHandler = {
    handleClick: function(event) {
        if (event.target.tagName === "SPAN") {
            var text = event.target.textContent.trim();
            
            if (!exceptions.some(exception => text.includes(exception))) {
                if (/^\d{8}$/.test(text)) {
                    if (!caseNumbers.includes(text)) {
                        caseNumbers.push(text);
                        console.log("8-digit case number stored:", text);
                    }
                } else {
                    SpanHandler.copyToClipboard(text);
                    console.log("Text content copied to clipboard:", text);
                }
            } else {
                console.log("Text content matches exception, not copied:", text);
            }
        }
    },
    handleMouseover: function(event) {
        if (event.target.tagName === "SPAN") {
            event.target.style.cursor = "pointer";
        }
    },
    copyToClipboard: function(text) {
        var textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    },
    init: function() {
        document.addEventListener("click", SpanHandler.handleClick);
        document.addEventListener("mouseover", SpanHandler.handleMouseover);
    }
};

// Initialize SpanHandler
SpanHandler.init();

// Custom CSS styles
var style = document.createElement("style");
style.type = "text/css";
var css = `
    table, .noteContainer { border-collapse: collapse; }
    .dgrid-row-table, .caseNoteWidget { 
        box-shadow: 0 4px 8px rgba(0, 0, 0, .1); 
        margin-bottom: 15px; 
        background-color: #fff; 
        transition: box-shadow .3s; 
    }
    .dgrid-row-odd, .caseNoteWidget:nth-child(odd) { background-color: #f5f5f5; }
    .dgrid-cell, .note-content { padding: 8px; border-bottom: 1px solid #ddd; }
    .dgrid-row-header, .note-header { background-color: #eee; }
    .dgrid-column-brand, .dgrid-column-station, .dgrid-column-detail, .note-sidebar { font-weight: bold; }
    .dgrid-column-status { color: #007bff; }
    .dgrid-row:hover, .caseNoteWidget:hover { background-color: #e0f2ff; box-shadow: 0 8px 16px rgba(0, 0, 0, .2); }
    .dijitTreeContainer { background-color: #f9f9f9; padding: 10px; }
    .dijitTreeNode { padding: 5px 0; }
    .dijitTreeRowSelected { background-color: #e0f2ff; border-radius: 4px; }
    .dijitTreeIcon, .dijitTreeLabel { vertical-align: middle; }
    .dijitTreeLabel { color: #333; padding-left: 5px; cursor: pointer; }
    .dijitTreeRow:hover { background-color: #d1e0ee; }
    .dijitTreeContentExpanded { font-weight: bold; }
`;
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
