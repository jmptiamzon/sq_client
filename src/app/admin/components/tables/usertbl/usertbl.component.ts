import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTable, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { GetsetService } from '../../services/getset.service';

export interface User {
  id: number;
  full_name: string;
  middlename: string;
  gender: string;
  age: string;
  email: boolean;
}

@Component({
  selector: 'app-usertbl',
  templateUrl: './usertbl.component.html',
  styleUrls: ['./usertbl.component.css']
})
export class UsertblComponent implements OnInit, OnDestroy {
  querySubscription: any;
  displayedColumns: string[] = ['fname', 'gender', 'age', 'email', 'created_at'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private getSet: GetsetService,
  ) {
    this.getSet.getUsers();

    this.querySubscription = this.getSet.changeTableValueUser.subscribe((res) => {
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

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
