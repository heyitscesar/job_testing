function checkElapsedTime() {
    // Get the current time text from .intInfoElapsedTime
    var elapsedTime = $(".intInfoElapsedTime").text();

    // If the time reaches 00:10:00, trigger a click on .intBtnEnd
    if (elapsedTime === "00:10:00" || elapsedTime === "00:10:01") {
        $(".intBtnEnd").trigger("click");
    }
}


function update() { checkElapsedTime();
  var thresholds = [3, 8, 12, 16, 20];
  var colors = ['#2ECC71', '#1ABC9C', '#3498DB', '#F1C40F', '#F39C12'];
  // Color palette inspired by Quetzalcoatl:
  // Green: #2ECC71
  // Turquoise: #1ABC9C
  // Blue: #3498DB
  // Yellow: #F1C40F
  // Orange: #F39C12
  
  // Parse customDataValue text 
  $(".intInfoElapsedTimeLabel").text($("#workstate_text_label").text());

  var customDataValue = $(".customDataValue").text();
    var keywords = ["Avis", "Budget", "Payless"];

    var foundKeyword = keywords.find(function(keyword) {
        return customDataValue.match(new RegExp(keyword, "i"));
    });
  
   var  result = foundKeyword || customDataValue;
    //$(".customDataValue").text(result);
    console.log(result);
  

  $(".intInfoStateText").html(result);
  $(".intInfoStateText").css("text-transform", "uppercase");

  $(".intInfoState").css("font-size", "4em");
  $("body").css("overflow","hidden");
  $(".intInfoElapsedTime").css({
    "font-size": "4em",
    "transition-duration": "60s",
    "color": function() {
      var value = parseInt($(this).html().split(":")[1]);
      var color;
      
      for (var i = 0; i < thresholds.length; i++) {
        if (value < thresholds[i]) {
          color = colors[i];
          break;
        }
      }

      return color || colors[colors.length - 1];
    }
  });
  $("#view_port").css("border", "0px solid #ccc");
} update();
setInterval(update, 1 * 1000);
