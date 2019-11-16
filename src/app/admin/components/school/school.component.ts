import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatTableDataSource, MatTable, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { AddSchoolComponent } from '../modals/add-school/add-school.component';
import { EditSchoolComponent } from '../modals/edit-school/edit-school.component';

export interface School {
  id: number;
  school_name: string;
  min_tuition: bigint;
  max_tuition: bigint;
  status: boolean;
}

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit, OnDestroy {
  querySubscription: any;

  displayedColumns: string[] = ['id', 'school', 'min-max', 'status', 'actions'];
  dataSource = new MatTableDataSource<School>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private getSet: GetsetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.getSet.getDataSchool();

    this.querySubscription = this.getSet.changeTableValueSchool.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.getSet.appTitle = 'School Management';
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

  openSnackbar(msg: string) {
    this.snackBar.open(msg , '' , {
      duration: 5000,
    });
  }

  addSchoolDialog() {
    const dialogRef = this.dialog.open(AddSchoolComponent, { disableClose: true });
  }

  editSchool(id: number, school: string, min: bigint, max: bigint, status: boolean) {
    this.getSet.schoolData = [id, school, min, max, status];
    const dialogRef = this.dialog.open(EditSchoolComponent, { disableClose: true });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
