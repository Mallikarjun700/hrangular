import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {
public data = [
      {name: 'therichpost1', email: 'therichpost1@gmail.com'},
      {name: 'therichpost2', email: 'therichpost2@gmail.com'},
      {name: 'therichpost3', email: 'therichpost3@gmail.com'},
      {name: 'therichpost4', email: 'therichpost4@gmail.com'},
  ];
  dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit() {
this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
