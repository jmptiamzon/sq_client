import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GetsetService } from '../services/getset.service';
import { MatTableDataSource, MatDialog, MatSnackBar, MatTable, MatPaginator, MatSort } from '@angular/material';
import { EditQuestionComponent } from '../modals/edit-question/edit-question.component';
import { AddQuestionComponent } from '../modals/add-question/add-question.component';

export interface Question {
  id: number;
  question: string;
  course_id: number;
  status: boolean;
}

export interface CourseQ {
  id: number;
  school_id: string;
  course_name: string;
  status: boolean;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit, OnDestroy {
  private querySubscription: any;
  private course: any;

  displayedColumns: string[] = ['id', 'question', 'course', 'status', 'actions'];
  dataSource = new MatTableDataSource<Question>();

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    private getSet: GetsetService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.getSet.getDataQuestion();
    this.getSet.getDataQuestionCourse();

    this.querySubscription = this.getSet.changeTableValueQuestion.subscribe((res) => {
      this.dataSource.data = res["data"];
      this.table.renderRows();
    });

    this.querySubscription = this.getSet.changeTableValueQuestionCourse.subscribe((res) => {
      this.course = res["data"];
    });

    this.getSet.appTitle = 'Configuration';
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

  addQuestionDialog() {
    const dialogRef = this.dialog.open(AddQuestionComponent, {
      width: '100vh'
    });
  }

  editQuestion(id: number, question: string, course: string, status: boolean) {
    this.getSet.questionData = [id, question, course, status];
    const dialogRef = this.dialog.open(EditQuestionComponent, {
      width: '100vh'
    });
  }

  findById(id: number) {
    if (this.course !== undefined) {
      console.log(this.course);
      return this.course.find((x: any) => x.id === id);
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
