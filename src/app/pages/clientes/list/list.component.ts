import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/users';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/services/client.service';
import { Payment } from 'src/app/models/payment';
import { AuthService } from 'src/app/services/auth.service';
import { Cliente } from 'src/app/models/cliente';
import { UserService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  @ViewChild('viewClient', { static: false }) offcanvasElement!: ElementRef;
  
  title = "Clientes";

  loading = false;
  usersCount = 0;
  clientes: Cliente;
  user: any;
  roles;
  isLoading: boolean = false;

  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';
  payments: Payment;

  ServerUrl = environment.url_servicios;
  doctores;
  clientSeleccionado: Cliente;

  constructor(
    private clientService: ClientService,
    private location: Location,
    private http: HttpClient,
    public accountService: AuthService,
    public userService: UserService,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.accountService.closeMenu();
     this.user = this.accountService.userprofile;
      
      if(this.user.roles[0] === 'SUPERADMIN'){
        this.getUsers();
      }else{
        this.getUserRemoto()
      }
  }
 getUserRemoto(){
    this.userService.getUserById(this.user.id).subscribe((resp:any)=>{
      this.user = resp.user;
      this.getClientesTienda();
    })
  }

  getClientesTienda(): void {
    this.isLoading = true;
    this.clientService.getClientesByTiendaId(this.user.company_id).subscribe(
      (res: any) => {
        this.clientes = res.clientes;
        error => this.error = error;
        this.isLoading = false;
        // console.log(this.parents);
      }
    );
  }

  getUsers(): void {
    this.isLoading = true;
    this.clientService.getAll().subscribe(
      (res: any) => {
        this.clientes = res.clientes.data;
        error => this.error = error;
        this.isLoading = false;
        // console.log(this.parents);
      }
    );
  }


  eliminarUser(user: User) {

    Swal.fire({
      title: "Quieres borrar este usuario?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't save`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.clientService.deleteById(user).subscribe(
          response => {
            this.getUsers();
          },
          error => {
            this.msm_error = 'No se pudo eliminar el curso, vuelva a intentar.'
          }
        );
        Swal.fire("Saved!", "", "success");
        this.ngOnInit();
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
        // this.ngOnInit();
      }
    });



  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  cambiarStatus(userprofile: any) {
    const VALUE = userprofile.status;
    const data = {
      status: VALUE
    }

    this.clientService.updateStatus(data, userprofile.id).subscribe((resp) => {
      // console.log(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 1500,
      });
      this.ngOnInit();
    });
  }

  search() {
    return this.clientService.search(this.query).subscribe(
      (res: any) => {
        this.clientes = res;
        if (!this.query) {
          this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    this.ngOnInit();
    this.query = '';
  }

  openViewDetail(client: Cliente) {
    this.clientSeleccionado = client;

  }
}
