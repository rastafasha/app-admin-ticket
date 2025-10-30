import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {map} from 'rxjs/operators';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

//Eviroment
import { environment } from '../../environments/environment';
import { User } from '../models/users';
import { AuthService } from './auth.service';
//Models

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user: User;
  public recientes: User;
  public identity: User;
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

  get role(): 'SUPERADMIN' | 'ADMIN' | 'MEMBER' | 'GUEST' |'PARTNER' {
    return this.user.roles!;
  }


  get headers(){
    return{
      headers: {
        'auth_token': this.token

      }
    }

  }

  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('auth_token', access_token.original.access_token);
  }

  getUserLocalStorage(): void {
    return this.user = JSON.parse(localStorage.getItem('user'));
  }

  

  getAll(): Observable<any> {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/users";
    return this.http.get(URL, {headers:headers});

    
  }
  config(): Observable<any> {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/users/config/";
    return this.http.get(URL, {headers:headers});

    
  }

  getUserById(id:number): Observable<any> {

    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/user/show/"+id;
    return this.http.get(URL,{headers:headers});


  }

  getRecientes(): Observable<any> {
    const url = `${baseUrl}/users/recientes`;
    return this.http.get<any>(url, this.headers)
      .pipe(
        map((resp:{ok: boolean, recientes: User}) => resp.recientes)
      )
  }

  updateUser(data:any, id: number) {
        return this.http.put<any>(baseUrl + '/user/update-admin/' + id, data, this.headers)
    
      }

  updateUserRole(data: any) {
    const url = `${baseUrl}/user/update-admin/${data.id}`;
    return this.http.put(url, data, this.headers);
  }
  update(data:any, id: number) {
    // const url = `${baseUrl}/user/update/${data.id}`;
    // return this.http.put(url, data, this.headers);
    return this.http.post<any>(baseUrl + '/user/update/' + id, data, this.headers)
  }

  deleteById(user:User): Observable<any> {
    const url = `${baseUrl}/user/destroy/${user}`;
    return this.http.delete(url, this.headers)
  }

  //soft deletes

  indexdelete(): Observable<any> {
    const url = `${baseUrl}/users/delete`;
    return this.http.get(url, this.headers)
  }
  userDeleteShow(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/show/${id}`;
    return this.http.get(url, this.headers)
  }
  userDeleteRestore(id:number): Observable<any> {
    const url = `${baseUrl}/user/delete/restore/${id}`;
    return this.http.put(url, this.headers)
  }
  userDeleteforce(id:number): Observable<any> {
    const url = `${baseUrl}/user/destroy/force/${id}`;
    return this.http.delete(url, this.headers)
  }

  closeMenu(){
    var menuLateral = document.getElementsByClassName("sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.remove("active");

      }
  }

  changePassword(data:User){
    const url = `${baseUrl}/reset-password/`;
    return this.http.post(url,  data, this.headers);
  }




  resetPassword(){
    const url = `${baseUrl}/reset-password/`;
    return this.http.post(url,  this.headers);
  }

  search(query=''){
    return this.http.get(`${baseUrl}/user/search/buscar`, {params: {buscar: query}})

  }



}
