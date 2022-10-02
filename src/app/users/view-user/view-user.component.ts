import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/ui-models/user.model';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    role: '',
    token: ''
  }
  @ViewChild('createUserForm') createUserForm?: NgForm;

  constructor(private readonly userService: UserServiceService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    if (this.createUserForm?.form.valid) {
      // Submit form date to api
      this.userService.addUser(this.user)
        .subscribe(
          (successResponse) => {
            this.snackbar.open('User added successfully', undefined, {
              duration: 2000
            });

            setTimeout(() => {
              this.router.navigateByUrl('/users');
            }, 2000);

          },
          (errorResponse) => {
            this.snackbar.open('Cannot add user', undefined, {
              duration: 2000,
              panelClass: ['red-snackbar']
            });
            console.log(errorResponse);
          }
        );
    }
  }
}
