import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError } from 'rxjs';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public company: Company;

  serverUrl = environment.url_servicios;

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {
  }


  get token(): string {
    return localStorage.getItem("token") || "";
  }

  get headers() {
    return {
      headers: {
        auth_token: this.token,
      },
    };
  }


  getAll(): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/companies";
    return this.http.get(URL, { headers: headers });
  }

  getById(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/event/show/" + id;
    return this.http.get(URL, { headers: headers });
  }

  createCompany(company) {
    return this.http
      .post<any>(this.serverUrl + "/company/store", company)
      .pipe(catchError(this.handleError));
  }

  update(company, id: number) {
    return this.http
      .post<any>(this.serverUrl + "/company/update/" + id, company)
      .pipe(catchError(this.handleError));
  }


  search(query = "") {
    return this.http.get(`${baseUrl}/company/search/buscar`, {
      params: { buscar: query },
    });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened. Please try again later.");
  }
}
