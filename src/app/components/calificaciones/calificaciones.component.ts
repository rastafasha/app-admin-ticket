import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Calificacion } from 'src/app/models/calificacion';
import { Evento } from 'src/app/models/evento';
import { Parent } from 'src/app/models/parents';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.component.html',
  styleUrls: ['./calificaciones.component.css']
})
export class CalificacionesComponent implements OnChanges{
  @Input() eventProfile: Evento;
    asistencia= false;
    isLoading = false;
    title = 'Eventos';
  
    loading = false;
    usersCount = 0;
    event: Evento;
    eventos: Evento;
    clients: Parent[];
    filteredClients: Parent[];
    client_id: number;
    studentprofile: Evento;
    roles;

    p: number = 1;
    count: number = 8;

    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
    calificaciones:Calificacion;
  
    ServerUrl = environment.url_servicios;
  
    constructor(
     private eventoService: EventoService,
      private http: HttpClient,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
    ngOnInit(): void {
      window.scrollTo(0, 0);
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes['eventProfile'] && this.eventProfile && this.eventProfile.id) {
        
        this.getEventos();
      }
    }
  
    getEventos(): void {
      if (!this.eventProfile || !this.eventProfile.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.eventoService.getClientsbyEvent(this.eventProfile.id).subscribe(
        (res: any) => {
          this.event = res.event;
          console.log(res)
          this.clients = res.event.clients.map(client => ({
            ...client,
            asistencia: !!client.pivot?.asistencia
          }));
          this.filteredClients = this.clients;
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  
    search() {
      if (!this.query) {
        this.filteredClients = this.clients;
      } else {
        this.filteredClients = this.clients.filter(client =>
          client.name.toLowerCase().includes(this.query.toLowerCase())
        );
      }
    }
  
    public PageSize(): void {
      this.getEventos();
      this.query = '';
      this.filteredClients = this.clients;
    }
  
    openEmailModal(client){
      this.studentprofile = client;
      console.log('cliente', client)
    }

    selectClient(client){
      this.studentprofile = client;
      console.log('cliente', client)
    }

    guardarAsistencia(client, event: any) {
      console.log('evento', event)
      console.log('cliente', client)
      if (!client.pivot) {
        console.error('Client pivot is undefined, cannot access client_id');
        return;
      }
      const client_id = client.pivot.client_id;
      this.client_id = client_id
      console.log('cliente', this.client_id)
      const asistencia = client.asistencia || false;
      this.eventoService.updateAsistencia(this.eventProfile.id, client_id, asistencia).subscribe(
        (res: any) => {
          console.log('Asistencia actualizada', res);
          this.asistencia = true;
        },
        (error) => {
          console.error('Error actualizando asistencia', error);
          this.asistencia = false;
        }
      );
    }

    enviarCertificado(client){
      console.log('enviando correo ', this.eventProfile.id, 'del cliente', client);
      this.eventoService.enviarCertificado(this.eventProfile.id, client.id).subscribe((resp:any)=>{

      })
    }
}
