import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/company.service';
import { Watchlist } from 'src/app/models/ui-models/watchlist.model';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchilsts: Watchlist[] = [];
  displayedColumns: string[] = ['symbol', 'stockPrice', 'overview', 'remove'];
  dataSource: MatTableDataSource<Watchlist> = new MatTableDataSource<Watchlist>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  searchtext: string = "";
  result: boolean = true;
  filterString = '';
  urlOverview = '';
  constructor(private companyService: CompanyService,
    public loginService: LoginService,
    private snackbar: MatSnackBar,
    private router: Router) { }


  ngOnInit(): void {
    this.getWatchlist()
  }

  getWatchlist(){
    this.companyService.getCompaniesByUser(this.loginService.currentUserId).subscribe(
      suc => {
        this.watchilsts = suc;
        this.dataSource = new MatTableDataSource<Watchlist>(this.watchilsts);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if (this.matPaginator) {
          this.dataSource.sort = this.matSort;
        }
    }

    );
    console.log(this.watchilsts);
  }

  filterWatchlist(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

  onOverview(elementId: string){
    console.log('overview' + elementId);
    this.urlOverview = '/overview/'+ elementId
    this.router.navigateByUrl(this.urlOverview)
  }

  onRemove(elementId: string): void {
    this.companyService.deleteFromWatchlist(elementId, this.loginService.currentUserId)
      .subscribe(
        (successResponse) => {
          this.snackbar.open('Company removed from watchlist', undefined, {
            duration: 2000
          });

          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 2000);

        },
        (errorResponse) => {
          // Log
        }
      );
  }
}
