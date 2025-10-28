import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Materia } from 'src/app/models/materia';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UserService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
   userForm: FormGroup;
    passwordForm: FormGroup;
    public formSumitted = false;
    isLoading:boolean = false;
    public user: User;
    userprofile!: User;
    id:any;
    error:string;
    title:string;
    infoUser:string;
    materia: Materia | undefined;
    materias: Materia | undefined;
  
    uploadError: string;
  
    submitted = false;
  
    public storage = environment.url_media
  
  
    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private userService: UserService,
      private location: Location,
      private accountService: AuthService,
       private materiaService: MateriaService,
      private fb: FormBuilder,
  
    ) {
  this.user = this.userService.user;
    }
  
  
  
    ngOnInit() {
      window.scrollTo(0, 0);
      this.accountService.closeMenu();
      this.activatedRoute.params.subscribe( ({id}) => this.iniciarFormulario(id));
      this.getMaterias();
  
    }
  
    goBack() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  
  
     getMaterias() {
      this.materiaService.getMaterias().subscribe((resp: any) => {
        this.materias = resp;
      });
    }
  
    iniciarFormulario(id:number){
      // const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.title = 'Profile';
        this.userService.getUserById(+id).subscribe(
          (res:any) => {
            console.log(res);
            this.userprofile = res.user;
            // this.imagePath = res.image;
            this.infoUser = res;
            // console.log(this.infoDirectorio);
          }
        );
      } else {
        this.title = 'no Perfil';
      }
    }
  
}
