import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Calificacion } from 'src/app/models/calificacion';
import { Evento } from 'src/app/models/evento';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/users';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { EventoService } from 'src/app/services/evento.service';
import { ParentService } from 'src/app/services/parent-service.service';
import { StudentService } from 'src/app/services/student-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent {
  @Input() userprofile: Student;
    isLoading = false;
    title = 'Calificaciones';
  
    loading = false;
    usersCount = 0;
    event: Evento;
    eventos: Evento;
    clients: User;
    studentprofile: Student;
    roles;
  
    p: number = 1;
    count: number = 8;
  
    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
    calificaciones:Calificacion;
  
    ServerUrl = environment.url_servicios;
    selectedMateria: Calificacion;
  
    constructor(
     private eventoService: EventoService,
      private http: HttpClient,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
      // console.log(this.studentProfile);
      // Removed this.getUsers() from here to avoid calling before studentProfile is set
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
        this.getStudents();
      }
    }
  
    getStudents(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.eventoService.getUserbyEvent(this.userprofile.id).subscribe(
        (res: any) => {
          this.event = res.event;
          this.clients = res.event.clients;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
    search() {
      return this.eventoService.search(this.query).subscribe((res: any) => {
        this.eventos = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
    }
  
    public PageSize(): void {
      this.getStudents();
      this.query = '';
    }
  
    openPaymentsModal(calif: Calificacion): void {
      this.selectedMateria = calif;
    }
    openNewModal(calif: Student): void {
      this.studentprofile = calif;
    }
}
