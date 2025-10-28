import { Injectable } from '@angular/core';
import { CalendarioTareas } from '../models/calendariotarea';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: 'root'
})
export class CalendariotareaService {

  public calendariotarea: CalendarioTareas;
  
    constructor(private http: HttpClient) {}
  
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
  
    getCalendarioTareas() {
      const url = `${baseUrl}/calendariotarea`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(
          map(
            (resp: { ok: boolean; calendariotareas: CalendarioTareas }) =>
              resp.calendariotareas
          )
        );
    }
  
    getCalendarioTarea(calendariotarea: any) {
      const url = `${baseUrl}/calendariotarea/show/${calendariotarea}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(
          map(
            (resp: { ok: boolean; calendariotarea: CalendarioTareas }) =>
              resp.calendariotarea
          )
        );
    }
  
    getCalendarioTareabyMaestro(id: number) {
      const url = `${baseUrl}/calendariotarea/showmaestro/${id}`;
      return this.http
        .get<any>(url, this.headers)
        .pipe(map((resp: { ok: boolean }) => resp));
    }
    
  
    createCalendarioTarea(calendariotarea: any) {
      const url = `${baseUrl}/calendariotarea/store`;
      return this.http.post(url, calendariotarea, this.headers);
    }
  
    updateCalendarioTarea(calendariotarea: any, id: number) {
      return this.http.put<any>(
        baseUrl + '/calendariotarea/update/' + id,
        calendariotarea,
        this.headers
      );
    }
  
    deleteCalendarioTarea(calendariotareaes: any) {
      const url = `${baseUrl}/calendariotarea/destroy/${calendariotareaes}`;
      return this.http.delete(url, this.headers);
    }
  
    search(query = '') {
      return this.http.get(`${baseUrl}/calendariotarea/search`, {
        params: { buscar: query },
      });
    }
}
