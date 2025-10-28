import { Injectable } from '@angular/core';
import { Parent } from '../models/parents';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class ParentService {

   public user: Parent;
    public recientes: Parent;
    public identity: Parent;
    // public role: Role;
    error:string;
  
    serverUrl = environment.url_servicios;
  
    constructor(
      private http: HttpClient,
      private router: Router,
      public authService: AuthService,
      ) {
      this.user;
    }
  
  
  get token():string{
    return localStorage.getItem('token') || '';
  }
  
    get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST' {
      return this.user.role!;
    }
  
  
    get headers(){
      return{
        headers: {
          'auth_token': this.token
  
        }
      }
  
    }
  
    getAll(): Observable<any> {
  
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/clients";
      return this.http.get(URL, {headers:headers});
  
      
    }
   
    getUserById(id:number): Observable<any> {
  
      let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
      let URL = this.serverUrl+"/client/show/"+id;
      return this.http.get(URL,{headers:headers});
  
  
    }
  
  
    update(data: any) {
      const url = `${baseUrl}/client/update/${data.id}`;
      return this.http.put(url, data, this.headers);
    }

     updateStatus(data:any, id: number) {
          return this.http.put<any>(baseUrl + '/client/update/status/' + id, data, this.headers)
      
        }
  
    deleteById(user:any): Observable<any> {
      const url = `${baseUrl}/client/destroy/${user}`;
      return this.http.delete(url, this.headers)
    }

    search(query=''){
    return this.http.get(`${baseUrl}/client/search/buscar`, {params: {buscar: query}})

  }
}
