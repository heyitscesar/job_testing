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

    /* Hide the scrollbar for all elements */
    ::-webkit-scrollbar {
      width: 0; /* For Safari and Chrome */
    }

    /* Optional - For Firefox */
    scrollbar-width: none;

    /* Optional - For Internet Explorer and Edge */
    -ms-overflow-style: none;

    /* Optional - To hide scrollbar thumb on older versions of Firefox */
    ::-webkit-scrollbar-thumb {
      background-color: transparent;
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

const deviationNavElements = document.querySelectorAll('[data-hook="deviation_nav"]');
    for (let i = 0; i < deviationNavElements.length; i++) {
      const parentElement = deviationNavElements[i].parentNode;
      parentElement.style.visibility = "hidden";
    }

const headerElements = document.getElementsByTagName("header");
    for (let i = 0; i < headerElements.length; i++) {
      headerElements[i].style.visibility = "hidden";
    }


/*AnniMate*/

    // Function to animate scroll down one page
    function smoothScrollDownOnePage() {
      const startScroll = window.pageYOffset;
      const endScroll = startScroll + window.innerHeight;
      let currentTime = 0;

      function scrollStep(timestamp) { const time = 1000 * 3.3;
        if (!currentTime) currentTime = timestamp;
        const progress = timestamp - currentTime;
        const scrollAmount = easeInOutQuad(progress, startScroll, endScroll - startScroll, time ); // 1000ms duration for the animation

        window.scrollTo(0, scrollAmount);

        if (progress < 1000) {
          window.requestAnimationFrame(scrollStep);
        }
      }

      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      window.requestAnimationFrame(scrollStep);
    }

    // Scroll down one page initially
    document.body.style.overflow = "hidden";
    smoothScrollDownOnePage();

    // Scroll down one page every 15 minutes (900000 milliseconds)
    setInterval(smoothScrollDownOnePage, 900000);

