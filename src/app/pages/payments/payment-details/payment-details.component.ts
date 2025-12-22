import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { ClientService } from 'src/app/services/client.service';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  @Input() eventProfile: Evento;
  
  title = "Detalle Pago";
  payment: Payment;
  error: string;
  event_id: number;
  client_id: number;
  cliente: Cliente;
  event: Evento;
  isLoading: boolean = false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private eventService: EventoService,
    private clientService: ClientService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log(this.eventProfile);
    this.activatedRoute.params.subscribe(({ id }) => this.getPagoById(id));
  }
  getUser(id: number) {
    this.paymentService.getPagosbyUser(id).subscribe(
      res => {
        this.payment = res;
        error => this.error = error;
      }
    );
  }

  getPagoById(id: number) {
    this.isLoading = true;
    this.paymentService.getPagoById(+id).subscribe(
      res => {
        this.payment = res;
        this.client_id = res.client_id;
        this.getClient();
        this.event_id = res.event_id;
        setTimeout(() => {
          this.getEvent();
        }, 500)
        this.isLoading = false;
      }


    )
  }
  getClient() {
    this.clientService.getUserById(this.client_id).subscribe((resp: any) => {
      this.cliente = resp.cliente;

    })
  }
  getEvent() {
    this.eventService.getById(this.event_id).subscribe((resp: any) => {
      this.event = resp.event;
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  cambiarStatus(data: any) {
    const VALUE = data.status;

    this.paymentService.updateStatus(data, data.id).subscribe(
      resp => {

        console.log(resp);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.ngOnInit();
      }
    )
  }

}
