import { Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/users.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ClientService } from 'src/app/services/client.service';
import { Cliente } from 'src/app/models/cliente';

declare var bootstrap: any;
@Component({
  selector: 'app-eventos',
  standalone: false,
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent {

  @ViewChild('viewEvent', { static: false }) offcanvasElement!: ElementRef;

  @Input() event_id: string;
  @Input() user_id: string;

  title = "Eventos";

  loading = false;
  usersCount = 0;
  eventos: any;
  user: any;
  roles;
  role;
  isLoading: boolean = false;

  p: number = 1;
  id: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';
  payments: Payment;
  eventSeleccionado: Evento;
  eventoSeleccionado: Evento;
  pagoSeleccionado: Payment;
  clientSeleccionado: Cliente;

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  constructor(
    private eventosService: EventoService,
    private location: Location,
    private http: HttpClient,
    public accountService: AuthService,
    public activatedRoute: ActivatedRoute,
    public userService: UserService,
    public paymentService: PaymentService,
    public clientService: ClientService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.accountService.closeMenu();
    this.role = this.accountService.role;

    this.user = this.accountService.userprofile;

    if (this.user.roles[0] === 'SUPERADMIN') {
      this.getEvents();
    } else {
      this.getUserRemoto()
    }
  }
  getUserRemoto() {
    this.userService.getUserById(this.user.id).subscribe((resp: any) => {
      this.user = resp.user;
      this.getEventsbyTienda()
    })
  }




  getEvents(): void {
    this.isLoading = true;
    this.eventosService.getAll().subscribe(
      (res: any) => {
        this.eventos = res.events.data;
        error => this.error = error;
        this.isLoading = false;
        // console.log(this.students);
      }
    );
  }

  getEventsbyTienda(): void {
    this.isLoading = true;
    this.eventosService.getByTiendaId(this.user.company_id).subscribe(
      (res: any) => {
        this.eventos = res.events;
        error => this.error = error;
        this.isLoading = false;
      }
    );
  }



  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  search() {
    return this.eventosService.search(this.query).subscribe(
      (res: any) => {
        console.log(res);
        console.log(this.query);
        this.eventos = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    this.ngOnInit();
    this.query = '';
  }


  cambiarStatus(eventprofile: any) {
    const VALUE = eventprofile.status;

    const data = {
      status: VALUE
    }


    this.eventosService.updateStatus(data, eventprofile.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.ngOnInit();
    });
  }

  onEditProject(evento: Evento) {
    this.eventSeleccionado = evento;
  }

  openEditModal(): void {
    this.eventSeleccionado = null;
  }

  openViewDetail(evento: Evento) {
    this.eventoSeleccionado = evento;
  }


  onCloseModal(): void {
    this.eventSeleccionado = null;
  }

  onClose() {
    this.ngOnInit();
  }


  manejarCambioModalPagoId(pagoId: number) {
  console.log('recibe final', pagoId);

  // 1. Buscamos y cerramos el modal actual (el de eventos) para que no se trabe el fondo oscuro
  const modalEventoEl = document.getElementById('viewEvento');
  if (modalEventoEl) {
    const modalEvento = bootstrap.Modal.getInstance(modalEventoEl);
    modalEvento?.hide();
  }

  // 2. Cargamos los datos desde la API
  this.cargarDatosDelPago(pagoId);

  // 3. Esperamos 350ms a que la animación de cierre termine para abrir el nuevo modal de forma segura
  setTimeout(() => {
    const modalPagoEl = document.getElementById('viewPayment');

    // Validación de seguridad para el DOM
    if (!modalPagoEl) {
      console.error("ERROR: No se encontró ningún elemento en el DOM con el id 'viewPayment'. Verifica que tu <div class=\"modal\" id=\"viewPayment\"> esté en el HTML del padre.");
      return; 
    }

    // Inicializa y muestra con seguridad
    const modalPago = new bootstrap.Modal(modalPagoEl);
    modalPago.show();
  }, 350);
}

cargarDatosDelPago(id: number) {
  this.paymentService.getPagoById(id).subscribe(resp => {
    // Asegúrate de que 'resp.payment' coincida exactamente con la respuesta de tu backend
    this.pagoSeleccionado = resp.payment;
    console.log('Datos del pago cargados:', resp);
  });
}


  manejarCambioModalClient(clientId: number) {
   
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
  }

  cargarDatosDelClient(id: number) {
    this.clientService.getUserById(id).subscribe(resp => {
      this.clientSeleccionado = resp.cliente;
      console.log(resp)
    });
  }

} 
