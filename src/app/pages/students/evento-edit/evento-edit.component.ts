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
    slider: Slider;
  
    eventoForm: FormGroup;
    public Editor = ClassicEditor;
    public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  
    constructor(
      private fb: FormBuilder,
      private evntoService: EventoService,
      private router: Router,
      private route: ActivatedRoute,
      private location: Location
    ) { }
  
    ngOnInit() {
  
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.pageTitle = 'Edit Evento';
        this.evntoService.getById(+id).subscribe(
          res => {
            this.eventoForm.patchValue({
              name: res.name,
              description: res.description,
              video_review: res.video_review,
              is_activeText: res.is_activeText,
              is_activeBot: res.is_activeBot,
              is_active: res.is_active,
              is_modal: res.is_modal,
              boton: res.boton,
              precio_general: res.precio_general,
              precio_estudiante: res.precio_estudiante,
              precio_especialista: res.precio_especialista,
              fecha_inicio: res.fecha_inicio,
              fecha_fin: res.fecha_fin,
              enlace: res.enlace,
              target: res.target,
              id: res.id
            });
            this.imagePath = res.image;
  
            this.slider = res;
          }
        );
      } else {
        this.pageTitle = 'Create Evento';
      }
  
      this.eventoForm = this.fb.group({
        id: [''],
        name: [''],
        description: [''],
        video_review: [''],
        is_activeText: ['displayBlok'],
        is_activeBot: ['displayBlok'],
        is_active: ['1'],
        is_modal: [''],
        boton: [''],
        precio_general: [''],
        precio_estudiante: [''],
        precio_especialista: [''],
        fecha_inicio: [''],
        fecha_fin: [''],
        enlace: [''],
        target: [''],
        image: [''],
      });
    }
  
    onSelectedFile(event) {debugger
      if (event.target.files.length > 0) {
        const file = event.target.files[0];
        this.eventoForm.get('image').setValue(file);
      }
    }
  
    get name() { return this.eventoForm.get('name'); }
    get description() { return this.eventoForm.get('description'); }
    get video_review() { return this.eventoForm.get('video_review'); }
    get boton() { return this.eventoForm.get('boton'); }
    get precio_general() { return this.eventoForm.get('precio_general'); }
    get precio_estudiante() { return this.eventoForm.get('precio_estudiante'); }
    get precio_especialista() { return this.eventoForm.get('precio_especialista'); }
    get fecha_inicio() { return this.eventoForm.get('fecha_inicio'); }
    get fecha_fin() { return this.eventoForm.get('fecha_fin'); }
    get enlace() { return this.eventoForm.get('enlace'); }
    get target() { return this.eventoForm.get('target'); }
    get is_activeText() { return this.eventoForm.get('is_activeText'); }
    get is_active() { return this.eventoForm.get('is_active'); }
    get is_activeBot() { return this.eventoForm.get('is_activeBot'); }
    get is_modal() { return this.eventoForm.get('is_modal'); }
  
    onSubmit () {
      const formData = new FormData();
      formData.append('name', this.eventoForm.get('name').value);
      formData.append('description', this.eventoForm.get('description').value);
      formData.append('precio_general', this.eventoForm.get('precio_general').value);
      formData.append('precio_estudiante', this.eventoForm.get('precio_estudiante').value);
      formData.append('precio_especialista', this.eventoForm.get('precio_especialista').value);
      formData.append('fecha_inicio', this.eventoForm.get('fecha_inicio').value);
      formData.append('fecha_fin', this.eventoForm.get('fecha_fin').value);
      formData.append('video_review', this.eventoForm.get('video_review').value);
      formData.append('boton', this.eventoForm.get('boton').value);
      formData.append('enlace', this.eventoForm.get('enlace').value);
      formData.append('target', this.eventoForm.get('target').value);
      formData.append('is_activeText', this.eventoForm.get('is_activeText').value);
      formData.append('is_activeBot', this.eventoForm.get('is_activeBot').value);
      formData.append('is_active', this.eventoForm.get('is_active').value);
      formData.append('is_modal', this.eventoForm.get('is_modal').value);
      formData.append('image', this.eventoForm.get('image').value);
  
      const id = this.eventoForm.get('id').value;
  
      if (id) {
        this.evntoService.update(formData).subscribe(
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
  
            }
          },
          error => this.error = error
        );
      } else {
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
              this.router.navigateByUrl('/slider');
            }
          },
          error => this.error = error
        );
      }
      console.log(this.eventoForm.value)
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
