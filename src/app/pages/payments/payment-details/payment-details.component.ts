import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { StudentService } from 'src/app/services/student-service.service';
import { ParentService } from 'src/app/services/parent-service.service';
import { Parent } from 'src/app/models/parents';
import { Student } from 'src/app/models/student';
import Swal from 'sweetalert2';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/services/evento.service';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  title = "Detalle Pago";
  payment: Payment;
  error: string;
  event_id:number;
  client_id:number;
  cliente:Parent;
  event:Evento;
  isLoading:boolean=false;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private paymentService: PaymentService,
    private eventService: EventoService,
    private parentService: ParentService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.activatedRoute.params.subscribe( ({id}) => this.getPagoById(id));
  }
  getUser(id:number){
    this.paymentService.getPagosbyUser(id).subscribe(
      res =>{
        this.payment = res;
        error => this.error = error
        // console.log(this.payment);
      }
    );
  }

  getPagoById(id:number){
    this.isLoading= true;
    this.paymentService.getPagoById(id).subscribe(
      res=>{
        this.payment = res;
        console.log(res);
        this.client_id = res.client_id;
        this.event_id = res.event_id;
        this.isLoading = false;
        this.getClient();
        this.getEvent();
      }

    )
  }
  getClient(){
    this.parentService.getUserById(this.client_id).subscribe((resp:any)=>{
      console.log(resp);
      this.cliente = resp.cliente;

    })
  }
  getEvent(){
    this.eventService.getById(this.event_id).subscribe((resp:Evento)=>{
      this.event = resp;
      console.log(this.event);
    })
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
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
        this.ngOnInit();
      }
    )
  }

}
