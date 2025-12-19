import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/company';
import { Evento } from 'src/app/models/evento';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent {

  title = 'Detalles del Evento';
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
    companySelected: Company;
  
    roles: any;
    profileSeleccionado: Company;
  
    user_id: any;
    company_id: any;
    errors: any = null;
    users: User[] = [];
    usersevento: User[] = [];
  user_empresa: any;
  company: Company;
  events: Evento;
  
  role: any;
    constructor(
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
      this.activatedRoute.params.subscribe(({ id }) => this.getCompany(id));
      // this.getUser();
      
      
      
    }
    closeMenu() {
      var menuLateral = document.getElementsByClassName('sidebar');
      for (var i = 0; i < menuLateral.length; i++) {
        menuLateral[i].classList.remove('active');
      }
    }
   
    
  
    getCompany(id: number) {
      this.isLoading = true;
      this.companyService.getById(+id).subscribe(
        (res: any) => {
          this.companySelected = res.company;
          // this.calificaciones = res.calificaciones;
          if (res.company && res.company.id) {
            this.company_id = res.company.id;
          } else {
            this.company_id = null;
            console.error('User or user.id is undefined in response:', res);
          }
          this.isLoading = false;
        },
        (error) => {
          console.error('Error fetching user by id:', error);
          this.company_id = null;
        }
      );
      // this.getUserbyEvento(+id);
      this.getUsersEmpresa(+id);
      
    }
  
    //  getUser() {
    //   const id = this.user.id
    //   this.userService.getUserById(+id).subscribe(
    //     (res: any) => {
    //       this.user = res.user;
    //       this.user_empresa = res.user.empresa;
    //       // this.getUsersEmpresa()
    //       if(this.role === 'PARTNER' ){
    //         this.getUsersEmpresa();
    //       }
    //       if(this.role ===  'ADMIN' || this.role ===  'SUPERADMIN'){
    //         this.activatedRoute.params.subscribe(({ id }) => this.getUserbyEvento(id));
    //       }
    //     },
    //     (error) => {
    //       console.error('Error fetching user by id:', error);
    //     }
    //   );
    // }
  
  
    getUsersEmpresa(id: number){
      
      this.companyService.usersById(id).subscribe(
        (res: any) => {
          if (res.users && Array.isArray(res.users)) {
            this.users = res.company.users;
          } else {
            this.users = [];
            console.warn('res.users is not an array or undefined:', res.users);
          }
          console.log(this.users)
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
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
  
   


}
