import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recentpayments',
  standalone: false,
  templateUrl: './recentpayments.component.html',
  styleUrls: ['./recentpayments.component.css'],
})
export class RecentpaymentsComponent {
  title = 'Pagos';

  payments: Payment;
  error: string;
  p: number = 1;
  count: number = 8;
  isLoading:boolean = false;
  public user;
  query: string = '';

  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.getPagos();
    window.scrollTo(0, 0);
    // this.getPagos_list();
    // if (this.user.role != 'PARTNER') {
    //   // this.router.navigateByUrl('/dashboard');
    //   // this.loadPaymentsbyEvent();
    // }
  }

  getPagos(): void {
    this.isLoading = true;
    this.paymentService.getRecientes().subscribe((res: any) => {
      this.payments = res.data;
      (error) => (this.error = error);
      this.isLoading = false;
      // console.log(this.payments);
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
    this.getPagos();
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
      this.getPagos();
    });
  }
}
