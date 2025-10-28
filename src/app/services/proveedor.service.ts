import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  serverUrl = environment.url_servicios;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) { }



  getProveedores() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedores";
    return this.http.get(URL, {headers:headers}).pipe(
      catchError(this.handleError)
    );

    
  }




  getProveedor(id:any) {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/show/"+id;
    return this.http.get(URL,{headers:headers});
  }
  getProveedorByUser(user_id:any) {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/showbyUser/"+user_id;
    return this.http.get(URL,{headers:headers});
  }


  createProveedor(data) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/store";
    return this.http.post(URL,data, {headers:headers});
  }

  updateProveedor(data, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteProveedor(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
  }

  search(query=''){
    return this.http.get(`${this.serverUrl}/proveedor/search/buscar`, {params: {buscar: query}})

  }

  updateStatusClient(data:any, id:any){

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/updatestatusclient/"+id;
    return this.http.post(URL,data,{headers:headers});

  }
  updateStatusAdmin(data:any, id:any){

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/proveedor/updatestatusadmin/"+id;
    return this.http.post(URL,data,{headers:headers});

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
