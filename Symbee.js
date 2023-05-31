function update() {
  var thresholds = [3, 8, 12, 16, 20];
  var colors = ['#2ECC71', '#1ABC9C', '#3498DB', '#F1C40F', '#F39C12'];
  // Color palette inspired by Quetzalcoatl:
  // Green: #2ECC71
  // Turquoise: #1ABC9C
  // Blue: #3498DB
  // Yellow: #F1C40F
  // Orange: #F39C12

  $(".intInfoStateText").html($(".customDataValue").eq(1).html());
  $(".intInfoState").css("font-size", "3em");
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
}
setInterval(update, 3 * 1000);