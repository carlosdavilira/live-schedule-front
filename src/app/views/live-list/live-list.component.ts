import { LiveService } from './../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';
import { DomSanitizer } from '@angular/platform-browser';
import {MatChipsModule} from '@angular/material/chips';


@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  public livesPrevious: Live[] = [];
  public livesNext: Live[] = [];


  constructor(public liveService: LiveService, public sanitizer:DomSanitizer ) { }

  ngOnInit(): void {
    this.getLives();
  }

  getLives(){
    this.liveService.getLiveWithFlag('previous').subscribe(data => {
      console.log(data);
      this.livesPrevious = data.content;
      this.livesPrevious.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink.replace("watch?v=", "embed/"));
      })
    });
    this.liveService.getLiveWithFlag('next').subscribe(data => {
      console.log(data);
      this.livesNext = data.content;
      this.livesNext.forEach(live => {
        live.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(live.liveLink.replace("watch?v=", "embed/"));
      })

    });
  }

}
