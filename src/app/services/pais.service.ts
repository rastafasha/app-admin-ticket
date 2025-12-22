import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';
import { Pais } from '../models/pais';


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  serverUrl = environment.url_servicios;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) { }



  getPaises() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/paises";
    return this.http.get(URL, {headers:headers}).pipe(
      catchError(this.handleError)
    );

    
  }


  getCountries() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/pais/countryList";
    return this.http.get(URL, {headers:headers}).pipe(
      catchError(this.handleError)
    );
  }


  getPaisDetail(code:string){

    return this.http.get<Pais>(`${this.serverUrl}/pais/code/${code}`).pipe(
      catchError(err => of(null))
    )

  }

  getPais(id:any) {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/pais/show/"+id;
    return this.http.get(URL,{headers:headers});
  }


  createPais(data) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/pais/store";
    return this.http.post(URL,data, {headers:headers});
  }

  updatePais(data, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/pais/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deletePais(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/pais/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
  }

  search(query=''){
    return this.http.get(`${this.serverUrl}/pais/search/buscar`, {params: {buscar: query}})

  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
