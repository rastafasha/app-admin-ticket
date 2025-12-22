import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Cliente } from 'src/app/models/cliente';
import { Payment } from 'src/app/models/payment';
import { EventoService } from 'src/app/services/evento.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subscriptores',
  templateUrl: './subscriptores.component.html',
  styleUrls: ['./subscriptores.component.css']
})
export class SubscriptoresComponent implements OnChanges{
  @Input() eventProfile: Evento;
    asistencia= false;
    isLoading = false;
    title = 'Eventos';
  
    loading = false;
    usersCount = 0;
    event: Evento;
    eventos: Evento;
    clients: Cliente[];
    filteredClients: Cliente[];
    client_id: number;
    events: Evento[] = [];
    clienteProfile: any;
    roles;

    p: number = 1;
    count: number = 8;
    ticketCount!: number ;
    
    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
    payments: Payment[] = [];
    eventPaymentCounts: { [eventId: number]: number } = {};
    paymentscount: number = 0;
    tickets_disponibles: number = 0;
    
    ServerUrl = environment.url_servicios;
  
    constructor(
     private eventoService: EventoService,
     private paymentService: PaymentService,
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
          this.tickets_disponibles = res.event.tickets_disponibles;
          console.log(res)
          this.clients = res.event.clients.map(client => ({
            ...client,
            asistencia: !!client.pivot?.asistencia,
            ticketCount: 0 // Initialize ticketCount
          }));

          this.filteredClients = this.clients;

          // Fetch ticket counts for all clients
          const ticketCountObservables = this.clients.map(client =>
            this.paymentService.getPaymentByEventbyClientId(this.eventProfile.id, client.id)
          );

          

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
      this.clienteProfile = client;
      console.log('cliente', client)
    }

    selectClient(client){
      this.clienteProfile = client;
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
