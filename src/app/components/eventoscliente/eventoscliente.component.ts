import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Payment } from 'src/app/models/payment';
import { CompanyService } from 'src/app/services/company.service';
import { EventoService } from 'src/app/services/evento.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventoscliente',
  standalone: false,
  templateUrl: './eventoscliente.component.html',
  styleUrls: ['./eventoscliente.component.css']
})
export class EventosclienteComponent implements OnChanges {
  @Input() userprofile: any;
  @Input() companySelected: any;
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

  payments: Payment[];
  events: Evento[];

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;
  company_id: number = null;

  constructor(
    private eventosService: EventoService,
    private companyService: CompanyService,
    private http: HttpClient,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.userprofile);
    console.log(this.companySelected);
    // Removed this.getUsers() from here to avoid calling before userprofile is set
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getEventsporCliente();
    }
    if (changes['companySelected'] && this.companySelected && this.companySelected.id) {
      this.getEventsporCompany();
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

  getEventsporCompany(): void {
    if (!this.companySelected || !this.companySelected.id) {
      this.isLoading = false;
      this.error = 'Company is not defined';
      return;
    }
    this.isLoading = true;
    this.companyService.eventsById(this.companySelected.id).subscribe(
      (res: any) => {
        this.events = res.company.eventos;
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

  removeEvento(evento: number) {
    debugger
    this.company_id = this.companySelected.id
    const data = {
      event_id: evento,
      company_id: this.companySelected.id
    }
    this.companyService.removeEvent(this.company_id, data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Evento eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getEventsporCompany();
      })
  }

}
