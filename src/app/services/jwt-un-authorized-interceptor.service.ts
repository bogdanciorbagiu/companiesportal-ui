import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtUnAuthorizedInterceptorService implements HttpInterceptor{

  constructor(private snackbar: MatSnackBar) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    return next.handle(request).pipe(tap(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {

        }
      },
      (error: any) => {
        console.log(error);
        if (error instanceof HttpErrorResponse ) {
          if (error.status == 401) {
            this.snackbar.open('401 Unauthorized', undefined, {
              duration: 2000,
              panelClass: ['red-snackbar']
            });
          }
        }
      }
    ));
  }
}
