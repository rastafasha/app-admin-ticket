import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listahijos',
  standalone: false,
  templateUrl: './listahijos.component.html',
  styleUrls: ['./listahijos.component.css']
})
export class ListahijosComponent implements OnChanges {
  @ViewChild('viewEvent', { static: false }) offcanvasElement!: ElementRef;
  
  @Input() userprofile: any;
  @Input() showMatricula: boolean = true;
  @Input() showAcciones: boolean = true;
  @Input() showGenero: boolean = true;
  @Input() showNacimiento: boolean = true;
  isLoading = false;
  title = 'Padres';

  loading = false;
  usersCount = 0;
  events: Evento;
  eventprofile: Evento;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';
  eventSeleccionado:Evento;
  eventoSeleccionado:Evento;

  ServerUrl = environment.url_servicios;
  doctores;
  user:any;

  constructor(
    private eventosService: EventoService,
    private accountService: AuthService,
    private http: HttpClient,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // Removed this.getUsers() from here to avoid calling before userprofile is set
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getEvents()
    }
  }


  getEvents(): void {
    if (!this.userprofile || !this.userprofile.id) {
      this.isLoading = false;
      this.error = 'User profile is not defined';
      return;
    }
    this.isLoading = true;
    this.eventosService.eventsbyUser(this.userprofile.id).subscribe(
      (res: any) => {
        this.events = res.user.eventos;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  search() {
    return this.eventosService.search(this.query).subscribe((res: any) => {
      this.events = res;
      if (!this.query) {
        this.ngOnInit();
      }
    });
  }

  public PageSize(): void {
    this.getEvents();
    this.query = '';
  }

  onEditProject(evento: Evento) {
    this.eventSeleccionado = evento;
    console.log(evento)
  }

  openEditModal(): void {
    this.eventSeleccionado = null;
  }

  openViewDetail(evento: Evento) {
    this.eventoSeleccionado = evento;
    console.log(evento)

  }


  onCloseModal(): void {
    this.eventSeleccionado = null;
  }

  onClose() {
    this.ngOnInit();
  }

}
