import { Component, OnInit } from '@angular/core';
import { SliderService } from '../../../services/slider.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as ClassicEditor from 'ckeditor4-angular';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { Slider } from 'src/app/models/slider';

@Component({
  selector: 'app-slider-edit',
  templateUrl: './slider-edit.component.html'
})
export class SliderEditComponent implements OnInit {

  imageUrl = environment.url_media;

  pageTitle: string;
  error: string;
  uploadError: string;
  imagePath: string;
  slider: Slider;

  sliderForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;

  constructor(
    private fb: FormBuilder,
    private sliderService: SliderService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pageTitle = 'Edit Slider';
      this.sliderService.getSlider(+id).subscribe(
        res => {
          this.sliderForm.patchValue({
            title: res.title,
            description: res.description,
            video_review: res.video_review,
            is_activeText: res.is_activeText,
            is_activeBot: res.is_activeBot,
            is_active: res.is_active,
            is_modal: res.is_modal,
            boton: res.boton,
            enlace: res.enlace,
            target: res.target,
            id: res.id
          });
          this.imagePath = res.image;

          this.slider = res;
        }
      );
    } else {
      this.pageTitle = 'Create Slider';
    }

    this.sliderForm = this.fb.group({
      id: [''],
      title: [''],
      description: [''],
      video_review: [''],
      is_activeText: ['displayBlok'],
      is_activeBot: ['displayBlok'],
      is_active: ['1'],
      is_modal: [''],
      boton: [''],
      enlace: [''],
      target: [''],
      image: [''],
    });
  }

  onSelectedFile(event) {debugger
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.sliderForm.get('image').setValue(file);
    }
  }

  get title() { return this.sliderForm.get('title'); }
  get description() { return this.sliderForm.get('description'); }
  get video_review() { return this.sliderForm.get('video_review'); }
  get boton() { return this.sliderForm.get('boton'); }
  get enlace() { return this.sliderForm.get('enlace'); }
  get target() { return this.sliderForm.get('target'); }
  get is_activeText() { return this.sliderForm.get('is_activeText'); }
  get is_active() { return this.sliderForm.get('is_active'); }
  get is_activeBot() { return this.sliderForm.get('is_activeBot'); }
  get is_modal() { return this.sliderForm.get('is_modal'); }

  onSubmit () {
    const formData = new FormData();
    formData.append('title', this.sliderForm.get('title').value);
    formData.append('description', this.sliderForm.get('description').value);
    formData.append('video_review', this.sliderForm.get('video_review').value);
    formData.append('boton', this.sliderForm.get('boton').value);
    formData.append('enlace', this.sliderForm.get('enlace').value);
    formData.append('target', this.sliderForm.get('target').value);
    formData.append('is_activeText', this.sliderForm.get('is_activeText').value);
    formData.append('is_activeBot', this.sliderForm.get('is_activeBot').value);
    formData.append('is_active', this.sliderForm.get('is_active').value);
    formData.append('is_modal', this.sliderForm.get('is_modal').value);
    formData.append('image', this.sliderForm.get('image').value);

    const id = this.sliderForm.get('id').value;

    if (id) {
      this.sliderService.updatSlider(formData, +id).subscribe(
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
              text: 'Se Actualizó Correctamente'
            });
            // this.router.navigate(['/prensa']);

          }
        },
        error => this.error = error
      );
    } else {
      this.sliderService.creatSlider(formData).subscribe(
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
    console.log(this.sliderForm.value)
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
