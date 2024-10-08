// Array to store case numbers
var case_numbers = [];

// Function to handle click events
function handleClick(event) {
    // Check if the clicked element has the class 'dataValue' and the attribute 'data-dojo-attach-point' equals 'caseIdSpan'
    if (event.target.classList.contains("dataValue") &&
        "caseIdSpan" === event.target.getAttribute("data-dojo-attach-point")) {
        
        var t = event.target.textContent; // Get the text content of the clicked element
        
        // Check if the text contains 8 digits and is not one of the exception strings
        if (t.length === 8 && /^\d{8}$/.test(t)) {
            case_numbers.push(t); // Add the number to the array if it's 8 digits long
            console.log("Case number added:", t); // Log the added case number
        } else {
            copyToClipboard(t); // Copy the text content to the clipboard if it doesn't match the case number condition
            console.log("Text content copied to clipboard:", t); // Log the copied text content
        }
    }
}

// Function to copy text to clipboard
function copyToClipboard(t) {
    var e = document.createElement("textarea"); // Create a textarea element
    e.value = t; // Set the value of the textarea to the text to be copied
    document.body.appendChild(e); // Append the textarea to the body
    e.select(); // Select the text inside the textarea
    document.execCommand("copy"); // Execute the copy command
    document.body.removeChild(e); // Remove the textarea from the body
}

// Function to handle keypress events (e.g., F2 to copy case numbers)
document.addEventListener('keydown', function(event) {
    if (event.key === 'F2') {
        if (case_numbers.length > 0) {
            var caseNumbersString = case_numbers.join("\n"); // Join all case numbers with new lines
            copyToClipboard(caseNumbersString); // Copy all case numbers to the clipboard
            console.log("Case numbers copied to clipboard:", caseNumbersString); // Log the copied case numbers
        } else {
            console.log("No case numbers to copy.");
        }
    }
});

// Function to handle mouseover events
function handleMouseover(t) {
    // Check if the event target is a SPAN element
    if (event.target.tagName === "SPAN") {
        event.target.style.cursor = "pointer"; // Change the cursor style to pointer
    }
}

// Object to handle span-related events
var SpanHandler = {
    // Method to handle click events on SPAN elements
    handleClick: function(t) {
        if (t.target.tagName === "SPAN") {
            var e = t.target.textContent; // Get the text content of the clicked element
            SpanHandler.copyToClipboard(e); // Copy the text content to the clipboard
            console.log("Text content copied to clipboard:", e); // Log the copied text content
        }
    },
    // Method to handle mouseover events on SPAN elements
    handleMouseover: function(t) {
        if (t.target.tagName === "SPAN") {
            t.target.style.cursor = "pointer"; // Change the cursor style to pointer
        }
    },
    // Method to copy text to clipboard
    copyToClipboard: function(t) {
        var e = document.createElement("textarea"); // Create a textarea element
        e.value = t; // Set the value of the textarea to the text to be copied
        document.body.appendChild(e); // Append the textarea to the body
        e.select(); // Select the text inside the textarea
        document.execCommand("copy"); // Execute the copy command
        document.body.removeChild(e); // Remove the textarea from the body
    },
    // Method to initialize event listeners
    init: function() {
        document.addEventListener("click", SpanHandler.handleClick); // Add click event listener
        document.addEventListener("mouseover", SpanHandler.handleMouseover); // Add mouseover event listener
    }
};

// Initialize SpanHandler
SpanHandler.init();

// Create a style element
var e = document.createElement("style");
e.type = "text/css";

// Define CSS styles
var t = `
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
`;

// Append the styles to the style element
e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));

// Define additional CSS styles
var r = `
    .dijitTreeContainer { background-color: #f9f9f9; padding: 10px; }
    .dijitTreeNode { padding: 5px 0; }
    .dijitTreeRowSelected { background-color: #e0f2ff; border-radius: 4px; }
    .dijitTreeIcon, .dijitTreeLabel { vertical-align: middle; }
    .dijitTreeLabel { color: #333; padding-left: 5px; cursor: pointer; }
    .dijitTreeRow:hover { background-color: #d1e0ee; }
    .dijitTreeContentExpanded { font-weight: bold; }
`;

// Append the additional styles to the style element
e.styleSheet ? e.styleSheet.cssText += r : e.textContent += r;

// Append the style element to the document head
document.head.appendChild(e);
