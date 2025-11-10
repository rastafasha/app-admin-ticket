import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Materia } from 'src/app/models/materia';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { MateriaService } from 'src/app/services/materia.service';
import { UserService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Slider } from 'src/app/models/slider';
import { SliderService } from 'src/app/services/slider.service';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent {

  imageUrl = environment.url_media;

    pageTitle: string;
    error: string;
    uploadError: string;
    imagePath: string;
    event: Evento;
    user:User;
    event_id : number;
    public FILE_AVATAR: any;
    public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
    public loading: boolean = false;
  
    eventoForm: FormGroup;
    public Editor = ClassicEditor;
    public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  text_validation: any = null;
    constructor(
      private fb: FormBuilder,
      private evntoService: EventoService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location,
      private authService: AuthService
    ) { }
  
    ngOnInit() {

      this.user = this.authService.userprofile;
  
      const id = this.route.snapshot.paramMap.get('id');

      this.event_id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pageTitle = 'Edit Evento';
        this.loading = true;
        this.evntoService.getById(+id).subscribe(
          (res:any) => {
            this.eventoForm.patchValue({
              name: res.event.name,
              description: res.event.description,
              boton: res.event.boton,
              precio_general: res.event.precio_general,
              precio_estudiantes: res.event.precio_estudiantes,
              precio_especialistas: res.event.precio_especialistas,
              fecha_inicio: res.event.fecha_inicio,
              fecha_fin: res.event.fecha_fin,
              status: res.event.status,
              company: res.event.company,
              is_featured: res.event.is_featured == 1 ? true : false,
              id: res.event.id,
              event_id: res.event.id
            });
            this.imagePath = res.event.image;
            console.log(res)

            this.event = res.event;
            this.loading = false;

          }
        );
      } else {
        this.pageTitle = 'Create Evento';
      }
  
      this.eventoForm = this.fb.group({
        id: [''],
        name: [''],
        description: [''],
        precio_general: [''],
        precio_estudiantes: [''],
        precio_especialistas: [''],
        fecha_inicio: [''],
        fecha_fin: [''],
        status: [''],
        company: [''],
        is_featured: [''],
        imagen: [''],
      });
    }
  
    onSelectedFile(event) {
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.eventoForm.get('imagen').setValue(file);
      }
    }

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
  
    get name() { return this.eventoForm.get('name'); }
    get description() { return this.eventoForm.get('description'); }
    get precio_general() { return this.eventoForm.get('precio_general'); }
    get precio_estudiantes() { return this.eventoForm.get('precio_estudiantes'); }
    get precio_especialistas() { return this.eventoForm.get('precio_especialistas'); }
    get fecha_inicio() { return this.eventoForm.get('fecha_inicio'); }
    get fecha_fin() { return this.eventoForm.get('fecha_fin'); }
    get status() { return this.eventoForm.get('status'); }
    get company() { return this.eventoForm.get('company'); }
    get is_featured() { return this.eventoForm.get('is_featured'+''); }
  
    onSubmit () {
      
      const formData = new FormData();
      formData.append('name', this.eventoForm.get('name').value);
      formData.append('description', this.eventoForm.get('description').value);
      formData.append('precio_general', this.eventoForm.get('precio_general').value);
      formData.append('precio_estudiantes', this.eventoForm.get('precio_estudiantes').value);
      formData.append('precio_especialistas', this.eventoForm.get('precio_especialistas').value);
      formData.append('fecha_inicio', this.eventoForm.get('fecha_inicio').value);
      formData.append('fecha_fin', this.eventoForm.get('fecha_fin').value)
      formData.append('status', this.eventoForm.get('status').value);
      formData.append('company', this.eventoForm.get('company').value);
      formData.append('is_featured', this.eventoForm.get('is_featured').value ? '1' : '0');
      // formData.append('image', this.eventoForm.get('image').value);

      if (this.FILE_AVATAR) {
      formData.append("imagen", this.FILE_AVATAR);
    }

      
      formData.append('user_id', this.user.id.toString());
      
      const id = this.eventoForm.get('id').value;
      formData.append('event_id', id);
      
      if (id) {
        this.loading = true;
        this.evntoService.update(formData, +id).subscribe(
          res => {
            if (res === 'error') {
              //this.uploadError = res.message;
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrión un error, vuelva a intentar!',
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Se Actualizó Correctamente'
              });
              // this.router.navigate(['/prensa']);
              this.loading = false;
  
            }
          },
          error => this.error = error
        );
      } else {
        this.loading = true;
        this.evntoService.createEvento(formData).subscribe(
          res => {
            if (res.status === 'error') {
              //this.uploadError = res.message;
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrión un error, vuelva a intentar!',
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: 'Exito!',
                text: 'Se Creó Correctamente!'
              });
              // this.router.navigateByUrl('/');
              this.loading = false;
            }
          },
          error => this.error = error
        );
      }
      // console.log(this.eventoForm.value)
    }
  
    goBack() {
      this.location.back(); // <-- go back to previous location on cancel
    }
  
    public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
    }
  

}
