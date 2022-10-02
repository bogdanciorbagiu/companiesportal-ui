import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../models/ui-models/user.model';
import { LoginService } from '../services/login.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'username', 'delete'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  filterString = '';

  constructor(
    private userService: UserServiceService,
    public loginService: LoginService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      suc => {
        this.users = suc;
        this.dataSource = new MatTableDataSource<User>(this.users);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if (this.matPaginator) {
          this.dataSource.sort = this.matSort;
        }
    }

    );
    console.log(this.users);


  }
  filterUsers(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  onDelete(id: string): void{
    console.log('Delete ' + id);
    this.userService.deleteUser(id)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('User deleted', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            // this.router.navigateByUrl('/users');
            location.reload();
          }, 2000);

        },
        (errorResponse) => {
          console.log(errorResponse);
          this.snackbar.open('Cannot delete user', undefined, {
            duration: 2000,
            panelClass: ['red-snackbar']
          });
        }
      );
  }

  onAddNewUser():void{
    this.router.navigateByUrl('/users/create')
  }
}
