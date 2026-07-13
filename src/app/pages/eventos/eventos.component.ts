import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import Swal from 'sweetalert2';
import { UsersListComponent } from '../users/user-list/users-list.component';
import { UserService } from 'src/app/services/users.service';
@Component({
  selector: 'app-eventos',
  standalone: false,
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  @ViewChild('viewEvent', { static: false }) offcanvasElement!: ElementRef;

  @Input() event_id: string;
  @Input() user_id: string;

  title = "Eventos";

  loading = false;
  usersCount = 0;
  eventos: any;
  user: any;
  roles;
  role;
  isLoading: boolean = false;

  p: number = 1;
  id: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';
  payments: Payment;
  eventSeleccionado: Evento;
  eventoSeleccionado: Evento;

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  constructor(
    private eventosService: EventoService,
    private location: Location,
    private http: HttpClient,
    public accountService: AuthService,
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.accountService.closeMenu();
    this.role = this.accountService.role;
    
     this.user = this.accountService.userprofile;
      
      if(this.user.roles[0] === 'SUPERADMIN'){
        this.getEvents();
      }else{
        this.getUserRemoto()
      }
  }
getUserRemoto(){
    this.userService.getUserById(this.user.id).subscribe((resp:any)=>{
      this.user = resp.user;
      this.getEventsbyTienda()
    })
  }




  getEvents(): void {
    this.isLoading = true;
    this.eventosService.getAll().subscribe(
      (res: any) => {
        this.eventos = res.events.data;
        error => this.error = error;
        this.isLoading = false;
        // console.log(this.students);
      }
    );
  }

  getEventsbyTienda(): void {
    this.isLoading = true;
    this.eventosService.getByTiendaId(this.user.company_id).subscribe(
      (res: any) => {
        this.eventos = res.events;
        error => this.error = error;
        this.isLoading = false;
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search() {
    return this.eventosService.search(this.query).subscribe(
      (res: any) => {
        console.log(res);
        console.log(this.query);
        this.eventos = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    this.ngOnInit();
    this.query = '';
  }


  cambiarStatus(eventprofile: any) {
    const VALUE = eventprofile.status;

    const data = {
      status: VALUE
    }


    this.eventosService.updateStatus(data, eventprofile.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.ngOnInit();
    });
  }

  onEditProject(evento: Evento) {
    this.eventSeleccionado = evento;
  }

  openEditModal(): void {
    this.eventSeleccionado = null;
  }

  openViewDetail(evento: Evento) {
    this.eventoSeleccionado = evento;
  }


  onCloseModal(): void {
    this.eventSeleccionado = null;
  }

  onClose() {
    this.ngOnInit();
  }
} 
