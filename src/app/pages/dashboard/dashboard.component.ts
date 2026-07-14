import { Component, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { Dashboard } from 'src/app/models/dashboard';
import { Evento } from 'src/app/models/evento';
import { Payment } from 'src/app/models/payment';
import { AuthService } from 'src/app/services/auth.service';
import { ClientService } from 'src/app/services/client.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EventoService } from 'src/app/services/evento.service';
import { PaymentService } from 'src/app/services/payment.service';

declare var bootstrap: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userprofile:any;
  title: string ='Bienvenido';

  error: string;
 showMatricula: boolean = false;
   showAcciones: boolean = false;
   showGenero: boolean = false;
     showNacimiento: boolean = false;
  user: any;
  role:any;
  query:string ='';
  total_clients:Dashboard;
  clients_nodeuda:Dashboard
  total_clients_deuda:Dashboard
  total_events:Dashboard;
  roles: any;
  isLoading = false;
  eventos:Evento
  eventSeleccionado:Evento;
  pagoSeleccionado: Payment;
    clientSeleccionado: Cliente;

  constructor(
    private dashboardService: DashboardService,
    private eventosService: EventoService,
    public authService:AuthService,
     public paymentService: PaymentService,
        public clientService: ClientService,
    ) {}

  ngOnInit() {

    window.scrollTo(0, 0);

    this.getDashboardData();
    this.authService.closeMenu();
    this.authService.getRole();
    this.role = this.authService.role;
    this.user = this.authService.userprofile;
    this.role = this.authService.role;
    this.userprofile = this.authService.userprofile;

  }
  getDashboardData(){
    this.dashboardService.getDasboardConfig().subscribe((resp:any)=>{
      // console.log(resp);
      this.total_clients = resp.total_clients;
      this.clients_nodeuda = resp.clients_nodeuda;
      this.total_clients_deuda = resp.total_clients_deuda;
      this.total_events = resp.total_events;
    })
  }

  selectDoctor(){
      // this.dashboardDoctor();
      // this.getDoctor();
      // this.dashboardDoctorProfile();
    }

   openEditModal(): void {
    this.eventSeleccionado = null;
  }

   onClose() {
    this.ngOnInit();
  }


  manejarCambioModalPago(pagoId: number) {
    // 1. Instanciamos y cerramos el modal de la empresa de forma limpia
    const modalEventoEl = document.getElementById('viewEvento');
    const modalEvento = bootstrap.Modal.getInstance(modalEventoEl);
    modalEvento?.hide();

    // 2. Esperamos 350ms a que termine de ocultarse (evita congelar la pantalla o el fondo gris)
    setTimeout(() => {
      this.cargarDatosDelPago(pagoId);

      const modalPagoEl = document.getElementById('viewPayment');

      // Validación de seguridad para evitar el error de 'classList'
      if (!modalPagoEl) {
        console.error("ERROR: No se encontró ningún elemento en el DOM con el id 'viewPayment'. Verifica tu HTML.");
        return; // Detiene la ejecución antes de que rompa la aplicación
      }

      // Si existe, lo inicializa y lo muestra con seguridad
      const modalPago = new bootstrap.Modal(modalPagoEl);
      modalPago.show();
    }, 350);
  }

  cargarDatosDelPago(id: number) {
    this.paymentService.getPagoById(id).subscribe(resp => {
      this.pagoSeleccionado = resp.event;
    });
  }

  manejarCambioModalClient(clientId: number) {
    // 1. Instanciamos y cerramos el modal de la empresa de forma limpia
    const modalEventoEl = document.getElementById('viewEvento');
    const modalEvento = bootstrap.Modal.getInstance(modalEventoEl);
    modalEvento?.hide();

    // 2. Esperamos 350ms a que termine de ocultarse (evita congelar la pantalla o el fondo gris)
    setTimeout(() => {
      this.cargarDatosDelClient(clientId);

      const modalClientEl = document.getElementById('viewClient');

      // Validación de seguridad para evitar el error de 'classList'
      if (!modalClientEl) {
        console.error("ERROR: No se encontró ningún elemento en el DOM con el id 'viewClient'. Verifica tu HTML.");
        return; // Detiene la ejecución antes de que rompa la aplicación
      }

      // Si existe, lo inicializa y lo muestra con seguridad
      const modalClient = new bootstrap.Modal(modalClientEl);
      modalClient.show();
    }, 350);
  }

  cargarDatosDelClient(id: number) {
    this.clientService.getUserById(id).subscribe(resp => {
      this.clientSeleccionado = resp.cliente;
    });
  }
}

