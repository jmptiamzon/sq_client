import { OnInit, ViewChild, OnDestroy, Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { GetsetService } from '../services/getset.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddAdminComponent } from '../modals/add-admin/add-admin.component';
import { EditAdminComponent } from '../modals/edit-admin/edit-admin.component';

export interface Admin {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  username: string;
  status: boolean;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  querySubscription: any;
  currentUser: string;

  displayedColumns: string[] = ['id', 'name', 'username', 'status', 'actions'];
  dataSource = new MatTableDataSource<Admin>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private getSet: GetsetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.getSet.getData();

    this.querySubscription = this.getSet.changeTableValue.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.currentUser = localStorage.getItem('user');
    this.getSet.appTitle = 'User Management';
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  warn() {
    this.openSnackbar('Wag po ate / kuya!');
  }

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 2000,
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  adminDialog() {
    const dialogRef = this.dialog.open(AddAdminComponent, { disableClose: true });
  }

  editAdmin(id: number, fname: string, mname: string, lname: string, uname: string, status: boolean) {
    this.getSet.adminData = [id, fname, mname, lname, uname, status];
    const dialogRef = this.dialog.open(EditAdminComponent, { disableClose: true });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
