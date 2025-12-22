import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listapayments',
  standalone: false,
  templateUrl: './listapayments.component.html',
  styleUrls: ['./listapayments.component.css']
})
export class ListapaymentsComponent {
   @Input() userprofile: Cliente;
  
    title = 'Padres';
    isLoading = false;
    loading = false;
    usersCount = 0;
    payments: Payment;
  
    p: number = 1;
    count: number = 8;
  
    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
  
    constructor(
      private paymentService: PaymentService,
      private http: HttpClient,
      handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }
  
  ngOnInit(): void {
      window.scrollTo(0, 0);
      // console.log(this.userprofile);
      // Removed call to getPayments here to avoid accessing userprofile before it's set
      
    }

    ngOnChanges(): void {
      if (this.userprofile && this.userprofile.id) {
        this.getPayments();
      }
    }

    getPayments(): void {
      if (!this.userprofile || !this.userprofile.id) {
        this.isLoading = false;
        this.error = 'Parent profile is not defined.';
        return;
      }
      this.isLoading = true;
      this.paymentService.getPagosbyUser(this.userprofile.id).subscribe(
        (res: any) => {
          this.payments = res;
          
          this.isLoading = false;
          
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }

    getEvento(){
      
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

    cambiarStatus(data: any) {
    const VALUE = data.status;
    console.log(VALUE);

    this.paymentService.updateStatus(data, data.id).subscribe((resp) => {
      console.log(resp);
      Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Actualizado',
                    showConfirmButton: false,
                    timer: 1500,
                  });
      this.getPayments();
    });
  }
}
