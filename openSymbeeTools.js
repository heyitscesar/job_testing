//    "https://symbeeconnect.com/symbee-connect/ui/abgprod/prod",

const urls = [
    "https://g.loyalty-kognitiv.com/login?errorCode=sessionExpired",
    "https://ebc.cybersource.com/ebc2/",
    "https://callcentre-loyalty.abg.loyalty-kognitiv.com/login?errorCode=sessionExpired",
    "https://tellmeapp.azurewebsites.net/Auth/Login?",
    "https://www.abgvoice.com/xvr/login.mvc",
    "https://chromewebstore.google.com/detail/text-blaze-templates-and/idgadaccgipmpannjkmfddolnnhmeklj?pli=1",
    "https://wfo.mt5.verintcloudservices.com/wfo/control/signin?rd=%2Fwfo%2Fcontrol%2Fshowadherence",
];

// Function to open each URL in a new tab
function openTabs(urls) {
    urls.forEach(url => {
        window.open(url, '_blank');
    });
}

// Call the function to open tabs with the URLs
openTabs(urls);
