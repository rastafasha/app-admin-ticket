import { Component, Input, OnChanges, OnInit,  SimpleChanges } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Cliente } from 'src/app/models/cliente';
import { Payment } from 'src/app/models/payment';
import { Evento } from 'src/app/models/evento';
@Component({
  selector: 'app-clientdetail',
  templateUrl: './clientdetail.component.html',
  styleUrls: ['./clientdetail.component.css']
})
export class ClientdetailComponent implements OnInit, OnChanges {
  @Input() clientSeleccionado: Cliente;

  title = "Detalles de la cuenta";
  detino = "clientes";
  imagePath: string;
  error: string;
  uploadError: boolean;
  display = false;
  isLoading: boolean = false;

  public option_selected: number = 1;
  public solicitud_selected: any = null;
  public selectedValue!: string;

  identity: any;

  user: Cliente;
  parent: Cliente;
  payments: Payment;
  events: Evento;
  userprofile: Cliente;

  roles: any;
  profileSeleccionado: Cliente;

  user_id: any;
  representante_id: any;
  errors: any = null;
  isOpen = false;

  constructor(
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si llega un pago seleccionado válido desde el padre, abre el Offcanvas automáticamente
    if (changes['clientSeleccionado'] && this.clientSeleccionado) {
      // this.getUserServer(this.clientSeleccionado.id );
      this.isOpen = true;
    }
  }

  onClose() {
    this.clientSeleccionado = null;
    this.option_selected = 1
    this.solicitud_selected = 1;
  }


  getUserServer(id: number) {
    this.isLoading = true;
    this.clientService.getUserById(+id).subscribe(
      (res: any) => {
        this.userprofile = res.cliente;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user by id:', error);
        this.representante_id = null;
      }
    );
  }

  public onReady(editor: any) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


  optionSelected(value: number) {
    this.option_selected = value;
    if (this.option_selected === 1) {

      // this.ngOnInit();
      this.solicitud_selected = null;
    }
    if (this.option_selected === 2) {
      this.solicitud_selected = null;
    }
    if (this.option_selected === 3) {
      this.solicitud_selected = null;

    }
  }
  

  
}
