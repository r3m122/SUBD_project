import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IStudent } from 'src/app/models/student.interface';
import { IStudentCreate } from 'src/app/models/studentCreate.interface';
import { IStudentUpdate } from 'src/app/models/studentUpdate.inteface';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<IStudentCreate>,
    private studentService: StudentService,
    @Inject(MAT_DIALOG_DATA) public data: { studentUpdate: IStudentUpdate }
  ) {}

  public isLoading = false;
  public isEditing = false;

  public newStudentModel: IStudent | IStudentUpdate = {} as IStudent;

  ngOnInit(): void {
    this.isEditing = Boolean(this.data && this.data.studentUpdate);
    this.newStudentModel = this.data.studentUpdate;
  }

  public create(form: NgForm) {
    if (form.valid) {
      this.isLoading = true;
      this.handleAfterCreate(
        this.isEditing
          ? this.studentService.put(this.newStudentModel as IStudentUpdate)
          : this.studentService.post(this.newStudentModel)
      );
    }
  }

  private handleAfterCreate(observable: Observable<IStudent>) {
    return observable
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe((response) => {
        this.dialogRef.close(response);
      });
  }
}
