import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticateService} from "../../shared-services/authenticate.service";
import {Router} from "@angular/router";
import {UserService} from "../../shared-services/api/user.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-watch-lecture',
  templateUrl: './watch-lecture.component.html',
  styleUrls: ['./watch-lecture.component.css']
})
export class WatchLectureComponent implements OnInit, OnDestroy  {

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

  videoId1 = 'sKIbH-gXmX0';
  videoId2 = 'sKIbH-gXmX0';
  player1;
  player2;
  current = 0;
  step: Subject<any> = new Subject();
  isRunning = true;
  isEnded = false;
  MAX_DELAY = 1;

  playStateButton = "../../assets/images/play.png";

  constructor(private authen: AuthenticateService, private router: Router, private userService: UserService) { }

 async ngOnInit() {
    let res = await this.userService.getLecture();
    this.videoId1 = res.data.videoUrl;
    this.videoId2 = res.data.slideUrl;
    if (this.authen.account.role !== 'student') {
      this.router.navigateByUrl('/master')
    }

    this.step.subscribe(data => {
      console.log('data: ', data);
      if (data > 0) {
        setInterval(() => {
          if (!this.isRunning) {
            return;
          }
          this.current++;
          console.log("current: ", this.current, "step: ", data);
          $('#custom-progress').val(this.current);
        }, data);
      }
    });

  }
  savePlayer(player, id) {
    if (id == 1) {
      this.player1 = player;
      this.player1.loadVideoById(this.videoId1);
      let duration = this.player1.getDuration();
      this.step.next(10 * duration);

    } else {
      this.player2 = player;
      this.player2.loadVideoById(this.videoId2);
      this.player2.mute();
    }

    this.syncPlay();
  }

  syncStep = 0;
  maxStep = 50;

  onStateChange(event) {
    if (event.data == this.PlayerState.PAUSED) {
      this.isRunning = false;
      this.playStateButton = "../../assets/images/play.png";
      this.syncStep = 0;
      this.player1.pauseVideo();
      this.player2.pauseVideo();
    } else if (event.data == this.PlayerState.PLAYING) {
      this.isRunning = true;
      this.playStateButton = "../../assets/images/pause.png";
      if (this.isEnded) {
        this.current = 0;
        this.isEnded = false;
      }

      let diff = Math.abs(this.player1.getCurrentTime() - this.player2.getCurrentTime());
      console.log('diff: ', diff);
      if (diff > this.MAX_DELAY && this.syncStep < this.maxStep) {
        this.syncStep++;
        console.log('sync step: ', this.syncStep);
        console.log('in sync...............');
        this.syncPlay();
      }
      this.player1.playVideo();
      this.player2.playVideo();
    } else if (event.data == this.PlayerState.ENDED) {
      this.playStateButton = "../../assets/images/play.png";
      this.isRunning = false;
      this.player1.stopVideo();
      this.player2.stopVideo();
      this.isEnded = true;
    }
  }

  syncPlay() {
    if (!this.player1 || !this.player2) {
      console.log('returning...........');
      return;
    }
    let player1CurrentTime = this.player1.getCurrentTime();
    let player2CurrentTime = this.player2.getCurrentTime();

    if (player1CurrentTime < player2CurrentTime) {
      this.player1.seekTo(player2CurrentTime);
    } else {
      this.player2.seekTo(player1CurrentTime)
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
    this.current = percent;
    let total = this.player1.getDuration();
    this.player1.seekTo(total * percent / 100);
    this.player2.seekTo(total * percent / 100);
    setTimeout(() => {
      this.player1.playVideo();
      this.player2.playVideo();
    }, 1000)
  }

  funcRate(event) {
    console.log(event.target.value);
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

  ngOnDestroy() {
    this.step.unsubscribe();
  }

}
