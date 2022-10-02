import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(
    private loginService: LoginService,
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    var token = sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser") as string).token : null
    this.loginService.RePopulateFields();
    console.log(route.data['expectedRole']);
    console.log(this.loginService.currentUserName);
    console.log(JSON.parse(sessionStorage.getItem("currentUser") as string).username)
    console.log(this.loginService.currentUserId);
    console.log(this.loginService.token);
    console.log(token);
    console.log(this.loginService.IsAuthenticated());
    // console.log(this.jwtHelperService.decodeToken(token).role);
    if (token != null) {
      if (this.loginService.IsAuthenticated() &&
      (this.jwtHelperService.decodeToken(token).role == route.data['expectedRole']
      || route.data['expectedRole'] == undefined
      )
      ) {
        return true;
      }
      else{
        //aici daca nu avem drepturi, trebuie sa vedem o lista ceva...
        this.router.navigateByUrl("/watchlist")
        return false;
      }
    }
   else {
      this.router.navigateByUrl("/login")
      return false;
    }
  }
}
