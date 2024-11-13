// Function to generate a random interval between 7 and 10 minutes
function getRandomInterval() {
    var min = 7 * 60 * 1000; // 7 minutes in milliseconds
    var max = 10 * 60 * 1000; // 10 minutes in milliseconds
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var timer;

// Function to start and reset the timer with a random interval
function startTimer() {
    // Clear any existing timer to reset it
    clearInterval(timer);

    // Get a new random interval between 7 and 10 minutes
    var timerInterval = getRandomInterval();

    // Set a new timer with the random interval
    timer = setInterval(function() {
        $(".intBtnEnd").trigger("click");
    }, timerInterval);
}

// Function to trigger click and reset the timer when the button is clicked
function handleButtonClick() {
    $(".intBtnEnd").trigger("click");
    startTimer();
}

// Start the timer initially
startTimer();

// Set up an event listener to reset the timer whenever the button is clicked
$(".intBtnEnd").on("click", startTimer);

// Your existing update function
function update() { 
    var thresholds = [3, 8, 12, 16, 20];
    var colors = ['#2ECC71', '#1ABC9C', '#3498DB', '#F1C40F', '#F39C12'];

    $(".intInfoElapsedTimeLabel").text($("#workstate_text_label").text());

    var customDataValue = $(".customDataValue").text();
    var keywords = ["Avis", "Budget", "Payless"];
    var foundKeyword = keywords.find(function(keyword) {
        return customDataValue.match(new RegExp(keyword, "i"));
    });

    var result = foundKeyword || customDataValue;
    console.log(result);

    $(".intInfoStateText").html(result);
    $(".intInfoStateText").css("text-transform", "uppercase");

    $(".intInfoState").css("font-size", "4em");
    $("body").css("overflow", "hidden");
    $(".intInfoElapsedTime").css({
        "font-size": "4em",
        "transition-duration": "60s",
        "color": function()
