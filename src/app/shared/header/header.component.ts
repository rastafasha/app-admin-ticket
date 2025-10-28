import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../models/users';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/services/configuracion.service';
import { Configuracion } from 'src/app/models/configuracion';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {


  error: string;

  users: User;

  user: any;
  roles: any;
  
  id:any;
  userprofile!: any;
  idconf:number = 1;
  config: Configuracion;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private confgService: ConfiguracionService
    ) {
      // this.user = this.authService.getUsuario;
    }



  ngOnInit() {

    this.authService.getRole();
    this.id = this.user.id;
    // this.getConfId();

  }

  getConfId(){
    this.confgService.getSetting(this.idconf).subscribe((resp:any)=>{
      this.config = resp.configuracion;
      // console.log(this.config);
    })
  }


  openMenu(){

    var menuLateral = document.getElementsByClassName("mini-sidebar");
      for (var i = 0; i<menuLateral.length; i++) {
         menuLateral[i].classList.toggle("show-sidebar");
        //console.log('pulsado', menuLateral);

      }
  }

  logout(){
    this.authService.logout();
  }

  openModal(){

    var modalcart = document.getElementsByClassName("dropdown-menu");
      for (var i = 0; i<modalcart.length; i++) {
         modalcart[i].classList.toggle("show");

      }
  }



}
