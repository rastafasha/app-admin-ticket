import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule, Location, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recentpayments',
  standalone: false,
  templateUrl: './recentpayments.component.html',
  styleUrls: ['./recentpayments.component.css'],
})
export class RecentpaymentsComponent {

  @Output() onAbrirModalPago = new EventEmitter<number>();
  @Output() onAbrirModalClient = new EventEmitter<number>();

  title = 'Pagos';

  payments: Payment;
  error: string;
  p: number = 1;
  count: number = 8;
  isLoading: boolean = false;
  public user;
  query: string = '';

  constructor(
    private paymentService: PaymentService,
    private userService: UserService,
    private accountService: AuthService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = this.accountService.userprofile;
    if (this.user.roles[0] === 'SUPERADMIN') {
      this.getPagosRecientes();
    } else {

      this.getUserRemoto()
    }
  }

  getUserRemoto() {
    this.userService.getUserById(this.user.id).subscribe((resp: any) => {
      this.user = resp.user;
      this.getPagosRecientesTienda();
    })
  }

  getPagosRecientes(): void {
    this.isLoading = true;
    this.paymentService.getRecientes().subscribe((res: any) => {
      this.payments = res.data;
      (error) => (this.error = error);
      this.isLoading = false;
    });
  }
  getPagosRecientesTienda(): void {
    this.isLoading = true;
    this.paymentService.getRecientesTienda(this.user.company_id).subscribe((res: any) => {
      this.payments = res.data;
      (error) => (this.error = error);
      this.isLoading = false;
    });
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
    this.ngOnInit();
    this.query = '';
  }

  cambiarStatus(data: any) {
    const VALUE = data.status;
    console.log(VALUE);

    this.paymentService.updateStatus(data, data.id).subscribe((resp) => {
      console.log(resp);
      // Swal.fire('Actualizado', `actualizado correctamente`, 'success');
      // this.toaster.open({
      //   text:'Producto Actualizado!',
      //   caption:'Mensaje de Validación',
      //   type:'success',
      // })
      this.ngOnInit();
    });
  }

  

  redireccionarPago(pagoId: number) {
    this.onAbrirModalPago.emit(pagoId);
  }
  redireccionarClient(clientId: number) {
    this.onAbrirModalClient.emit(clientId);
  }
}
