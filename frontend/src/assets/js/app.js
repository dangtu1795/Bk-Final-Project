var videoId1 = "Av8XpCoF3T0";
var videoId2 = "Av8XpCoF3T0";

var player1 = null;
var player2 = null;

var readyTimePlayer1 = null;
var readyTimePlayer2 = null;

var delay = null;
var duration = null;
var roomId = 1;
var serverIp = "http://192.168.2.85:8080";

$(document).ready(function () {
  var moveEvent;
  $(document).mousemove(function (e) {
    moveEvent = e;
  });

  var containerWidth = $("#content").width();
  $("#video1Div").resizable({
    resize: function (event, ui) {
      var currentWidth = ui.size.width;
      var padding = 60;
      $(this).width(currentWidth);
      $("#video2Div").width(containerWidth - currentWidth - padding);
    }
  });
  //$("#video1Div").draggable({cursor: "crosshair"});

  $("#video2Div").resizable({
    handles: "s, sw",
    resize: function (event, ui) {
      var currentWidth = ui.size.width;
      var padding = 60;
      $(this).width(currentWidth);
      $(this).css("left", "0px");
      $("#video1Div").width(containerWidth - currentWidth - padding);
    }
  });
  //$("#video2Div").draggable({cursor: "crosshair"});


  // $.ajax({
  //   url: serverIp + "/room?roomId=" + roomId,
  //   type: 'GET',
  //   success: function (res) {
  //     videoId1 = res.youtubeURL;
  //     videoId2 = res.youtubeURL2;
  //     //connect();
  //   }
  // });

  // 2. This code loads the IFrame Player API code asynchronously.
  // var tag = document.createElement('script');
  // tag.src = "https://www.youtube.com/iframe_api";
  // var firstScriptTag = document.getElementsByTagName('script')[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  // window.onYouTubeIframeAPIReady = function () {
  //   player1 = new YT.Player('player1', {
  //     height: '100%',
  //     width: '100%',
  //     videoId: videoId1,
  //     playerVars: {
  //       'fs': 0,
  //       'modestbranding': 1,
  //       'controls': 0,
  //       'autohide': 1,
  //       'autoplay': 1
  //
  //     },
  //     events: {
  //       'onReady': onPlayer1Ready,
  //       'onStateChange': onPlayer1StateChange
  //     }
  //   });
    player2 = new YT.Player('player2', {
      height: '100%',
      width: '100%',
      videoId: videoId2,
      playerVars: {
        'fs': 1,
        'modestbranding': 1,
        'controls': 0,
        'autohide': 1,
        'autoplay': 1
      },
      events: {
        'onReady': onPlayer2Ready,
        'onStateChange': onPlayer2StateChange
      }
    });
  };

  // 4. The API will call qthis function when the video player is ready.
  function onPlayer1StateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      if (delay == null) {
        readyTimePlayer1 = player1.getCurrentTime();
        sync2Player();
      }
      $("#playButton").attr("src", "../assets/images/pause.png");

      player2.playVideo();
    } else if (event.data == YT.PlayerState.PAUSED) {
      $("#playButton").attr("src", "../assets/images/play.png");

      player2.pauseVideo();
    } else if (event.data == YT.PlayerState.ENDED) {
      player2.stopVideo();
    }
  }

  function onPlayer2StateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      if (delay == null) {
        readyTimePlayer2 = player2.getCurrentTime();
        sync2Player();
      }
      player1.playVideo();
    } else if (event.data == YT.PlayerState.PAUSED) {
      player1.pauseVideo();
    } else if (event.data == YT.PlayerState.ENDED) {
      player1.stopVideo();
    }
  }

  function onPlayer1Ready(event) {
    $("#video1FullscreenButton").click(function () {
      playFullscreen(player1, $("#player1")[0])
    });
  }

  function onPlayer2Ready(event) {
    $("#video2FullscreenButton").click(function () {
      playFullscreen(player2, $("#player2")[0])
    });
    player2.mute();
  }

  var videoTime = 0;
  var timeUpdater = null;
  var pauseInterval = false;

  function sync2Player() {
    if (readyTimePlayer1 != null && readyTimePlayer2 != null) {
      delay = readyTimePlayer1 - readyTimePlayer2;

      function updateSeekBar() {
        $("#customSeekBar").val((player1.getCurrentTime() / duration) * 100);
      }

      function updateTime() {
        if (pauseInterval) {
          return;
        }
        var playerTotalTime = player1.getDuration();
        var oldTime = videoTime;
        if (player1 && player1.getCurrentTime) {
          videoTime = player1.getCurrentTime();
          if (!duration) {
            duration = player1.getCurrentTime();
          } else {
            duration += 1;
          }
        }
        if (videoTime !== oldTime) {
          updateSeekBar();
          if (Math.abs(player1.getCurrentTime() - delay - player2.getCurrentTime()) > 1) {
            player2.seekTo(player1.getCurrentTime() - delay);
            player2.playVideo();
          }
        }
      }

      timeUpdater = setInterval(updateTime, 1000);
    }
  }

  $("#customSeekBar").on("change", function () {
    pauseInterval = true;
    player1.seekTo($(this).val() / 100.0 * duration);
    player1.playVideo();
    pauseInterval = false;
  });

  $("#playButton").click(function () {
    $(".ytp-title").hide()
    if (player1.getPlayerState() == 1 && player2.getPlayerState() == 1) {
      player1.pauseVideo();
    }
    else {
      player1.playVideo();
    }
  });

  function playFullscreen(player, iframe) {
    var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestFullScreen) {
      requestFullScreen.bind(iframe)();
      if (player == player1) {
        console.log(
          "player2 change")
        player2.setPlaybackQuality("tiny");
      }
      if (player == player2) {

        player1.setPlaybackQuality("tiny");
      }
    }
  }

  function changeHandler(e) {
    var fullScreenElement =
      document.fullscreenElement ||
      document.msFullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement;
    // Mode has changed.
    if (!fullScreenElement || fullScreenElement == null) {
      player1.setPlaybackQuality("default");
      player2.setPlaybackQuality("default");
    }
  }

  document.addEventListener("fullscreenchange", changeHandler, false);
  document.addEventListener("webkitfullscreenchange", changeHandler, false);
  document.addEventListener("mozfullscreenchange", changeHandler, false);

});


