import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import {tap, map, catchError, } from 'rxjs/operators';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterForm } from '../auth/interfaces/register-form.interface';
import { LoginForm } from '../auth/interfaces/login-form.interface';
import { PasswordForm } from '../auth/interfaces/password-form.interface';

const url_servicios = environment.url_servicios;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user:any;
  role:any;
  userprofile:any;

  constructor(
    private router: Router,
    public http: HttpClient
    ) {
      this.getLocalStorage();//devuelve el usuario logueado
    }

     get token(): string {
      return localStorage.getItem('token') || '';
    }
  
    get headers() {
      return {
        headers: {
          auth_token: this.token,
        },
      };
    }
  
  
    getLocalStorage(){
      if(localStorage.getItem('token') && localStorage.getItem('user')){
        let USER = localStorage.getItem('user');
        this.user = JSON.parse(USER ? USER: '');
        this.router.navigateByUrl('/dashboard');
      }else{
        this.user = null;
        this.router.navigateByUrl('/login');
      }
      // console.log(this.user);
      
   }

   saveLocalStorage(auth:any){
    if(auth && auth.access_token){
      localStorage.setItem("token",auth.access_token.original.access_token);
      localStorage.setItem("user",JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      return true;
    }
    return false;
  }

  

  guardarLocalStorage( user:any, access_token: any){
    // localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', access_token.original.access_token);
  }


  login(email:string,password:string){

    // return this.http.post<any>(`${this.serverUrl}/login`, {email: email, password: password}, { withCredentials: false })

    let URL = url_servicios+"/login";
    return this.http.post(URL, {email: email,password: password})
    .pipe(
      map((auth:any) => {
        console.log(auth);
        const result = this.guardarLocalStorage(auth.user, auth.access_token);
        return result;
      }),
      catchError((error:any) => {
        console.log(error);
        return of(undefined);
      })
    )

  }

  crearUsuario(formData: RegisterForm){
    let URL = url_servicios+"/register";
    return this.http.post(URL, formData)
    .pipe(map(user => {
      localStorage.setItem('auth_token', JSON.stringify(user));

      return user;
    }));
  }



 

 logout(){
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('authenticated');
  this.router.navigateByUrl('/login');
 }


 closeMenu(){
  var menuLateral = document.getElementsByClassName("mini-sidebar ");
  for (var i = 0; i<menuLateral.length; i++) {
     menuLateral[i].classList.remove("show-sidebar");
  }
}

getRole(){
  let USER = localStorage.getItem("user");
     if (USER) {
      try {
        this.user = JSON.parse(USER);
        this.role = this.user.roles && this.user.roles.length > 0 ? this.user.roles[0] : '';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.user = null;
        this.role = '';
      }
    } else {
      this.user = null;
      this.role = '';
    }
    this.userprofile = this.user;
}

getLocalDarkMode(){
  setTimeout(()=>{
    if(localStorage.getItem('dark')){
        var element = document.body;
      element.classList.add("dark");
      
    }

  },500)
  // console.log(this.user);
  
}

forgotPassword(formData:any){
  return this.http.post(`${url_servicios}/forgot-password`, formData)

}

changePassword(formData:PasswordForm){
  return this.http.post(`${url_servicios}/change-forgot-password`, formData)

}

resetPassword(formData:PasswordForm){
  return this.http.post(`${url_servicios}/reset-password`, formData)

}

newPassword(data: any) {
      const url = `${url_servicios}/change-password`;
      return this.http.post(url, data);
    }
  
  

}
