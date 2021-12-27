import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudentUpdate } from 'src/app/models/studentUpdate.inteface';
import { IStudent } from '../../../models/student.interface';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  URL: string = 'http://localhost:3010';

  public getAll(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.URL}/student`) as Observable<
      IStudent[]
    >;
  }

  public getById(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(
      `${this.URL}/student/:id=${id}`
    ) as Observable<IStudent>;
  }

  public post(Istudent: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(
      `${this.URL}/student`,
      Istudent
    ) as Observable<IStudent>;
  }

  public remove(id: number): Observable<any> {
    return this.http.delete<IStudent>(`${this.URL}/student/` + id);
  }

  public put(Istudent: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(
      `${this.URL}/student`,
      Istudent
    ) as Observable<IStudent>;
  }
}
