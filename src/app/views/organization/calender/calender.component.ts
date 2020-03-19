import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
// import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { AddeventComponent } from './addevent/addevent.component';
import { Router, ActivatedRoute } from '@angular/router';
import { CurdcommonserviceService,AuthenticationService } from '../../../_services';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  calendarOptions: any;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  // constructor(public dialog: MatDialog, private commonService: CurdcommonserviceService, private route: ActivatedRoute,
  //   private router: Router, public toastr: ToastrManager) { }
  constructor(private commonService: CurdcommonserviceService,private authenticationService: AuthenticationService, private route: ActivatedRoute,
    private router: Router, public toastr: ToastrManager) { }

  ngOnInit() {
    this.calendarOptions = {
      header: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      editable: true,
      events: [],
      plugins: [dayGridPlugin, interactionPlugin]
    };

  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.commonService.get('eventdata/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success && data.message) {
            let eventList = [];
            data.message.forEach((obj: any) => {
              console.log(obj);
              eventList.push({
                id: obj.id,
                url:'#/home/organization/calender/edit/'+obj.id,
                title: '$ICON ' + obj.title,
                start: obj.startdate,
                end: obj.enddate,
                groupId: obj.company_events_id,
                backgroundColor: '#6610f2',
                textColor: '#fff',
                icon: 'fa fa-birthday-cake'
              });
            });
            this.calendarOptions.events = (eventList);
          }
        });
  }
  eventRender(info: any) {
    console.log(info);
    info.el.innerHTML = info.el.innerHTML.replace('$ICON', "<i class='fa fa-birthday-cake'></i>");
    // info.find(".fc-title").prepend("<i class='fa fa-"+event.icon+"'></i>");
  }
  eventClick(info: any) {
    console.log(info);
  }
  /*openDialog(arg: any): void {
    const dialogRef = this.dialog.open(AddeventComponent, {
      height: '500px',
      width: '800px',
      data: { name: '', date: arg.dateStr }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }*/

}
