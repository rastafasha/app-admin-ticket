import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Calificacion } from 'src/app/models/calificacion';
import { Evento } from 'src/app/models/evento';
import { Examen } from 'src/app/models/examen';
import { Payment } from 'src/app/models/payment';
import { Student } from 'src/app/models/student';
import { EventoService } from 'src/app/services/evento.service';
import { ExamenService } from 'src/app/services/examen.service';
import { ParentService } from 'src/app/services/parent-service.service';
import { PaymentService } from 'src/app/services/payment.service';
import { StudentService } from 'src/app/services/student-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-examenes-student',
  templateUrl: './examenes-student.component.html',
  styleUrls: ['./examenes-student.component.css']
})
export class ExamenesStudentComponent implements OnChanges{
  @Input() eventprofile:Evento;

  isLoading = false;
    title = 'Pagos';
  
    loading = false;
    usersCount = 0;
    payments: Payment;
    studentprofile: Evento;
    p: number = 1;
    count: number = 8;
  
    error: string;
    selectedValue!: any;
    msm_error: string;
    query: string = '';
  
    ServerUrl = environment.url_servicios;
    doctores;
    // role:any;
  
    selectedStudentProfile: Evento;
  
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
      if (changes['eventprofile'] && this.eventprofile && this.eventprofile.id) {
        this.getPayments();
      }
    }

    getPayments(): void {
      if (!this.eventprofile || !this.eventprofile.id) {
        this.isLoading = false;
        this.error = 'Event profile is not defined';
        return;
      }
      this.isLoading = true;
      this.paymentService.getPaymentByEventId(this.eventprofile.id).subscribe(
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
  
}
