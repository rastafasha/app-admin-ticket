import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Payment } from 'src/app/models/payment';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-eventoscliente',
  standalone: false,
  templateUrl: './eventoscliente.component.html',
  styleUrls: ['./eventoscliente.component.css']
})
export class EventosclienteComponent implements OnChanges {
  @Input() userprofile: any;
  isLoading = false;
  title = 'Eventos Cliente';

  loading = false;
  usersCount = 0;
  eventprofile: Evento;
  roles;
  
  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';
  
  payments:Payment[];
  events: Evento[];

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;


  constructor(
    private eventosService: EventoService,
    private http: HttpClient,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.userprofile);
    // Removed this.getUsers() from here to avoid calling before userprofile is set
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getEventsporCliente();
    }
  }

  getEventsporCliente(): void {
    if (!this.userprofile || !this.userprofile.id) {
      this.isLoading = false;
      this.error = 'User profile is not defined';
      return;
    }
    this.isLoading = true;
    this.eventosService.eventsbyClient(this.userprofile.id).subscribe(
      (res: any) => {
        this.events = res.client.eventos;
        this.payments = res.client.payments;

        // Compute ticketcount for events with repeated event_id
        const countMap: { [key: number]: number } = {};
        this.payments.forEach(payment => {
          if (payment.event_id) {
            countMap[payment.event_id] = (countMap[payment.event_id] || 0) + 1;
          }
        });
        this.events.forEach(event => {
          if (countMap[event.id] > 1) {
            event.ticketcount = countMap[event.id];
          }
        });

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
    this.getEventsporCliente();
    this.query = '';
  }

}
