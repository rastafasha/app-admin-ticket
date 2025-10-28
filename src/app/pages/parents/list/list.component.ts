import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { ParentService } from 'src/app/services/parent-service.service';
import { Payment } from 'src/app/models/payment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  title = "Clientes";
  
    loading = false;
    usersCount = 0;
    clientes: any;
    user: any;
    roles;
    isLoading:boolean=false;
  
    p: number = 1;
    count: number = 8;
  
    error: string;
    selectedValue!: any;
    msm_error: string;
    query:string ='';
    payments:Payment;
  
    ServerUrl = environment.url_servicios;
    doctores;
    // role:any;
  
    constructor(
      private parentService: ParentService,
      private location: Location,
      private http: HttpClient,
      public accountService: AuthService,
      handler: HttpBackend
      ) {
        this.http = new HttpClient(handler);
      }
  
    ngOnInit(): void {
      window.scrollTo(0,0);
      this.accountService.closeMenu();
      this.getUsers();
    }
  
  
    getUsers(): void {
      this.isLoading = true;
      this.parentService.getAll().subscribe(
        (res:any) =>{
          this.clientes = res.clientes;
          error => this.error = error;
          this.isLoading = false;
          // console.log(this.parents);
        }
      );
    }
  
  
    eliminarUser(user:User){
      this.parentService.deleteById(user).subscribe(
        response =>{
          this.getUsers();
        },
        error=>{
          this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
        }
        );
        this.ngOnInit();
    }
  
    goBack() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  
    search() {
      return this.parentService.search(this.query).subscribe(
        (res:any)=>{
          this.clientes = res;
          if(!this.query){
            this.ngOnInit();
          }
        });
    }
  
    public PageSize(): void {
      this.getUsers();
      this.query = '';
    }
}
