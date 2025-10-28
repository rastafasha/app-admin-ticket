import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dashboard } from 'src/app/models/dashboard';
import { Parent } from 'src/app/models/parents';
import { AuthService } from 'src/app/services/auth.service';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

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
  userprofile:any;
  roles: any;

  constructor(
    private dashboardService: DashboardService,
    public accountService:AuthService
    ) {}

  ngOnInit() {

    window.scrollTo(0, 0);

    this.role = this.accountService.role;
    this.userprofile = this.user;
    this.accountService.closeMenu();
    this.getDashboardData();

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

  public PageSize(): void {
      // this.getDirectorios();
      this.query = '';
    }
  
  
    search() {
      // return this.directorioService.search(this.query).subscribe(
      //   (res:any)=>{
      //     this.directories = res;
      //     if(!this.query){
      //       this.ngOnInit();
      //     }
      //   });
    }


}
