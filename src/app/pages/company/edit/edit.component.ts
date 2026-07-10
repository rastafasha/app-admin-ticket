import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

declare var bootstrap: any;
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditCompanyComponent implements OnInit, OnChanges{

  @Input() companySeleccionado;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshCatList: EventEmitter<void> = new EventEmitter<void>();


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
  text_validation: any = null;
  public loading: boolean = false;

  companyForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;


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
   this.validarFormulario();

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['companySeleccionado'] &&
      changes['companySeleccionado'].currentValue
    ) {
      this.title = 'Edit Company';
      const company = changes['companySeleccionado'].currentValue;
      

      this.companyForm.patchValue({
        id: company._id,
        name: company.name,
        description: company.description,
        pais_id: company.pais_id,
      });

      this.companySeleccionado = company;
      this.title = 'Editando Company';
    } else {
      this.title = 'Creando Company';
    }
    this.getPaisesList();
  }

   onClose() {
    this.companySeleccionado = null;
    this.title = 'Creando Producto';

    // 1. Reseteamos el formulario pasándole los valores iniciales limpios de un solo golpe
    this.companyForm.reset({
      id: null,
      name: '',
      description: '',
      pais_id: '',
      imagen: '',
    });

    // 2. 🚀 LA CLAVE: Forzamos a Angular a limpiar los estados de validación visuales (los bordes rojos/verdes)
    this.companyForm.markAsPristine();
    this.companyForm.markAsUntouched();
    this.companyForm.updateValueAndValidity();

    // Emitimos el evento al padre para limpiar cualquier variable externa
    this.closeModal.emit();
  }
  
 validarFormulario() {
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

      }
    )
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
            const modalElement = document.getElementById('editCompany');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          this.refreshCatList.emit();
          this.ngOnInit();
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
            const modalElement = document.getElementById('editCompany');
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
          }
          this.refreshCatList.emit();
          this.ngOnInit();
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
