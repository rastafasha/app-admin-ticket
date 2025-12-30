import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';




@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {

  @Output() directorioUser : any;
  detino = 'partners';
  title = "Detalles de la cuenta";
  profileForm: FormGroup;
  imagePath: string;
  error: string;
  uploadError: boolean;

  public selectedValue!: string;
  public option_selected:number = 1;
  public solicitud_selected:any = null;

  identity: any;

  user: User;
  userprofile: User;

  roles:any;
  profileSeleccionado: User;

  user_id: any;
  errors:any = null;

  constructor(
    private location: Location,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authService:AuthService
  ) {
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    let USER = localStorage.getItem("user");
    this.user = JSON.parse(USER ? USER: '');
    this.roles = this.user.roles;
    console.log(this.roles);
    this.authService.closeMenu();
    this.config();
    // this.getUser();
    this.activatedRoute.params.subscribe( ({id}) => this.getUserServer(id));
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
  }
  
  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }
  config(): void {

    this.userService.config().subscribe(
      (res:any) =>{
        this.roles = res.roles;
      }
    );
  }
  getUserServer(id:number){
    this.userService.getUserById(+id).subscribe(
      (res:any) =>{
        this.userprofile = res.user;
        this.user_id = res.user.id;
        // console.log(this.userdirectory);
      }
    );
    // this.iniciarFormularioPerfil();
  }

  iniciarFormularioPerfil(id){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // this.pageTitle = 'Editar Directorio';
      this.userService.getUserById(+id).subscribe(
        (res:any) => {
          this.profileForm.patchValue({
            id: res.user.id,
            name: res.user.name,
            email: res.user.email,
            // role: res.user.roles.name,
          });
          this.userprofile = res.user;
          console.log(this.userprofile);
        }
      );
      
    }

    this.validarFormularioPerfil();

  }

  validarFormularioPerfil(){
    this.profileForm = this.fb.group({
      id: [''],
      // nombre: ['', Validators.required],
      name: ['', Validators.required],
      role_id: ['', Validators.required],
      user_id: [''],
    });
  }


  get name() { return this.profileForm.get('name'); }
  get role_id() { return this.profileForm.get('role_id'); }

  updateForm() {

    const formData = new FormData();
    formData.append('name', this.profileForm.get('name').value);

    formData.append('role_id', this.profileForm.get('role_id').value);
    formData.append('user_id', this.user_id);

    const id = this.profileForm.get('id').value;

    if (id) {
      const data = {
        ...this.profileForm.value,
      }
      this.userService.updateUserRole(data).subscribe(
        (res:any) => {
          if (this.error) {
            // this.uploadError = res.message;
            Swal.fire('Error', this.error, 'error');
          } else {
            // this.infoDirectorio = res;
            Swal.fire({
                          position: 'top-end',
                          icon: 'success',
                          title: 'Actualizado',
                          showConfirmButton: false,
                          timer: 1500,
                        });
            this.router.navigate(['/dashboard/partners']);
          }
        },
        error => this.error = error
      );
    }

  }


/**
   * @method: Cambiar imagen profile
   * @author: malcolm
   * @since: 07/10/2022
   */

 public onReady( editor:any ) {
  editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
  );
}


optionSelected(value:number){
      this.option_selected = value;
      if(this.option_selected === 1){

        this.ngOnInit();
      }
      if(this.option_selected === 2){
        this.solicitud_selected = null;
      }
      if(this.option_selected === 3){
        this.solicitud_selected = null;
        
      }
    }

}
