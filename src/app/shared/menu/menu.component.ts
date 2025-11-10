import { Component, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/services/auth.service';
//declare function init_plugins();

declare var $: any;
declare var jQuery: any;



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: []
})


export class MenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav;

  user:any;
  role:any;
  roles:any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    //init_plugins();

    let USER = localStorage.getItem("user");
     if (USER) {
      try {
        this.user = JSON.parse(USER);
        this.role = this.user.roles && this.user.roles.length > 0 ? this.user.roles[0] : '';
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
        this.user = null;
        this.role = '';
      }
    } else {
      this.user = null;
      this.role = '';
    }
    // this.authService.getRole();
    // this.user = this.authService.userprofile;
    // this.role = this.authService.role;
    
  }

  toggleNav(){
    this.sidenav.toggle();
  }

  logout(){
    this.authService.logout();
  }

}
