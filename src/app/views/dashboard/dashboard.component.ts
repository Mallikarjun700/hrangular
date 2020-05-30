import { Component, OnInit, ViewChild } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { CurdcommonserviceService, AuthenticationService } from '../../_services';
import { ChartComponent } from 'ng-apexcharts';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';



@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  public genderDiversityChartOptions: any;
  public employeeStatusChartOptions: any;
  public headCountChartOptions: any;
  public salaryChartOptions: any;

  public employeeDataList = [];
  public temp: Object = false;
  dtOptions: DataTables.Settings = {};

  constructor(private commonService: CurdcommonserviceService, private authenticationService: AuthenticationService) {
    setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
    this.genderDiversityChartOptions = {
        chart: {
            id: null,
            type: 'donut',
            height: 280,
            width: 240,
            animations: { enabled: false }
        },
        labels: ['Male', 'Female'],
        series: [44, 55],
        legend: {
            show: true,
            position: 'bottom',
        },
        dataLabels: {
            enabled: false,
        }
    };
    this.employeeStatusChartOptions = {
        chart: {
            id: null,
            height: 280,
            width: 240,
            type: 'donut',
            animations: { enabled: false }
        },
        labels: ['Active', 'In-Active', 'Permanent', 'Contract'],
        series: [25, 25, 25, 25],
        legend: {
            show: true,
            position: 'bottom',
        },
        dataLabels: {
            enabled: false,
        }
    };
    this.headCountChartOptions = {
        chart: {
            id: null,
            height: 280,
            width: 240,
            type: 'pie',
            animations: { enabled: false }
        },
        labels: ['Department', 'Location'],
        series: [75, 25],
        legend: {
            show: true,
            position: 'bottom',
        },
        dataLabels: {
            enabled: false,
        }
    };
    this.salaryChartOptions = {
        chart: {
            id: null, height: 300 , 
            width: 240, type: 'bar', 
            animations: { enabled: false }
        },
        plotOptions: {
            bar: {
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        series: [
          {
            name: 'No of Employees',
            data: [400, 430, 448, 470, 1200, 580, 690, 1100, 1200, 1380, 582, 55]
          },
          {
            name: 'Gross Earning',
            data: [400, 430, 448, 470, 1200, 580, 690, 1100, 1200, 1380, 582, 55]
          },
          {
            name: 'TDS',
            data: [400, 430, 448, 470, 1200, 580, 690, 1100, 1200, 1380, 582, 55]
          },
          {
            name: 'Gross Deduction',
            data: [400, 430, 448, 470, 1200, 580, 690, 1100, 1200, 1380, 582, 55]
          },
          {
            name: 'Net Pay',
            data: [400, 430, 448, 470, 1200, 580, 690, 1100, 1200, 1380, 582, 55]
          }
          
        ],
        xaxis: {
            type: 'category',
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        tooltip: {
            enabled: true,
        },
    };
  }
  

  getEmployeeList() {
    this.temp = false;
    this.commonService.get('employee/get', {})
      .subscribe(
        data => {
          setTimeout(() => {this.authenticationService.loaderEnd();}, 10);
          if (data.success) {
            this.employeeDataList = data.message;
            this.temp = true;
          }
        });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true
    };
    this.getEmployeeList();
  }
}
