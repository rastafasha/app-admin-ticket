import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css'],
})
export class EventoDetailComponent {
  title = 'Detalles del Evento';
  detino = 'eventos';
  profileForm: FormGroup;
  imagePath: string;
  error: string;
  uploadError: boolean;
  display = false;
  public option_selected: number = 1;
  public solicitud_selected: any = null;
  isLoading: boolean = false;
  public selectedValue!: string;

  identity: any;

  user: User;
  eventprofile: Evento;

  roles: any;
  profileSeleccionado: Evento;

  user_id: any;
  event_id: any;
  company_id: number;
  errors: any = null;
  users: User[] = [];
  usersevento: User[] = [];
user_empresa: any;
event: Evento;

role: any;
  constructor(
    private location: Location,
    private eventoService: EventoService,
    private companyService: CompanyService,
    private userService: UserService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // window.scrollTo(0,0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER);
    this.role = this.user.roles && this.user.roles.length > 0 ? this.user.roles[0] : '';

    
    this.closeMenu();
    this.activatedRoute.params.subscribe(({ id }) => this.getEvento(id));
    this.getUser();
    
    
  }
  closeMenu() {
    var menuLateral = document.getElementsByClassName('sidebar');
    for (var i = 0; i < menuLateral.length; i++) {
      menuLateral[i].classList.remove('active');
    }
  }
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

   getUser() {
    const id = this.user.id
    this.userService.getUserById(+id).subscribe(
      (res: any) => {
        this.user = res.user;
        this.user_empresa = res.user.empresa;
        // this.getUsersEmpresa()
        if(this.role === 'PARTNER' ){
          this.getUsersEmpresa();
        }
        if(this.role ===  'ADMIN' || this.role ===  'SUPERADMIN'){
          this.activatedRoute.params.subscribe(({ id }) => this.getUserbyEvento(id));
        }
      },
      (error) => {
        console.error('Error fetching user by id:', error);
      }
    );
  }
 
  

  getEvento(id: number) {
    this.isLoading = true;
    this.eventoService.getById(+id).subscribe(
      (res: any) => {
        this.eventprofile = res.event;
        // this.calificaciones = res.calificaciones;
        if (res.event && res.event.id) {
          this.event_id = res.event.id;
          this.company_id = res.event.company_id;

          this.getUsersEmpresa();
        } else {
          this.event_id = null;
          console.error('User or user.id is undefined in response:', res);
        }
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching user by id:', error);
        this.event_id = null;
      }
    );
    this.getUserbyEvento(+id);
    
  }

  


  getUsersEmpresa(){
    this.companyService.usersById(this.company_id).subscribe(
      (res: any) => {
        this.users = res.company.users;
        console.log(this.users)
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  getUserbyEvento(id: number) {
    this.eventoService.usersByEvent(+id).subscribe(
      (res: any) => {
        this.event = res.event;
        this.usersevento = res.event.users;
        // console.log(this.usersevento)
      },
      (error) => {
        console.error('Error fetching user by id:', error);
        this.user_id = null;
      }
    );
  }

  addColaborador(user_id: number) {
    this.event_id = this.event.id;
    const data = {
      user_id: user_id,
      event_id: this.event_id
    }
    this.eventoService.addColaborador( this.event_id, data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Colaborador agregado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.ngOnInit();
      }
       )       
    }
  removeColab(user_id: number) {
    this.event_id = this.event.id;
    const data = {
      user_id: user_id,
      event_id: this.event_id
    }
    this.eventoService.removeColaborador( this.event_id, data).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Colaborador eliminado',
          showConfirmButton: false,
          timer: 1500,
        });
        this.ngOnInit();
      })       
    }


  public onReady(editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
  }

  optionSelected(value: number) {
    this.option_selected = value;
    if (this.option_selected === 1) {
      // this.ngOnInit();
      this.solicitud_selected = null;
    }
    if (this.option_selected === 2) {
      this.solicitud_selected = null;
    }
    if (this.option_selected === 3) {
      this.solicitud_selected = null;
    }
  }

  cambiarStatus(eventprofile: any) {
    const VALUE = eventprofile.status;

    const data = {
      status: VALUE 
    }


    this.eventoService.updateStatus(data, eventprofile.id ).subscribe((resp) => {
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
}