var containerWidth = $("#content").width();
function funcResize(num) {
  var currentWidth;
  var padding = containerWidth * 2 / 100;
  if (num == 1) {
    currentWidth = containerWidth / 2 - padding;
    $("#customRate").val(5);
    $("#video1Div").height(500);
    $("#video2Div").height(500);
  }

  if (num == 2) currentWidth = containerWidth * 6 / 10 - padding;
  if (num == 3) currentWidth = containerWidth * 8 / 10 - padding;
  if (num == 4) currentWidth = containerWidth * 4 / 10 - padding;
  if (num == 5) currentWidth = containerWidth * 2 / 10 - padding;

  $("#video1Div").width(currentWidth);

  $("#video2Div").width(containerWidth - currentWidth - padding);
}
function funcRate() {
  var padding = containerWidth * 2 / 100;

  var rateCurrent = $("#customRate").val() * containerWidth / 10 - padding;
  if (rateCurrent < 0) {
    rateCurrent = 0;
  }
  if (rateCurrent == containerWidth - padding) {
    rateCurrent = containerWidth - padding;
  }
  $("#video1Div").width(rateCurrent);
  $("#video2Div").width(containerWidth - rateCurrent - padding);

  $("#video1Div").height(500);
  $("#video2Div").height(500);

  var heightvideo = 500;

  if (rateCurrent < containerWidth / 2) {
    $("#video1Div").height(heightvideo * $("#customRate").val() / 5);
  }
  else {
    var valueHeight = 10 - $("#customRate").val();
    $("#video2Div").height(heightvideo * valueHeight / 5);
  }
}






