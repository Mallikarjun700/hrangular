import { Component, OnInit,ViewChild  } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarPlugins = [dayGridPlugin];
  calendarEvents = [
    { title: 'event 1', date: '2020-03-01' }
  ];
  constructor() { }

  ngOnInit() {

  }

  handleDateClick(arg: any) {
    console.log(arg.dateStr);
    this.calendarEvents.push(
      { title: 'event 2', date: '2020-03-02' }
    );
  }

  modifyTitle(eventIndex: any, newTitle: any) {
    this.calendarEvents[eventIndex].title = newTitle;
  }

}
