import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatSort, MatPaginator, MatTable, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AddCourseComponent } from '../modals/add-course/add-course.component';
import { EditCourseComponent } from '../modals/edit-course/edit-course.component';

export interface Course {
  id: number;
  school_id: string;
  course_name: string;
  status: boolean;
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  querySubscription: any;
  schools: any;

  displayedColumns: string[] = ['id', 'school name', 'course name', 'status', 'actions'];
  dataSource = new MatTableDataSource<Course>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private getSet: GetsetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.getSet.getDataCourse();
    this.getSet.getDataSchoolModal();

    this.querySubscription = this.getSet.changeTableValueCourse.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.querySubscription = this.getSet.changeTableValueSchoolModal.subscribe((res) => {
      this.schools = res["data"];
    });

    this.getSet.appTitle = 'Course Management';
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
      duration: 2000,
    });
  }

  addCourseDialog() {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      height: '300px',
      width: '500px',
    });
  }

  editCourse(id: number, school: string, course: string, status: boolean) {
    this.getSet.courseData = [id, school, course, status];
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '500px',
    });
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
