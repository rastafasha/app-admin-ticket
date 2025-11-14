import { Injectable } from "@angular/core";
import { Evento } from "../models/evento";
import { environment } from "src/environments/environment";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
const baseUrl = environment.url_servicios;

@Injectable({
  providedIn: "root",
})
export class EventoService {
  public user: Evento;
  public recientes: Evento;
  public identity: Evento;
  // public role: Role;
  error: string;

  serverUrl = environment.url_servicios;

  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService
  ) {
    this.user;
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
    let URL = this.serverUrl + "/events";
    return this.http.get(URL, { headers: headers });
  }

  getById(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/event/show/" + id;
    return this.http.get(URL, { headers: headers });
  }

  

  getClientsbyEvent(id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/event/clientsbyEvent/" + id;
    return this.http.get(URL, { headers: headers });
  }

  eventsbyUser(user_id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/event/eventsbyuser/" + user_id;
    return this.http.get(URL, { headers: headers });
  }
  usersByEvent(event_id: number): Observable<any> {
    let headers = new HttpHeaders({
      Authorization: "Bearer" + this.authService.token,
    });
    let URL = this.serverUrl + "/event/userbyEvent/" + event_id;
    return this.http.get(URL, { headers: headers });
  }

  eventsbyClient(id:number): Observable<any> {
      
          let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
          let URL = this.serverUrl+"/event/eventsbyclient/"+id;
          return this.http.get(URL,{headers:headers});
        }

  createEvento(evento) {
    return this.http
      .post<any>(this.serverUrl + "/event/store", evento)
      .pipe(catchError(this.handleError));
  }

  update(evento, id: number) {
    return this.http
      .post<any>(this.serverUrl + "/event/update/" + id, evento)
      .pipe(catchError(this.handleError));
  }
  
  addColaborador(event_id: number, data: any) {
    return this.http
      .post<any>(this.serverUrl + "/event/addcolaborador/" + event_id, data)
      .pipe(catchError(this.handleError));
  }
  removeColaborador(event_id: number, data: any) {
    return this.http
      .post<any>(this.serverUrl + "/event/removecolaborador/" + event_id, data)
      .pipe(catchError(this.handleError));
  }

  updateStatus(data: any, id: number) {
    return this.http.put<any>(
      baseUrl + "/event/update/status/" + id,
      data,
      this.headers
    );
  }

  deleteById(event: Evento): Observable<any> {
    const url = `${baseUrl}/event/destroy/${event}`;
    return this.http.delete(url, this.headers);
  }

  updateAsistencia(event_id: number, user_id: string, asistencia: boolean) {
    const data = { asistencia };
    return this.http.put<any>(
      `${baseUrl}/event/asistencia/${event_id}/${user_id}`,
      data,
      this.headers
    );
  }
  enviarCertificado(event_id: number, client_id: string) {
    return this.http.put<any>(
      `${baseUrl}/event/sendConfirmation/${event_id}/${client_id}`,
      this.headers
    );
  }

  search(query = "") {
    return this.http.get(`${baseUrl}/event/search/buscar`, {
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
