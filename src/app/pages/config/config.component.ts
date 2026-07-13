import { Component } from '@angular/core';
import { Paymentmethod } from 'src/app/models/paymentmethod';
import { AuthService } from 'src/app/services/auth.service';
import { PaimentmethodService } from 'src/app/services/paymentmethod.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-config',
  standalone: false,
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css'],
})
export class ConfigComponent {
  idconf: number = 1;

  title = 'Configuración';
  public tiposdepago: Paymentmethod;
  error: string;
  uploadError: string;
  tipoSeleccionado: any;
  pagoSeleccionado: any;
  tiposdepagos: any;
  isLoading: boolean = false;
  bankAccountType: string;
  bankName: string;
  bankAccount: string;
  ciorif: string;
  telefono: string;
  email: string;
  tipo: string;
  public option_selected: number = 1;
  public solicitud_selected: any = null;
  user:any

  constructor(
    private paymentMethodService: PaimentmethodService,
    private accountService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    
    this.accountService.closeMenu();
    this.user = this.accountService.userprofile;
    this.getUserRemoto()
  }

  selectedTypeEdit(tipo: any) {
    this.pagoSeleccionado = tipo;
    // console.log(this.pagoSeleccionado);
  }

  selectedType(tipodepago: any) {
    this.tipoSeleccionado = tipodepago;
    // console.log(this.tipoSeleccionado);
  }
  getUserRemoto(){
    this.userService.getUserById(this.user.id).subscribe((resp:any)=>{
      this.user = resp.user;
      this.getTiposdePago();
    })
  }

  getTiposdePago() {
    this.isLoading = true;
    this.paymentMethodService.getPaymentMethodByTiendaId(this.user.company_id).subscribe((resp: any) => {
      this.tiposdepagos = resp;
      this.isLoading = false;
    });
  }

  cambiarStatus(tipodepago: any) {
    const VALUE = tipodepago.status;
    // console.log(VALUE);

    this.paymentMethodService
      .updatePaymentmethod(tipodepago, tipodepago.id)
      .subscribe((resp) => {
        // console.log(resp);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actualizado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getTiposdePago();
      });
  }

  save() {
    const data = {
      tipo: this.tipo,
      bankAccountType: this.bankAccountType,
      bankName: this.bankName,
      bankAccount: this.bankAccount,
      ciorif: this.ciorif,
      telefono: this.telefono,
      email: this.email,
    };
    this.paymentMethodService
      .createPaymentmethod(data)
      .subscribe((resp: any) => {
        // console.log(resp);
        // Swal.fire('Actualizado', this.text_success, 'success' );

        this.bankAccountType = '';
        this.bankName = '';
        this.bankAccount = '';
        this.ciorif = '';
        this.telefono = '';
        this.email = '';
        // this.tipo ='';
        this.getTiposdePago();
      });
  }

  deleteTipoPago(tiposdepago: any) {
    this.paymentMethodService
      .deletePaymentmethod(tiposdepago.id)
      .subscribe((resp: any) => {
        this.getTiposdePago();
      });
  }

  optionSelected(value: number) {
    this.option_selected = value;
    if (this.option_selected === 1) {
      // this.ngOnInit();
    }
    if (this.option_selected === 2) {
      this.solicitud_selected = null;
    }
    if (this.option_selected === 3) {
      this.solicitud_selected = null;
    }
  }
}
