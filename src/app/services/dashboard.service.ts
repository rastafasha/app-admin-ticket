import { Injectable } from '@angular/core';
import { Dashboard } from '../models/dashboard';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tasabcv } from '../models/tasabcba';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

   public dashboard: Dashboard;
    
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
    
    
      getDasboardConfig() {
        const url = `${baseUrl}/admindashboard/config`;
        return this.http.get<any>(url,this.headers)
          .pipe(
            map((resp:{ok: boolean, }) => resp)
          )
      }
}
