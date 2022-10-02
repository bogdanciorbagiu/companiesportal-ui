import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../company.service';
import { Company } from '../models/ui-models/company.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companies: Company[] = [];
  displayedColumns: string[] = ['symbol', 'name', 'type', 'region', 'currency', 'marketOpen','marketClose', 'add'];
  dataSource: MatTableDataSource<Company> = new MatTableDataSource<Company>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  searchtext: string = "";
  result: boolean = true;
  constructor(private companyService: CompanyService, public loginService: LoginService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }
  getSpecificCompanies(){
    this.companyService.getCompanies(this.searchtext).subscribe(
      suc => {
        this.companies = suc;
        this.dataSource = new MatTableDataSource<Company>(this.companies);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if (this.matPaginator) {
          this.dataSource.sort = this.matSort;
        }
    }

    );
  }

  onAddToWatchlist(elementId: string): void{
    this.companyService.addToWatchlist(this.loginService.currentUserId, elementId).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.snackbar.open('Added to watchlist', undefined, {
          duration: 2000
        });
      },
      (errorResponse) => {
        // Log
        console.log(errorResponse);
        this.snackbar.open('Company already is watched by user or user already watches 4 companies. Not added to watchlist', undefined, {
          duration: 4000,
          panelClass: ['red-snackbar']
        });
      }
    );
  }

}
