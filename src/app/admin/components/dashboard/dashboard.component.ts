import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatTableDataSource, MatTable, MatPaginator, MatSort } from '@angular/material';
import { BackendService } from '../services/backend.service';
import * as CanvasJS from '../../../../assets/js/canvasjs.min.js';

export interface Log {
  id: number;
  user: string;
  msg_log: string;
  user_type: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  querySubscription: any;
  userCount: number;
  adminCount: number;
  dbDate: string;
  appStatus: string;

  displayedColumns: string[] = ['id', 'user', 'msg', 'timestamp'];
  dataSource = new MatTableDataSource<Log>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private getSet: GetsetService,
    private backendService: BackendService,
  ) {
    this.getSet.getUserLogs();

    this.querySubscription = this.getSet.changeTableValueLog.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.querySubscription = this.backendService.getUserCount().subscribe((res) => {
      this.userCount = res["data"][0].count;
    });

    this.querySubscription = this.backendService.getAdminCount().subscribe((res) => {
      this.adminCount = res["data"][0].count;
    });

    this.querySubscription = this.backendService.getAppStatus().subscribe((res) => {
      this.appStatus = Number(res["data"][0].status) === 1 ? 'Online' : 'Offline';
    });

    this.querySubscription = this.backendService.getDbUpdate().subscribe((res) => {
      this.dbDate = new Date(res["data"][0].updated_at).toLocaleDateString('en-us');
    });

    this.getSet.appTitle = 'Dashboard';
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Visitors per Month'
      },
      data: [{
        type: 'column',
        dataPoints : [
          {label: 'January', y: 79},
          {label: 'February', y: 60},
          {label: 'March', y: 71},
          {label: 'April', y: 50},
          {label: 'May', y: 100},
          {label: 'June', y: 25},
          {label: 'July', y: 60},
          {label: 'August', y: 75},
          {label: 'September', y: 69},
          {label: 'October', y: 102},
          {label: 'November', y: 24},
          {label: 'December', y: 60},
        ],
      }]
    });

    chart.render();

    const chart2 = new CanvasJS.Chart('chartContainer2', {
      theme: 'light1',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Course Suggestions'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: {y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: 450, name: 'Computer Science' },
          { y: 120, name: 'Information Technology' },
          { y: 300, name: 'Computer Engineering' },
          { y: 800, name: 'Psychology' },
          { y: 150, name: 'Law' },
          { y: 150, name: 'Philosophy' },
          { y: 250, name: 'Education' }
        ]
      }]
    });

    chart2.render();

    const chart3 = new CanvasJS.Chart('chartContainer3', {
      theme: 'light1',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Schools Chosen'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: {y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: 300, name: 'FEU Institute of Technology' },
          { y: 150, name: 'FEU Manila' },
          { y: 350, name: 'De La Salle University' },
          { y: 800, name: 'Polytechnic University of the Philippines' },
          { y: 100, name: 'University of the Philippines Diliman' },
          { y: 350, name: 'University of Santo Thomas' },
          { y: 100, name: 'Ateneo De Manila University' }
        ]
      }]
    });

    chart3.render();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
