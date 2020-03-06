import { Component, OnInit, ViewChild  } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddeventComponent } from './addevent/addevent.component';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  calendarOptions: any;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
     this.calendarOptions = {
      editable: true,
      plugins: [dayGridPlugin, interactionPlugin]
    };
  }

  openDialog(arg: any): void {
    const dialogRef = this.dialog.open(AddeventComponent, {
      width: '400px',
      data: {name: 'test', date: arg.dateStr}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
