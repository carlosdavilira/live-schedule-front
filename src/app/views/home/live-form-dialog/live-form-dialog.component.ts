import { LiveService } from './../../../shared/service/live.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-live-form-dialog',
  templateUrl: './live-form-dialog.component.html',
  styleUrls: ['./live-form-dialog.component.css']
})
export class LiveFormDialogComponent implements OnInit {
  public liveForm: FormGroup;
  @ViewChild('time') time:ElementRef;

  constructor(
    public dialogRef: MatDialogRef<LiveFormDialogComponent>,
    public fb: FormBuilder,
    private rest: LiveService
    ) { }

  ngOnInit(): void {
    this.liveForm = this.fb.group(this.fillLiveForm());
  }

  private fillLiveForm(){
    return {
      liveName: ['', [Validators.required]],
      channelName: ['', [Validators.required]],
      liveLink: ['', [Validators.required]],
      liveDate: ['', [Validators.required]],
      liveTime: ['', []]
        }
  }

  cancelDialog(): void {
    this.liveForm.reset();
    this.dialogRef.close();
  }

  processTime(){
    let newDate:moment.Moment = moment.utc(this.liveForm.value.liveDate).local();
    this.liveForm.value.liveDate = newDate.format("YYYY-MM-DD") + "T" + this.time.nativeElement.value;
    this.liveForm.removeControl('liveTime');
  }

  public createLive(){
    this.processTime();
    this.rest.postLives(this.liveForm.value).subscribe(result => {});
    this.cancelDialog();
  }
}
