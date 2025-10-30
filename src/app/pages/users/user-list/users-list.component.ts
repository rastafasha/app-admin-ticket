import { Component, OnInit } from '@angular/core';

import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  title = "Partners"

  isLoading = false;
  usersCount = 0;
  usuarios: any;
  user: any;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query:string ='';

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  constructor(
    private userService: UserService,
    private location: Location,
    private http: HttpClient,
    public accountService:AuthService,
    handler: HttpBackend
    ) {
      this.http = new HttpClient(handler);
    }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.config();
    this.accountService.closeMenu();
    this.getUsers();
  }




  getUsers(): void {
    this.isLoading = true;
    this.userService.getAll().subscribe(
      (res:any) =>{
        this.usuarios = res.users.data;
        error => this.error = error;
        this.isLoading = false;
        // console.log(this.usuarios);
      }
    );
  }

  config(): void {

    this.userService.config().subscribe(
      (res:any) =>{
        this.roles = res.roles;
      }
    );
  }

  // cambiarRole(selectedValue, id:any) {debugger
  //   const userToUpdate = { ...this.user, role: selectedValue };
  //   this.userService.update(userToUpdate).subscribe(
  //     (resp:any) => {
  //       console.log(resp);
  //       Swal.fire('Actualizado', `actualizado correctamente`, 'success');
  //       this.getUsers();
  //     },
  //     (error) => {
  //       console.error(error);
  //       Swal.fire('Error', `Error al actualizar`, 'error');
  //     }
  //   );
  // }

  cambiarRole(user: User){
    this.userService.updateUserRole(user).subscribe(
      resp =>{ console.log(resp);
        Swal.fire({
                              position: 'top-end',
                              icon: 'success',
                              title: 'Actualizado',
                              showConfirmButton: false,
                              timer: 1500,
                            });
        this.getUsers();
      }
    )
  }




  eliminarUser(user:User){
    this.userService.deleteById(user).subscribe(
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
    return this.userService.search(this.query).subscribe(
      (res:any)=>{
        console.log(res);
        this.usuarios = res;
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
