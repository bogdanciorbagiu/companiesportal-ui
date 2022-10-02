import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateStudentRequest } from '../models/api-models/create-student-request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:44356';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]>
  {
    // var currentUser = {token: ""};
    // var headers = new HttpHeaders();
    // headers = headers.set("Authorization", "Bearer ");
    // if (sessionStorage["currentUser"] != null) {
    //   currentUser = JSON.parse(sessionStorage["currentUser"])
    //   console.log(currentUser.token);
    //   headers = headers.set("Authorization", "Bearer " + currentUser.token);
    //   console.log(headers);
    // }


    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students')
  }

  getStudent(studentId: string): Observable<Student>{
    return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId)
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      genderId: studentRequest.genderId,
      postalAddress: studentRequest.address.postalAddress
    }

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl + '/students/' + studentId);
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: CreateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      genderId: studentRequest.genderId,
      postalAddress: studentRequest.address.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/students/create', addStudentRequest);
  }
}
