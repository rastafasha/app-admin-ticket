import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Category } from 'src/app/models/category';
import { Pais } from 'src/app/models/pais';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css']
})
export class CatEditComponent {

    imageUrl = environment.url_media;
  
    title: string;
    error: string;
    uploadError: string;
    imagePath: string;
    category: Category;
    user: User;
    event_id: number;
    public FILE_AVATAR: any;
    public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
    public loading: boolean = false;
  
    categoryForm: FormGroup;
    public Editor = ClassicEditor;
    public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
    text_validation: any = null;
  
  
    companies: any[] = [];
    public countries: Pais;
  
    constructor(
      private fb: FormBuilder,
      private categoryService: CategoryService,
      private route: ActivatedRoute,
      private authService: AuthService,
    ) { }
  
    ngOnInit() {
  
      this.user = this.authService.userprofile;
      
      const id = this.route.snapshot.paramMap.get('id');
  
      this.event_id = +this.route.snapshot.paramMap.get('id');
      if (id) {
        this.title = 'Edit Categoría';
        this.loading = true;
        this.categoryService.getById(+id).subscribe(
          (res: any) => {
            this.categoryForm.patchValue({
              name: res.category.name,
              id: res.category.id,
              category_id: res.category.id
            });
            this.category = res.category;
            this.loading = false;
  
          }
        );
      } else {
        this.title = 'Create Categoría';
      }
  
      this.categoryForm = this.fb.group({
        id: [''],
        name: [''],
      });
  
      
    }
  
  
    get name() { return this.categoryForm.get('name'); }
   
  
    onSubmit() {
  
      const formData = new FormData();
      formData.append('name', this.categoryForm.get('name').value);
  
      const id = this.categoryForm.get('id').value;
  
      if (id) {
        this.loading = true;
        this.categoryService.update(formData, +id).subscribe(
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
        this.categoryService.create(formData).subscribe(
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
      // console.log(this.categoryForm.value)
    }
  
  
    public onReady(editor) {
      editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );
    }
  
}
