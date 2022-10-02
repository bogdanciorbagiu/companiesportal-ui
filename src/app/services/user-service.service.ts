import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../models/api-models/create-user-request.model';
import { User } from '../models/ui-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private baseApiUrl = 'https://localhost:44356';

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]>{
    return this.httpClient.get<User[]>(this.baseApiUrl + '/users')
  }
  deleteUser(userId: string): Observable<User> {
    return this.httpClient.delete<User>(this.baseApiUrl + '/users/' + userId);
  }
  addUser(userRequest: User): Observable<User> {
    const addUserRequest: CreateUserRequest = {
      firstName: userRequest.firstName,
      lastName: userRequest.lastName,
      password: userRequest.password,
      username: userRequest.userName
    };

    return this.httpClient.post<User>(this.baseApiUrl + '/users/create', addUserRequest);
  }
}
