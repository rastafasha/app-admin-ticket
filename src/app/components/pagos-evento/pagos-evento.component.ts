import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagos-evento',
  templateUrl: './pagos-evento.component.html',
  styleUrls: ['./pagos-evento.component.css']
})
export class PagosEventoComponent implements OnInit, OnChanges {
  @Input() eventoSeleccionado: Evento;
  @Output() onPagoSeleccionado = new EventEmitter<number>();
  @Output() onClientSeleccionado = new EventEmitter<number>();

  isLoading = false;
  title = 'Pagos';

  loading = false;
  usersCount = 0;
  payments: Payment[] = [];
  studentprofile: Evento;
  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';

  ServerUrl = environment.url_servicios;

  selectedStudentProfile: Evento;
  totalPagos: number = 0;

  constructor(
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
    if (changes['eventoSeleccionado'] && this.eventoSeleccionado && this.eventoSeleccionado.id) {
      this.getPayments();
    }
  }

  getPayments(): void {
    if (!this.eventoSeleccionado || !this.eventoSeleccionado.id) {
      this.isLoading = false;
      this.error = 'Event profile is not defined';
      return;
    }
    this.isLoading = true;
    this.paymentService.getPaymentByEventId(this.eventoSeleccionado.id).subscribe(
      (res: any) => {
        this.payments = res;
        this.isLoading = false;
        this.totalPagos = this.payments.reduce((total, pago) => total + Number(pago.monto), 0);
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  search() {
    return this.paymentService.search(this.query).subscribe((res: any) => {
      this.payments = res;
      if (!this.query) {
        this.ngOnInit();
      }
    });
  }

  public PageSize(): void {
    this.getPayments();
    this.query = '';
  }

  seleccionarSalirAbrirPago(pagoId: number) {
    this.onPagoSeleccionado.emit(pagoId);
  }

  seleccionarSalirAbrirClient(clientId: number) {
    this.onClientSeleccionado.emit(clientId);
  }

}
