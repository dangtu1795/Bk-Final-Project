import {Component, OnInit, HostListener} from '@angular/core';
import {AuthenticateService} from "../shared-services/authenticate.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  PlayerState =
    {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5
    };

  playerOptions = {
    'fs': 0,
    'modestbranding': 1,
    'showinfo': 1,
    'controls': 0,
    'autohide': 1,
    'autoplay': 1
  };
  // videoId1 = 'ftJYyevC6Us';
  // videoId2 = 'ftJYyevC6Us';

  videoId1 = 'Sd2S_dVOwq4';
  videoId2 = 'Sd2S_dVOwq4';
  player1;
  player2;

  playStateButton = "../../assets/images/play.png";

  constructor(private authen: AuthenticateService, private router: Router) {
  }

  ngOnInit() {
  }

  savePlayer(player, id) {
    if (id == this.PlayerState.PLAYING) {
      this.player1 = player;
    } else {
      this.player2 = player;
    }

    this.syncPlay(this.player1, this.player2);
  }

  onStateChange(event, id) {
    console.log(event.data);
    if (event.data == this.PlayerState.PAUSED) {
      this.playStateButton = "../../assets/images/play.png";
      this.player1.pauseVideo();
      this.player2.pauseVideo();
    } else if (event.data == this.PlayerState.PLAYING) {
      this.playStateButton = "../../assets/images/pause.png";
     this.syncPlay(this.player1, this.player2);
     this.player1.playVideo();
     this.player2.playVideo();
    }
  }

  syncPlay (player1, player2) {
    if(!player1 || !player2) {
      return;
    }
    console.log(player1.getCurrentTime(), player2.getCurrentTime())
    let player1CurrentTime = player1.getCurrentTime();
    let player2CurrentTime = player2.getCurrentTime();
    if (player1CurrentTime < player2CurrentTime) {
      player1.playVideo();
      setTimeout(() => {
        player2.playVideo();
        console.log(player1.getCurrentTime(), player2.getCurrentTime())
      }, 1000 * (player2CurrentTime - player1CurrentTime));
    } else {
      player2.playVideo();
      setTimeout(() => {
        player1.playVideo();
        console.log(player1.getCurrentTime(), player2.getCurrentTime())
      }, 1000 * (player1CurrentTime - player2CurrentTime));
    }
  }

  playFS(id) {
    let iframe;
    if (id == 1) {
      iframe = this.player1.getIframe();
    } else {
      iframe = this.player2.getIframe();
    }
    let requestfullscreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
    if (requestfullscreen) {
      requestfullscreen.bind(iframe)()
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

  funcRate(event) {
    console.log(event.target.value)
    let rate = event.target.value / 10;
    let containerWidth = $('.screen').width();
    if (event.target.value == 0) {
      $('.column1').width(0);
      $('.column2').width(containerWidth - 10)
    } else if (event.target.value == 10) {
      $('.column2').width(0);
      $('.column1').width(containerWidth)
    }
    else {
      $(".column1").width(rate * containerWidth - 5);
      $(".column2").width((1 - rate) * containerWidth - 5);
    }
  }

  funcResize() {
    $('#customRate').val(5);
    this.funcRate({target: {value: 5}})
  }

  logout() {
    this.authen.clear();
    this.router.navigateByUrl('/login')
  }

}
