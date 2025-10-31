import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard';
import { Evento } from 'src/app/models/evento';
import { Parent } from 'src/app/models/parents';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { EventoService } from 'src/app/services/evento.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userprofile:any;

  error: string;
 showMatricula: boolean = false;
   showAcciones: boolean = false;
   showGenero: boolean = false;
     showNacimiento: boolean = false;
  user: any;
  parentprofile:Parent;
  role:any;
  query:string ='';
  total_clients:Dashboard;
  clients_nodeuda:Dashboard
  total_clients_deuda:Dashboard
  total_events:Dashboard;
  roles: any;
  isLoading = false;
  eventos:Evento

  constructor(
    private dashboardService: DashboardService,
    private eventosService: EventoService,
    public authService:AuthService
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

  

}

