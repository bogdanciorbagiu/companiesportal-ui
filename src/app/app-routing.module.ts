import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { CompanyOverviewComponent } from './companies/company-overview/company-overview.component';
import { WatchlistComponent } from './companies/watchlist/watchlist.component';
import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './services/can-activate-guard.service';
import { StudentsComponent } from './students/students.component';
import { ViewStudentComponent } from './students/view-student/view-student.component';
import { UsersComponent } from './users/users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

const routes: Routes = [

{
  path: '',
  component: LoginComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'companies',
  component: CompaniesComponent,
  canActivate: [CanActivateGuardService]
},
{
  path: 'users',
  component: UsersComponent,
  canActivate: [CanActivateGuardService],
  data: {expectedRole: "Admin"}
},
{
  path: 'users/create',
  component: ViewUserComponent,
  canActivate: [CanActivateGuardService],
  data: {expectedRole: "Admin"}
},
{
  path: 'watchlist',
  component: WatchlistComponent,
  canActivate: [CanActivateGuardService]
},
{
  path: 'overview/:id',
  component: CompanyOverviewComponent,
  canActivate: [CanActivateGuardService]
},
{
  path: 'students',
  component: StudentsComponent,
  canActivate: [CanActivateGuardService],
  data: {expectedRole: "Admin"}
},
{
  path: 'students/:id',
  component: ViewStudentComponent,
  canActivate: [CanActivateGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
