import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { LoginViewModel } from '../models/api-models/login-view-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseApiUrl = 'https://localhost:44356';
  private httpClient: HttpClient | null = null;

  currentUserName: string = "";
  token:string = "";
  role:string="";
  currentUserId: string = "";
  constructor(private httpBackend: HttpBackend,
    private jwtHelperService: JwtHelperService
    ) { }

  public Login(loginViewModel: LoginViewModel): Observable<any>{
    this.httpClient = new HttpClient(this.httpBackend);

    return this.httpClient.post<any>(this.baseApiUrl + "/users/authenticate", loginViewModel, {responseType: "json"})
    .pipe(map(user => {
      if(user)
      {
        console.log(user);
        this.currentUserName = user.username;
        sessionStorage['currentUser']= JSON.stringify(user);
        this.token = user.token;
        this.role = user.role;
        this.currentUserId = user.id;
      }
      return user;
    }))
  }

  public Logout()
  {
    sessionStorage.removeItem("currentUser");
    this.currentUserName = "";
    this.role = "";
    this.currentUserId = "";
  }

  public IsAuthenticated(): boolean
  {
    if (this.jwtHelperService.isTokenExpired()) {
      return false;
    }
    else
    {
      return true;
    }
  }

  public RePopulateFields():void{
    this.currentUserName = JSON.parse(sessionStorage.getItem("currentUser") as string).username;
    this.role = JSON.parse(sessionStorage.getItem("currentUser") as string).role;
    this.currentUserId = JSON.parse(sessionStorage.getItem("currentUser") as string).id;
    this.token = JSON.parse(sessionStorage.getItem("currentUser") as string).token;
  }
}
