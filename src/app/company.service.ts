import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { AddToWatchlistRequest } from './models/api-models/create-add-to-watchlist-request.model';
import { Company } from './models/ui-models/company.model';
import { CompanyOverview } from './models/ui-models/company.overview.model';
import { Watchlist } from './models/ui-models/watchlist.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private baseApiUrl = 'https://localhost:44356';

  constructor(private httpClient: HttpClient) { }

  getCompanies(id: string): Observable<Company[]>{
    return this.httpClient.get<Company[]>(this.baseApiUrl + '/companies/' + id)
  }

  addToWatchlist(user:string, company:string) : Observable<any> {
    const addToWatchlistRequest: AddToWatchlistRequest= {
      userId: user,
      companyId: company
    };
    return this.httpClient.post(this.baseApiUrl + '/companies/create', addToWatchlistRequest);
  }

  getCompaniesByUser(id: string): Observable<Watchlist[]>{
    return this.httpClient.get<Watchlist[]>(this.baseApiUrl + '/companies/watchlist/' + id);
  }

  deleteFromWatchlist(symbol: string, user: string): Observable<Watchlist> {
    return this.httpClient.delete<Watchlist>(this.baseApiUrl + '/companies/watchlist/' + symbol + '/' + user);
  }

  getCompanyOverview(symbol: string | null): Observable<CompanyOverview>{
    return this.httpClient.get<CompanyOverview>(this.baseApiUrl + '/companies/overview/' + symbol)
  }
}
