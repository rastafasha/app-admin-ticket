import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Paymentmethod } from '../models/paymentmethod';
import { Tasabcv } from '../models/tasabcba';
import { environment } from 'src/environments/environment';

const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class TasabcvService {

  public tasabcv: Tasabcv;
  
  
    constructor(private http: HttpClient) { }
  
  get token():string{
    return localStorage.getItem('token') || '';
  }
  
  
    get headers(){
      return{
        headers: {
          'auth_token': this.token
        }
      }
    }
  
  
    getTasas() {
      const url = `${baseUrl}/tasabcvs`;
      return this.http.get<any>(url,this.headers)
        .pipe(
          map((resp:{ok: boolean, tasabcvs: Tasabcv}) => resp.tasabcvs)
        )
    }
  
    getTasaBcv(tasabcv: any) {
      const url = `${baseUrl}/tasabcv/show/${tasabcv}`;
      return this.http.get<any>(url, this.headers)
        .pipe(
          map((resp:{ok: boolean, tasabcv: Tasabcv}) => resp.tasabcv)
          );
    }
  
  
    createTasaBcv(tasabcv:any) {
      const url = `${baseUrl}/tasabcv/store`;
      return this.http.post(url, tasabcv, this.headers);
    }
  
  
    updateTasaBcv(tasabcv:Tasabcv, id: number) {
      return this.http.put<any>(baseUrl + '/tasabcv/update/' + id, tasabcv, this.headers)
  
    }
  
    deleteTasaBcv(tasabcv: any) {
      const url = `${baseUrl}/tasabcv/destroy/${tasabcv}`;
      return this.http.delete(url, this.headers);
    }
}
