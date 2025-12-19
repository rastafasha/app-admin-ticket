import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';


interface HtmlInputEvent extends Event{
  target : HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  passwordForm: FormGroup;
  profileForm: FormGroup;

  public formSumitted = false;
  isLoading:boolean = false;
  public user: User;
  userprofile!: User;
  id:any;
  error:string;
  title:string;
  infoUser:string;

  uploadError: string;

  submitted = false;
user_id: any;
  public storage = environment.url_media
text_validation: any = null;
public FILE_AVATAR: any;
    public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";


  companies: any[] = [];
  company_id: number = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private companyService: CompanyService,
    private location: Location,
    private accountService: AuthService,
    private fb: FormBuilder,

  ) {
this.user = this.userService.user;
  }



  ngOnInit() {
    window.scrollTo(0, 0);
    this.getUser();
    this.validarFormulario();
    this.validarFormularioPassword();
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
    this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormularioPerfil(id));
    this.accountService.closeMenu();
    this.getCompanies()
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  getCompanies() {
      this.companyService.getAll().subscribe(
        (res:any) => {
          this.companies = res.companies;
        }
      );
    }


    

  getUser(): void {
    this.isLoading = true;
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.activatedRoute.params.subscribe( ({id}) => this.getUserProfile(id));
    if(!this.user || !this.user.id || this.user.id == null || this.user.id == undefined){
      this.router.navigateByUrl('/login');

    }
      this.user_id = this.user.id;
      this.isLoading = false;
  }

   addColaboradors() {
        
        const data = {
          user_id: this.userprofile.id,
          company_id: this.company_id
        }
        
        this.companyService.addColaborador(this.company_id, data).subscribe(
          (res: any) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Colaborador agregado',
              showConfirmButton: false,
              timer: 1500,
            });
          },
          (error) => {
            console.error('Error:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error al agregar colaborador',
              showConfirmButton: false,
              timer: 2000,
            });
          }
        )       
    }
  
  iniciarFormulario(id:number){
    // const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Editar Perfil';
      this.userService.getUserById(+id).subscribe(
        (res:any) => {
          // console.log(res);
          this.userprofile = res;
          
          this.userForm.patchValue({
            id: res.user.id,
            name: res.user.name,
            surname: res.user.surname,
            role: res.user.role,
            email: res.user.email,
            materia_id: res.user.materia_id,
            empresa: res.user.empresa,
            address: res.user.address,
            telefono: res.user.telefono,
            mobile: res.user.mobile,
            n_doc: res.user.n_doc,
            birth_date: res.user.birth_date,
            gender: res.user.gender,
          });
          // this.imagePath = res.image;
          this.infoUser = res.user;
          // console.log(this.infoDirectorio);
        }
      );
    } else {
      this.title = 'Crear Perfil';
    }
  }

  validarFormulario(){
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      // password: ['', Validators.required],
      n_doc: ['', Validators.required],
      // email: ['', Validators.required],
      address: [''],
      empresa: [''],
      telefono: [''],
      mobile: [''],
      birth_date: [''],
      gender: [''],
      
      // status: ['PENDING'],
    })
  }

  get name() { return this.userForm.get('name'); }
    get surname() { return this.userForm.get('surname'); }
    get password() { return this.userForm.get('password'); }
    get email() { return this.userForm.get('email'); }
    get n_doc() { return this.userForm.get('n_doc'); }
    get empresa() { return this.userForm.get('empresa'); }
    // get status() { return this.userForm.get('status'); }
    

  

  loadFile($event: any) {
    if ($event.target.files[0].type.indexOf("image")) {
          this.text_validation = "Solamente pueden ser archivos de tipo imagen";
          return;
        }
        this.text_validation = "";
        this.FILE_AVATAR = $event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.FILE_AVATAR);
        reader.onloadend = () => (this.IMAGE_PREVISUALIZA = reader.result);
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

  cambiarRole(user:User){

    const data = {
      ...this.profileForm.value,
      user_id: user.id,
      role_id: this.profileForm.get('role_id').value
    }
    this.userService.updateUserRole(data).subscribe((resp:any)=>{
      Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
      this.ngOnInit();
    })
  }





  save() {
    this.submitted = true;
    const formData = new FormData();
    formData.append('name', this.userForm.get('name').value);
    formData.append('surname', this.userForm.get('surname').value);

     if (this.userForm.value.birth_date) {
      formData.append("birth_date", this.userForm.value.birth_date);
      
    }
    if (this.userForm.value.address) {
      formData.append("address", this.userForm.value.address);
      
    }
     if (this.userForm.value.gender) {
      formData.append("gender", this.userForm.value.gender);
      
    }
     if (this.userForm.value.telefono) {
      formData.append("telefono", this.userForm.value.telefono);
      
    }
     if (this.userForm.value.mobile) {
      formData.append("mobile", this.userForm.value.mobile);
      
    }
    if (this.userForm.value.n_doc) {
      formData.append("n_doc", this.userForm.value.n_doc);
      
    }
    
    if (this.userForm.value.empresa) {
      formData.append("empresa", this.userForm.value.empresa);
      
    }
    if (this.userForm.value.gender) {
      formData.append("gender", this.userForm.value.gender);
      
    }
     if (this.FILE_AVATAR) {
      formData.append("imagen", this.FILE_AVATAR);
    }

    

    const id = this.userForm.get('id').value;

    if (id) {
      const data = {
        ...this.userForm.value,
        user_id: this.user.id
      }
      this.userService.update(formData, id).subscribe(
        (res:any) => {
          this.infoUser = res;
          Swal.fire('Guardado', 'Los cambios fueron actualizados', 'success');
          // this.router.navigate(['/dashboard/users']);
          this.ngOnInit();
        },
        error => this.error = error
      );
    } else {
      const data = {
        ...this.userForm.value,
        user_id: this.user.id
      }
      this.accountService.crearUsuario(data).subscribe(
        (res:any) => {
          Swal.fire('Guardado', 'Los cambios fueron creados', 'success');
            this.router.navigate(['/dashboard/users']);
        },
        error => this.error = error
      );
    }


  }





//cambiar contraseña

  validarFormularioPassword(){
    this.passwordForm = this.fb.group({
      id: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    }, {
      validators: this.passwordsIguales('password', 'password2')
    });
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) =>{
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual: true});
      }
    }
  }

passwordNoValido(){
  const pass1 = this.passwordForm?.get('password').value;
  const pass2 = this.passwordForm?.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

cambiarPassword(){
  this.formSumitted = true;

  const {email } = this.passwordForm.value;

  if(this.userprofile){
    // Check if token exists before calling
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire('Error', 'Usuario no autenticado. Por favor inicie sesión.', 'error');
      this.router.navigate(['/login']);
      return;
    }

    //actualizar
    const data = {
      ...this.passwordForm.value,
      id: this.userprofile.id
    }
    this.accountService.newPassword(data).subscribe(
      resp =>{
        Swal.fire('Cambiado', `Enlace para restablecer su contraseña ha sido enviado a su correo electrónico`, 'success');
      },
      error => {
        if (error.status === 401) {
          Swal.fire('Error', 'Usuario no autenticado. Por favor inicie sesión.', 'error');
          this.router.navigate(['/login']);
        } else {
          Swal.fire('Error', 'Error al cambiar la contraseña.', 'error');
        }
      }
    );

  }
}



}
