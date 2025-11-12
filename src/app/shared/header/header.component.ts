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
  darkmode: boolean = false;

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
    this.authService.getLocalDarkMode();
    this.authService.getRole();
    let USER = localStorage.getItem("user");
     if (USER) {
      try {
        this.user = JSON.parse(USER);
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.user = null;
      }
    } else {
      this.user = null;
    }
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

  onDarkMode(dark:string){
    var element = document.body;

    const classExists = document.getElementsByClassName(
      'darkmode'
     ).length > 0;

    var dayNight = document.getElementsByClassName("site");
      for (var i = 0; i<dayNight.length; i++) {
        // dayNight[i].classList.toggle("darkmode");
        element.classList.toggle("dark");

      }
      // localStorage.setItem('dark', dark);
      

      if (classExists) {
        localStorage.removeItem('dark');
        this.ngOnInit()
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        this.ngOnInit()
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }

  onDarkMoode(dark:string){
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    let aside = document.querySelector('aside');

    const classExists = document.getElementsByClassName(
      'darkmode'
     ).length > 0;

    var dayNight = document.getElementsByClassName("site");
      for (var i = 0; i<dayNight.length; i++) {
        dayNight[i].classList.toggle("active");
        body.classList.toggle('darkmode');
        header.classList.toggle('darkmode');
        aside.classList.toggle('darkmode');

      }
      // localStorage.setItem('dark', dark);

      if (classExists) {
        localStorage.removeItem('dark');
        // console.log('✅ class exists on page, removido');
      } else {
        localStorage.setItem('dark', dark);
        // console.log('⛔️ class does NOT exist on page, agregado');
      }
      // console.log('Pulsado');
  }



}
