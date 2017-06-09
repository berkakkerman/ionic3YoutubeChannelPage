import {Component} from '@angular/core';
import {Modal, NavController, Alert} from 'ionic-angular';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

//import {YoutubeService} from '../../providers/youtube-service/youtube-service';

@Component({
  templateUrl: 'home.html',
  providers:[]
})
export class HomePage {
  data:any;
  title:any;
  channelID: string = 'UCtb8P4rf_1n8KS8eZk_lNNw';
  maxResults: string = '10';
  pageToken: string; 
  googleToken: string = 'Your api key';
  searchQuery: string = '';
  posts: any = [];
  onPlaying: boolean = false; 

  constructor(public http: Http, public nav:NavController, private youtube: YoutubeVideoPlayer) {
    this.loadSettings();
  }
/*
  launchYTPlayer(id, title): void {
    this.ytPlayer.launchPlayer(id, title);
  }
*/
  fetchData() {
    return new Promise(resolve=>{
       let url = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&channelId=' + this.channelID + '&q=' + this.searchQuery + '&type=video&order=viewCount&maxResults=' + this.maxResults + '&key=' + this.googleToken;

    if(this.pageToken) {
      url += '&pageToken=' + this.pageToken;
    }
    console.log(url);
      this.http.get(url).map(res => res.json()).subscribe(data => { 
        this.title= data.items[0].snippet.channelTitle;
        this.data=data.items;
        console.log(data);
        
        console.log(this.data);
        
        resolve(this.data); 
      });
    });
  }
  loadSettings(): void {
      this.fetchData();
  }
  openSettings(): void {
      console.log("TODO: Implement openSettings()");
  }
  playVideo(e, post): void {
      console.log(post);
      this.onPlaying = true;
      this.youtube.openVideo(post.id.videoId);
      //this.ytPlayer.launchPlayer(post.id, post.snippet.title);
  }
  loadMore(): void {
      console.log("TODO: Implement loadMore()");
  }
}
