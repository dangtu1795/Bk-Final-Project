import {Component, OnInit, HostListener} from '@angular/core';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  mouseEvent;
  PlayerState =
    {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
    };

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.mouseEvent = e;
  }

  containerWidth;
  playerOptions = {
    'fs': 0,
    'modestbranding': 1,
    'showinfo': 1,
    'controls': 0,
    'autohide': 1,
    'autoplay': 1
  };
  videoId1 = 'ftJYyevC6Us';
  videoId2 = 'ftJYyevC6Us';
  player1;
  player2;

  playStateButton = "../../assets/images/play.png";

  constructor() {
  }

  ngOnInit() {
  }

  savePlayer(player, id) {
    if (id == this.PlayerState.PLAYING) {
      this.player1 = player;
    } else {
      this.player2 = player;
    }
  }

  onStateChange(event, id) {
    if (event.data == this.PlayerState.PAUSED) {
      this.playStateButton = "../../assets/images/play.png";
      this.player1.pauseVideo();
      this.player2.pauseVideo();
    } else if (event.data == this.PlayerState.PLAYING) {
      if(!this.player1 || !this.player2) {
        console.log("return........")
        return
      }
      this.playStateButton = "../../assets/images/pause.png";
      let player1CurrentTime = this.player1.getCurrentTime();
      let player2CurrentTime = this.player2.getCurrentTime();
      if (player1CurrentTime < player2CurrentTime) {
        this.player1.playVideo();
        setTimeout(() => {
          this.player2.playVideo()
        }, 1000 * (player2CurrentTime - player1CurrentTime));
      } else {
        this.player2.playVideo();
        setTimeout(() => {
          this.player1.playVideo()
        }, 1000 * (player1CurrentTime - player2CurrentTime));
      }
    }
  }

  playFS(id) {
    console.log("playing fullscreen: ", id)
    if (id == this.PlayerState.PLAYING) {
      this.player2.setPlaybackQuality('small')
    } else {
      this.player1.setPlaybackQuality('small')
    }
  }

  togglePlay() {
    if (this.player1.getPlayerState() == this.PlayerState.PLAYING) {
      this.player1.pauseVideo();

    } else {
      this.player1.playVideo();
    }
  }

  changeProgress(event) {
    this.player1.pauseVideo();
    this.player2.pauseVideo();
    let percent = event.target.value;
    let total = this.player1.getDuration();
    this.player1.seekTo(total * percent / 100);
    this.player2.seekTo(total * percent / 100);
    setTimeout(() => {
      this.player1.playVideo();
      this.player2.playVideo();
    }, 1000)
  }

}
