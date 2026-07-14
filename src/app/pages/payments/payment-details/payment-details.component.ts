import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { ClientService } from 'src/app/services/client.service';
import { Cliente } from 'src/app/models/cliente';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
@Component({
  selector: 'app-payment-details',
  standalone: false,
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnChanges {
  @Input() pagoSeleccionado: Payment;

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshCatList: EventEmitter<void> = new EventEmitter<void>();


  title = "Detalle Pago";
  detino = 'payments';
  payment: Payment;
  error: string;
  event_id: number;
  client_id: number;
  cliente: Cliente;
  event: Evento;
  isLoading: boolean = false;
  isOpen = false;

  constructor(
    private paymentService: PaymentService,
    private eventService: EventoService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si llega un pago seleccionado válido desde el padre, abre el Offcanvas automáticamente
    if (changes['pagoSeleccionado'] && this.pagoSeleccionado) {
      console.log(this.pagoSeleccionado)
      // this.getPagoById(this.pagoSeleccionado.id);
      this.isOpen = true;
    }
  }

  onClose() {
    this.pagoSeleccionado = null;
    this.closeModal.emit();
    this.refreshCatList.emit();
  }

  

  getPagoById(id: number) {
    this.isLoading = true;
    this.paymentService.getPagoById(+id).subscribe(
      (res: any) => {
        this.payment = res.payment;
        console.log(res)
        this.isLoading = false;
        this.client_id = res.client_id;
        // this.getClient();
        this.event_id = res.event_id;
        // setTimeout(() => {
        //   this.getEvent();
        // }, 500)
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



}
