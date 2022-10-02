import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginViewModel } from '../models/api-models/login-view-model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginViewModel: LoginViewModel = new LoginViewModel();
  loginError: string = "";
  constructor(private loginService: LoginService, private router: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  if (this.loginService.IsAuthenticated()) {
    this.router.navigateByUrl("/watchlist");
  }


  }

  onLoginClick(event: any)
  {
    this.loginService.Login(this.loginViewModel)
    .subscribe(
      (response) => {
        this.snackbar.open('Login successfully', undefined, {
          duration: 2000
        });
        this.router.navigateByUrl("/watchlist")
      },
      (error) => {
        this.snackbar.open('Login failed', undefined, {
          duration: 2000
        });
        this.loginError = "Invalid username or password";
      }
    );
  }

}
