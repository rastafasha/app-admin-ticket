import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, Location, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-payments',

  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent implements OnInit {

  @ViewChild('viewClient', { static: false }) offcanvasElement!: ElementRef;
  @ViewChild('viewPayment', { static: false }) offcanvasElement1!: ElementRef;

  title = 'Pagos';

  payments: Payment;
  error: string;
  p: number = 1;
  count: number = 8;
  isLoading:boolean

  public user;
  query: string = '';

  public selectedValue: number = new Date().getFullYear();
  public query_income_year: any = [];
   public ventasDataYear: any[] = [];
   clientSeleccionado:Cliente;
   pagoSeleccionado:Payment;

  constructor(
    private location: Location,
    private paymentService: PaymentService,
    private userService: UserService,
    public accountService: AuthService,
    private http: HttpClient
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    // this.closeMenu();

    this.accountService.closeMenu();
    this.getPagos();
    window.scrollTo(0, 0);
    // this.getPagos_list();
  }

  

  getPagos(): void {
    this.isLoading = true;
    this.paymentService.getAll().subscribe((res: any) => {
      this.payments = res.data;
      (error) => (this.error = error);
      this.isLoading = false;
      // console.log(this.payments);
    });
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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

  cambiarStatus(data:any){
    const VALUE = data.status;
    console.log(VALUE);
    
    this.paymentService.updateStatus(data, data.id).subscribe(
      resp =>{

        console.log(resp);
        Swal.fire({
                      position: 'top-end',
                      icon: 'success',
                      title: 'Actualizado',
                      showConfirmButton: false,
                      timer: 1500,
                    });
        this.getPagos();
      }
    )
  }

  selectedYear() {
    console.log(this.selectedValue);
    this.getDashboardAdminYear();
  }
  selecedList: any = [
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
    { value: '2025' },
    { value: '2026' },
    { value: '2027' },
    { value: '2028' },
    { value: '2029' },
    { value: '2030' },
  ];

  getDashboardAdminYear() {
    this.paymentService.getPagosStatusbyYear(this.selectedValue).subscribe((resp: any) => {
      this.payments = resp.payments;
      console.log(this.payments)

    })
  }

openViewDetail(pago: Cliente) {
    this.clientSeleccionado = pago;
    console.log(pago)

  }
openViewDetailPago(pago: Payment) {
    this.pagoSeleccionado = pago;

  }



}
