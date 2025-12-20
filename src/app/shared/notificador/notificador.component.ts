import { Component, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { PaymentService } from '../../services/payment.service';
import { Payment } from 'src/app/models/payment';
@Component({
  selector: 'app-notificador',
  templateUrl: './notificador.component.html',
  styles: ['.notificador { width: auto; position: fixed; bottom: 20px; right: 20px; z-index: 1050; }'],

})
export class NotificadorComponent {

  mensaje: Payment | any;
  showNotificacion: boolean = false;
  
  private paymentService = inject(PaymentService);

  // Aquí puedes agregar lógica para mostrar notificaciones basadas en eventos del TicketService
  
  ngOnInit(): void {
    this.notificadorMensaje('');
  }
// Por ejemplo, suscribirte a un observable que emita cuando recibe un nuevo pago o compra
  notificadorMensaje(mensaje: string){
    this.paymentService.getRecientes().subscribe((msg:any) => {
      this.mensaje = msg.data;
      console.log(this.mensaje)

      if (this.mensaje[0].status === 'PENDING') {
        this.showNotificacion = true;
      }
      // Aquí puedes agregar lógica para mostrar la notificación en la interfaz de usuario
      // Evitar acceder a propiedades inexistentes en Payment; usar un cast seguro y un valor por defecto
      const amount = this.mensaje[0].monto ?? 'desconocido';
      const description = this.mensaje[0].referencia ?? '';
      this.mensaje = 'Nuevo pago recibido: ' + ' $ '+ amount + ' por ' + description;

      
    });
  }

  closeNotificacion(){
    this.mensaje = '';
    this.showNotificacion = false;

  }

  


}
