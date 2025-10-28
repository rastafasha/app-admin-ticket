import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  // username = new FormControl();
  name = new FormControl();
  surname = new FormControl();
  email = new FormControl();
  password = new FormControl();
  n_doc = new FormControl();
  remember = new FormControl();

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  loginError: string;
  error = null;

  public auth2: any;

  user: User;

  // Registro
  public formSumitted = false;
  public registerForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    email: [ '', [Validators.required] ],
    n_doc: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
    // role: ['GUEST', Validators.required],
    role_id: ['9', Validators.required],
    terminos: [false, Validators.required],

  }, {
    validators: this.passwordsIguales('password', 'password2')

  });
  // Registro

  errors:any = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private usuarioService: UserService,
    
  ) {
   
  }
ngOnInit(){
  
  this.loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });
  this.authService.getLocalStorage();
  
}



login(){
  if(!this.loginForm){
    return;
  }

  this.authService.login(
    this.loginForm.value.email ? this.loginForm.value.email : '' ,
    this.loginForm.value.password ? this.loginForm.value.password: ''

  ).subscribe(
    (resp:any) =>{
      if(this.loginForm.get('remember').value){
        localStorage.setItem('email', this.loginForm.get('email').value);
        // document.location.reload();
        
      }else{
        localStorage.removeItem('email');
      }
      this.authService.getLocalStorage();
      if(localStorage.getItem('user')){
        setTimeout(()=>{
          this.router.navigateByUrl('/dashboard');
        },500)

      }
      
    },(error) => {
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
    )
    // console.log(this.user)
}




// Registro
crearUsuario(){
  this.formSumitted = true;
  console.log('Register form value:', this.registerForm.value);
  this.authService.crearUsuario(this.registerForm.value).subscribe(
    (resp:any) =>{
      Swal.fire('Registrado!', `Ya puedes ingresar`, 'success');
      this.ngOnInit();
    },(error) => {
      console.error('Error registering user:', error);
      Swal.fire('Error', error.error.msg, 'error');
      this.errors = error.error;
    }
  );
  return false;
}

campoNoValido(campo: string): boolean {
  if(this.registerForm.get(campo).invalid && this.formSumitted){
    return true;
  }else{
    return false;
  }
}

aceptaTerminos(){
  return !this.registerForm.get('terminos').value && this.formSumitted;
}

passwordNoValido(){
  const pass1 = this.registerForm.get('password').value;
  const pass2 = this.registerForm.get('password2').value;

  if((pass1 !== pass2) && this.formSumitted){
    return true;
  }else{
    return false;
  }
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
// Registro



switchRegistrologin(){
  const container = document.querySelector(".logincontainer");
  if (container) {
    container.classList.toggle("sign-up-mode");
  }
  window.scrollTo(0, 0);
}


}
