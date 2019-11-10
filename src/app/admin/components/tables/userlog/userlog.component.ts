import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatSort } from '@angular/material';
import { GetsetService } from '../../services/getset.service';

export interface LogTbl {
  id: number;
  user: string;
  msg_log: string;
  user_type: boolean;
}

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent implements OnInit {
  querySubscription: any;
  displayedColumns: string[] = ['id', 'user', 'msg', 'timestamp'];
  dataSource = new MatTableDataSource<LogTbl>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private getSet: GetsetService,
  ) {
    this.getSet.getUserLogs2(1);

    this.querySubscription = this.getSet.changeTableValueLog2.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

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

}
