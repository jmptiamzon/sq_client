import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatTableDataSource, MatTable, MatPaginator, MatSort } from '@angular/material';

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

  displayedColumns: string[] = ['id', 'user', 'msg', 'timestamp'];
  dataSource = new MatTableDataSource<Log>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private getSet: GetsetService,
  ) {
    this.getSet.getUserLogs();

    this.querySubscription = this.getSet.changeTableValueLog.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.getSet.appTitle = 'Dashboard';
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
