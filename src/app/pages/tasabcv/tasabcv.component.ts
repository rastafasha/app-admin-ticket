import { Component } from '@angular/core';
import { Paymentmethod } from 'src/app/models/paymentmethod';
import { Tasabcv } from 'src/app/models/tasabcba';
import { AuthService } from 'src/app/services/auth.service';
import { TasabcvService } from 'src/app/services/tasabcv.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasabcv',
  templateUrl: './tasabcv.component.html',
  styleUrls: ['./tasabcv.component.css'],
})
export class TasabcvComponent {
  public tasasbcv: Tasabcv;
  error: string;
  uploadError: string;
  precio_dia:number;
  id:number;
  tipoSeleccionado:boolean=false;
  title='Tasa de cambio BCV';
  isLoading:boolean = false;

  constructor(
    private tasaBcvService: TasabcvService,
    private accountService: AuthService
  ) {}

  ngOnInit(): void {
    this.getTiposdePago();
    this.accountService.closeMenu();
  }

  
  getTiposdePago() {
    this.isLoading = true;
    this.tasaBcvService.getTasas().subscribe((resp: any) => {
      this.tasasbcv= resp;
      this.isLoading = false;
      // console.log(this.tiposdepagos);
    });
  }


  save() {
    const data = {
      precio_dia: this.precio_dia,
    };
    this.tasaBcvService
      .createTasaBcv(data)
      .subscribe((resp: any) => {
        // console.log(resp);
        this.precio_dia ;
        // this.tipo ='';
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

  deleteTipoPago(tiposdepago: any) {
    this.tasaBcvService
      .deleteTasaBcv(tiposdepago.id)
      .subscribe((resp: any) => {
        this.getTiposdePago();
      });
  }
}
