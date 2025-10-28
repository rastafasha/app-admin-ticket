import { Component } from '@angular/core';
import { Parent } from 'src/app/models/parents';
import { AuthService } from 'src/app/services/auth.service';
import { TasabcvService } from 'src/app/services/tasabcv.service';

@Component({
  selector: 'app-tasadiabcv',
  templateUrl: './tasadiabcv.component.html',
  styleUrls: ['./tasadiabcv.component.css']
})
export class TasadiabcvComponent {

  isLoading:boolean = false;
  isProfile:boolean = false;
  public profile: Parent = new Parent();
  precio_dia!:number;
  precio_fecha!:Date;
  user:any;

  constructor(
    private tasaBcvService: TasabcvService,
  ) {
  }
  ngOnInit() {
    this.getTasaDBcvdelDia();
    // console.log(this.user);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
  }
  getTasaDBcvdelDia() {
    this.isLoading = true;
    this.tasaBcvService.getTasas().subscribe((resp:any)=>{
      this.precio_dia = resp[0].precio_dia
      this.precio_fecha = resp[0].created_at
      this.isLoading = false;
      // console.log(resp);
    })
  }
}
