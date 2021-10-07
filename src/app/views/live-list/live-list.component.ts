import { LiveService } from './../../shared/service/live.service';
import { Component, OnInit } from '@angular/core';
import { Live } from 'src/app/shared/model/live.model';

@Component({
  selector: 'app-live-list',
  templateUrl: './live-list.component.html',
  styleUrls: ['./live-list.component.css']
})
export class LiveListComponent implements OnInit {

  livesPrevious: Live[] = [];

  constructor(public liveService: LiveService) { }

  ngOnInit(): void {
    this.getLives();
  }

  getLives(){
    this.liveService.getLiveWithFlag('previous').subscribe(data => {
      console.log(data);
      this.livesPrevious = data.content;
    });
  }

}
