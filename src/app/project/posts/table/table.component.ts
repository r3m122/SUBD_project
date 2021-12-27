import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { IStudent } from 'src/app/models/student.interface';
import { IStudentUpdate } from 'src/app/models/studentUpdate.inteface';
import { CreateComponent } from '../create/create.component';
import { StudentService } from '../service/student.service';
import * as _ from 'lodash';
import { ConfirmationDialogComponent } from '../../dialog/confirmationDialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private matDialog: MatDialog
  ) {}

  public isLoading = false;

  private studentData = new BehaviorSubject<IStudent[]>([]);

  ngOnInit() {
    this.isLoading = true;
    this.studentService
      .getAll()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((studentListItem) => this.studentData.next(studentListItem));
  }

  displayedColumns: string[] = [
    'id',
    'firstname',
    'secondname',
    'birthday',
    'university',
    'faculty',
    'applyDate',
    'action',
  ];

  public getStudent(): Observable<IStudent[]> {
    return this.studentData.asObservable();
  }

  create() {
    const ref = this.matDialog.open(CreateComponent, {
      width: '450px',
    });

    ref.afterClosed().subscribe((student: IStudent) => {
      if (student) {
        const list = this.studentData.getValue();
        list.push(student);
        this.studentData.next(_.cloneDeep(list));
      }
    });
  }

  update(studentUpd: IStudentUpdate) {
    const ref = this.matDialog.open(CreateComponent, {
      width: '600px',
      data: { studentUpdate: studentUpd },
    });

    ref.afterClosed().subscribe((editedStudent: IStudent) => {
      if (editedStudent) {
        const list = this.studentData.getValue();
        const postIndex = _.findIndex(
          list,
          (post) => post.id === editedStudent.id
        );
        list[postIndex] = editedStudent;

        this.studentData.next(_.cloneDeep(list));
      }
    });
  }

  delete(student: IStudent) {
    const ref = this.matDialog.open(ConfirmationDialogComponent);

    ref.afterClosed().subscribe((canContinue) => {
      if (canContinue) {
        this.isLoading = true;
        this.studentService
          .remove(student.id)
          .pipe(finalize(() => (this.isLoading = false)))
          .subscribe(() => {
            const list = this.studentData.getValue();
            _.remove(list, (post) => post.id === student.id);
            this.studentData.next(_.cloneDeep(list));
          });
      }
    });
  }
}
