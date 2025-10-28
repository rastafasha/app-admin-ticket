import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Parent } from 'src/app/models/parents';
import { Payment } from 'src/app/models/payment';
import { Student } from 'src/app/models/student';
import { User } from 'src/app/models/users';
import { ParentService } from 'src/app/services/parent-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StudentService } from 'src/app/services/student-service.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listapayments',
  standalone: false,
  templateUrl: './listapayments.component.html',
  styleUrls: ['./listapayments.component.css']
})
export class ListapaymentsComponent {
   @Input() userprofile: Parent;
  
    title = 'Padres';
    isLoading = false;
    loading = false;
    usersCount = 0;
    students: Student;
    payments: Payment;
  
    p: number = 1;
    count: number = 8;
  
    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
  
    constructor(
      private parentService: ParentService,
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
