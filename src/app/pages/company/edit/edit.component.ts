import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import { CompanyService } from 'src/app/services/company.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from 'src/app/models/pais';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCompanyComponent {


  imageUrl = environment.url_media;

  title: string;
  error: string;
  uploadError: string;
  imagePath: string;
  event: Company;
  user: User;
  company_id: number;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
  public loading: boolean = false;

  companyForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  text_validation: any = null;


  public countries: Pais;
  
  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private authService: AuthService,
    private paisService: PaisService,
  ) { }

  ngOnInit() {

    this.user = this.authService.userprofile;
    this.getPaisesList();

    const id = this.route.snapshot.paramMap.get('id');

    this.company_id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = 'Edit Empresa';
      this.loading = true;
      this.companyService.getById(+id).subscribe(
        (res: any) => {
          this.companyForm.patchValue({
            name: res.company.name,
            description: res.company.description,
            pais_id: res.company.pais_id,
            // image: res.company.image,
          });
          this.imagePath = res.company.image;
          console.log(res)

          this.event = res.event;
          this.loading = false;

        }
      );
    } else {
      this.title = 'Create Evento';
    }

    this.companyForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      pais_id: [''],
      imagen: [''],
    });
  }


  getPaisesList(){
    this.paisService.getCountries().subscribe(
      (resp:any) =>{
        this.countries = resp.paises;
        console.log(this.countries);

      }
    )
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.companyForm.get('imagen').setValue(file);
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

  get name() { return this.companyForm.get('name'); }
  get description() { return this.companyForm.get('description'); }
  get pais_id() { return this.companyForm.get('pais_id'); }


  onSubmit() {

    const formData = new FormData();
    formData.append('name', this.companyForm.get('name').value);
    formData.append('description', this.companyForm.get('description').value);
    formData.append('pais_id', this.companyForm.get('pais_id').value);


    if (this.FILE_AVATAR) {
      formData.append("imagen", this.FILE_AVATAR);
    }



    const id = this.companyForm.get('id').value;
    formData.append('company_id', this.company_id.toString());
    formData.append('user_id', this.user.id.toString());
    // formData.append('pais_id', this.user.id.toString());

    if (this.company_id) {
      this.loading = true;
      this.companyService.update(formData, +this.company_id).subscribe(
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
      this.companyService.createCompany(formData).subscribe(
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
    // console.log(this.companyForm.value)
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


}
