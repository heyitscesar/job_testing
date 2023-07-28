    const transparentDiv = document.createElement('div');
    transparentDiv.setAttribute('id', 'transparentDiv');
    document.body.insertBefore(transparentDiv, document.getElementById('root'));

    // Add the CSS styles for the transparent div
    const cssStyles = `
      #transparentDiv {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.33); /* Change the alpha value (0.5) to adjust transparency */
        z-index: 9999; /* Make sure it appears above other content */
      }
    `;

    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    if (styleElement.styleSheet) {
      styleElement.styleSheet.cssText = cssStyles; // For IE8 and below
    } else {
      styleElement.appendChild(document.createTextNode(cssStyles)); // For modern browsers
    }

    document.head.appendChild(styleElement);