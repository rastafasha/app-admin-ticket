import { Injectable } from '@angular/core';
import { Configuracion } from '../models/configuracion';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  serverUrl = environment.url_servicios;

  constructor(private http: HttpClient,
    public authService: AuthService,
  ) { }

  getSettings() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/configuracion";
    return this.http.get(URL, {headers:headers});
    
  }

  getSetting(id: any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/configuracion/show/"+id;
    return this.http.get(URL,{headers:headers});
  }


  createSetting(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/configuracion/store";
    return this.http.post(URL,data,{headers:headers});
    
  }

  updateSetting(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/configuracion/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteSetting(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/configuracion/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
    
  }

}
