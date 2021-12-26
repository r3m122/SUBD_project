import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IStudent } from './models/student.interface';
import { StudentService } from './project/posts/service/student.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
