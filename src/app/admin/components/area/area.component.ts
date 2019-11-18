import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { GetsetService } from '../services/getset.service';
import { AddAreaComponent } from '../modals/add-area/add-area.component';
import { EditAreaComponent } from '../modals/edit-area/edit-area.component';

export interface Area {
  id: number;
  area: string;
  status: boolean;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit, OnDestroy {
  querySubscription: any;
  area: any;

  displayedColumns: string[] = ['id', 'area', 'status', 'actions'];
  dataSource = new MatTableDataSource<Area>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private getSet: GetsetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.getSet.getDataArea();
    this.getSet.getDataAreaModal();

    this.querySubscription = this.getSet.changeTableValueArea.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });


    this.getSet.appTitle = 'Area Management';
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

  addAreaDialog() {
    const dialogRef = this.dialog.open(AddAreaComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  editArea(id: number, area: string, status: boolean) {
    this.getSet.areaData = [id, area, status];
    const dialogRef = this.dialog.open(EditAreaComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
