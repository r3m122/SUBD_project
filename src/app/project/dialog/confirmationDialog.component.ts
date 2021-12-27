import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: ` <h1
      style="display:flex; justify-content: center;"
      mat-dialog-title
    >
      Подтвердите свое действие
    </h1>
    <div>
      <p style="display:flex; justify-content: center;">
        Вы точно хотите это сделать?
      </p>
    </div>
    <div mat-dialog-actions>
      <button style="background-color: red" mat-button mat-dialog-close>
        Отменить
      </button>
      <button
        mat-button
        style="background-color: #b2d3c2"
        type="button"
        (click)="submit()"
      >
        Продолжить
      </button>
    </div>`,
})
export class ConfirmationDialogComponent {
  constructor(private dialogRef: MatDialogRef<void>) {}

  public submit() {
    this.dialogRef.close(true);
  }
}
