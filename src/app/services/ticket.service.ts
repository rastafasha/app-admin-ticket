import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { AuthService } from './auth.service';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public ticket: Ticket;
  
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
      let URL = this.serverUrl + "/tickets";
      return this.http.get(URL, { headers: headers });
    }
  
    getById(id: number): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/ticket/show/" + id;
      return this.http.get(URL, { headers: headers });
    }
    usersById(id: number): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/tickets/client/" + id;
      return this.http.get(URL, { headers: headers });
    }

    eventsById(event_id: number, client_id: number): Observable<any> {
      let headers = new HttpHeaders({
        Authorization: "Bearer" + this.authService.token,
      });
      let URL = this.serverUrl + "/ticket/event/" + event_id+ "/" + client_id;
      return this.http.get(URL, { headers: headers });
    }
  
    create(ticket) {
      return this.http
        .post<any>(this.serverUrl + "/ticket/store", ticket)
        .pipe(catchError(this.handleError));
    }
  
    update(ticket, id: number) {
      return this.http
        .post<any>(this.serverUrl + "/ticket/update/" + id, ticket)
        .pipe(catchError(this.handleError));
    }
  
    delete(id: number) {
      return this.http
        .delete<any>(this.serverUrl + "/ticket/destroy/" + id)
        .pipe(catchError(this.handleError));
    }
  
  

     verify(ticket:any ): Observable<any> {
      const url = `${baseUrl}/ticket/verify/`;
      return this.http.post(url, ticket, this.headers);
    }
    
  
    search(query = "") {
      return this.http.get(`${baseUrl}/ticket/search/buscar`, {
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

