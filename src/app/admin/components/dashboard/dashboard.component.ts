import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatTableDataSource, MatTable, MatPaginator, MatSort, yearsPerPage } from '@angular/material';
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
  yearsVisitor = [];

  displayedColumns: string[] = ['id', 'user', 'msg', 'timestamp'];
  dataSource = new MatTableDataSource<Log>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private getSet: GetsetService,
    private backendService: BackendService,
  ) {
    this.getSet.getUserLogs(0);

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

    this.visitorChart(new Date().getFullYear().toString());
    this.schoolChart(new Date().getFullYear().toString());
    this.courseChart(new Date().getFullYear().toString());
    this.conversionRateChart(new Date().getFullYear().toString());
    this.surveyChart(new Date().getFullYear().toString());
    this.surveyChart2(new Date().getFullYear().toString());
  }

  visitorChart(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getVisitors(selectedYear).subscribe((res) => {
      const temp = [];
      const dpointVisitor = [];
      const tempYear = new Set();
      let dateStr: string;
      const monthNameList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      // tslint:disable-next-line: only-arrow-functions
      res["data"].forEach(function(x) {
        tempYear.add(Number(new Date(x.created_at).getFullYear()));
        dateStr = new Date(x.created_at).toLocaleString('default', { month: 'long' });
        temp[dateStr] = (temp[dateStr] || 0) + 1;
      });

      this.yearsVisitor = Array.from(tempYear);

      monthNameList.forEach(element => {
        dpointVisitor.push({y: (temp[element] || 0) , label: element });
      });

      const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Visitors per Month (' + selectedYear + ')'
        },
        data: [{
          type: 'column',
          dataPoints : dpointVisitor
        }]
      });

      chart.render();
    });
  }

  schoolChart(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getSuggestedCourse(selectedYear).subscribe((res) => {
      const temp = [];
      const dpointCourse = [];

      // tslint:disable-next-line: only-arrow-functions
      res["data"].forEach(function(x) {
        temp[x.course_name] = (temp[x.course_name] || 0) + 1;
      });

      // tslint:disable-next-line: forin
      for (const key in temp) {
        dpointCourse.push({y: temp[key], name: key});
      }

      const chart2 = new CanvasJS.Chart('chartContainer2', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Course Suggestions (' + selectedYear + ')'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: dpointCourse
        }]
      });

      chart2.render();
    });
  }

  courseChart(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getChosenSchool(selectedYear).subscribe((res) => {
      const temp = [];
      const dpointSchool = [];

      // tslint:disable-next-line: only-arrow-functions
      res["data"].forEach(function(x) {
        temp[x.school_name] = (temp[x.school_name] || 0) + 1;
      });

      // tslint:disable-next-line: forin
      for (const key in temp) {
        dpointSchool.push({y: temp[key], name: key});
      }

      const chart3 = new CanvasJS.Chart('chartContainer3', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Schools Chosen (' + selectedYear + ')'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: dpointSchool
        }]
      });

      chart3.render();
    });
  }

  conversionRateChart(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getConversionCount(selectedYear).subscribe((res) => {
      const dpointConversion = [];
      let conversion: any;
      let temp = 0;

      conversion = (res["data"][0].tbl2 / res["data"][0].tbl1) * 100;

      if (conversion > 100) {
        temp = Math.abs(conversion - 100);
        dpointConversion.push({y: conversion - temp, name: 'Visitors who did not finish the assessment.'});
        dpointConversion.push({y: temp, name: 'Visitors who finished the assessment.'});

      } else {
        dpointConversion.push({y: conversion, name: 'Visitors who did not finish the assessment.'});

        if ((100 - conversion) !== 0) {
          dpointConversion.push({y: 100 - conversion, name: 'Visitors who finished the assessment.'});
        }
      }

      const chart4 = new CanvasJS.Chart('chartContainer4', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Visitor Conversion Rate (' + selectedYear + ')'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: dpointConversion
        }]
      });

      chart4.render();
    });
  }

  surveyChart(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getSurvey(selectedYear).subscribe((res) => {
      const temp = [];
      const dpointSchool = [];

      // tslint:disable-next-line: only-arrow-functions
      res["data"].forEach(function(x) {
        temp[x.school_name] = (temp[x.school_name] || 0) + 1;
      });

      // tslint:disable-next-line: forin
      for (const key in temp) {
        dpointSchool.push({y: temp[key], name: key});
      }

      const chart5 = new CanvasJS.Chart('chartContainer5', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Where assessment takers enrolled (' + selectedYear + ')'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: dpointSchool
        }]
      });

      chart5.render();
    });
  }

  surveyChart2(year: any) {
    const selectedYear = year.value ? year.value : year;

    this.querySubscription = this.backendService.getSurvey(selectedYear).subscribe((res) => {
      const temp = [];
      const dpointCourse = [];

      // tslint:disable-next-line: only-arrow-functions
      res["data"].forEach(function(x) {
        temp[x.course_name] = (temp[x.course_name] || 0) + 1;
      });

      // tslint:disable-next-line: forin
      for (const key in temp) {
        dpointCourse.push({y: temp[key], name: key});
      }

      const chart6 = new CanvasJS.Chart('chartContainer6', {
        theme: 'light1',
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: 'Course assessment takers took (' + selectedYear + ')'
        },
        data: [{
          type: 'pie',
          showInLegend: true,
          toolTipContent: '<b>{name}</b>: {y} (#percent%)',
          indexLabel: '{name} - #percent%',
          dataPoints: dpointCourse
        }]
      });

      chart6.render();
    });
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
