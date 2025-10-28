import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  selector: 'app-listapaymentshijo',
  standalone: false,
  templateUrl: './listapaymentshijo.component.html',
  styleUrls: ['./listapaymentshijo.component.css']
})
export class ListapaymentshijoComponent implements OnChanges {
   @Input() selectedStudentProfile: Student;
    
      title = 'Padres';
    
      loading = false;
      usersCount = 0;
      students: Student;
      payments: Payment;
    
      p: number = 1;
      count: number = 8;
      isLoading = false;
      error: string;
      selectedValue!: any;
      msm_error: string;
      query: string = '';
    
      ServerUrl = environment.url_servicios;
    
      constructor(
        private parentService: ParentService,
        private paymentService: PaymentService,
        private studentService: StudentService,
        private http: HttpClient,
        handler: HttpBackend
      ) {
        this.http = new HttpClient(handler);
      }
    
      ngOnInit(): void {
        window.scrollTo(0, 0);
        
        
        // this.getPaymentsbyStudent();
      }

      ngOnChanges(changes: SimpleChanges): void {
        this.selectedStudentProfile;
        // console.log(this.selectedStudentProfile);
        if (changes['selectedStudentProfile'] && changes['selectedStudentProfile'].currentValue) {
          this.getPaymentsbyStudent();
        }
      }
    
      getPaymentsbyStudent(){
        this.isLoading = true;
        this.studentService.getPaymentById(this.selectedStudentProfile.id).subscribe((resp:any)=>{
          this.payments = resp.payments;
          this.isLoading = false;
          // console.log(this.payments);
        })
      }
    
      search() {
        return this.studentService.search(this.query).subscribe((res: any) => {
          // console.log(res);
          this.students = res;
          if (!this.query) {
            this.ngOnInit();
          }
        });
      }
    
      public PageSize(): void {
        this.getPaymentsbyStudent();
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
      this.getPaymentsbyStudent();
    });
  }
}
