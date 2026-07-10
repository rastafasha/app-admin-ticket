import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EventoService } from 'src/app/services/evento.service';
import { Evento } from 'src/app/models/evento';
import { CompanyService } from 'src/app/services/company.service';
import { Pais } from 'src/app/models/pais';
import { PaisService } from 'src/app/services/pais.service';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category';

declare var bootstrap: any;
@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.css']
})
export class EventoEditComponent implements OnInit, OnChanges {

  @Input() eventSeleccionado: Evento;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() refreshCatList: EventEmitter<void> = new EventEmitter<void>();

  imageUrl = environment.url_media;

  detino: 'eventos';
  title: string;
  error: string;
  uploadError: string;
  imagePath: string;
  event: Evento;
  user: User;
  event_id: number;
  public FILE_AVATAR: any;
  public IMAGE_PREVISUALIZA: any = "assets/img/user-06.jpg";
  public loading: boolean = false;

  eventoForm: FormGroup;
  public Editor = ClassicEditor;
  public editorData = `<p>This is a CKEditor 4 WYSIWYG editor instance created with Angular.</p>`;
  text_validation: any = null;


  companies: any[] = [];
  public countries: Pais;
  categories: Category;

  constructor(
    private fb: FormBuilder,
    private evntoService: EventoService,
    private companyService: CompanyService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private paisService: PaisService,
  ) { }

  ngOnInit() {
    this.user = this.authService.userprofile;
    this.validarFormulario();
    this.getCategories();
    this.getPaisesList();
    this.getCompanies();

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;

    if (
      changes['eventSeleccionado'] &&
      changes['eventSeleccionado'].currentValue
    ) {
      this.title = 'Edit Evento';
      const evento = changes['eventSeleccionado'].currentValue;

      if (this.eventoForm.get('id')?.value === evento.id) {
      return; 
    }

      // 1. Corregir y formatear la fecha de inicio (Cambiar / por -)
      const fechaInicioFormateada = evento.fecha_inicio
        ? evento.fecha_inicio.replace(/\//g, '-')
        : '';

      // 2. Corregir y formatear la fecha de fin (Cambiar / por -)
      const fechaFinFormateada = evento.fecha_fin
        ? evento.fecha_fin.replace(/\//g, '-')
        : '';

      // 3. Aplicar el patchValue con los datos sanitizados e IDs extraídos
     setTimeout(() => {
      this.eventoForm.patchValue({
        name: evento.name,
        description: evento.description,
        lugar: evento.lugar,
        precio_general: Number(evento.precio_general),
        precio_estudiantes: Number(evento.precio_estudiantes),
        precio_especialistas: Number(evento.precio_especialistas),
        tickets_disponibles: evento.tickets_disponibles,

        // Aseguramos conversión explícita a número por si la base de datos lo mandó como String
        category_id: Number(evento.category_id || (evento.category ? evento.category.id : 0)),
        company_id: Number(evento.company_id || (evento.company ? evento.company.id : 0)),
        pais_id: Number(evento.pais_id || (evento.pais ? evento.pais.id : 0)),

        fecha_inicio: fechaInicioFormateada,
        fecha_fin: fechaFinFormateada,

        status: evento.status,
        is_featured: Number(evento.is_featured) === 1,
        id: evento.id,
        event_id: evento.id
      });
    }, 50); 

    } else {
      this.title = 'Creando Evento';
    }
    this.loading = false;
    
  }

  onClose() {
    this.eventSeleccionado = null;
    this.title = 'Creando Evento';

    // 1. Reseteamos el formulario pasándole los valores iniciales limpios de un solo golpe
    this.eventoForm.reset({
      id: null,
      name: '',
      description: '',
      lugar: '',
      precio_general: '',
      precio_estudiantes: '',
      precio_especialistas: '',
      tickets_disponibles: '',
      fecha_inicio: '',
      fecha_fin: '',
      status: '',
      company_id: '',
      pais_id: '',
      category_id: '',
      is_featured: '',
      imagen: '',
    });

    // 2. 🚀 LA CLAVE: Forzamos a Angular a limpiar los estados de validación visuales (los bordes rojos/verdes)
    this.eventoForm.markAsPristine();
    this.eventoForm.markAsUntouched();
    this.eventoForm.updateValueAndValidity();

    // Emitimos el evento al padre para limpiar cualquier variable externa
    this.closeModal.emit();
  }

  validarFormulario() {
    this.eventoForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      lugar: [''],
      precio_general: [''],
      precio_estudiantes: [''],
      precio_especialistas: [''],
      tickets_disponibles: [''],
      fecha_inicio: [''],
      fecha_fin: [''],
      status: [''],
      company_id: [''],
      pais_id: [''],
      category_id: [''],
      is_featured: [''],
      imagen: [''],
    });
  }

  getCompanies() {
    this.companyService.getAll().subscribe(
      (res: any) => {
        this.companies = res.companies.data;
      }
    );
  }

  getCategories() {
    this.categoryService.getAll().subscribe(
      (res: any) => {
        this.categories = res.categories;
      }
    );
  }

  getPaisesList() {
    this.paisService.getCountries().subscribe(
      (resp: any) => {
        this.countries = resp.paises;

      }
    )
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
  get tickets_disponibles() { return this.eventoForm.get('tickets_disponibles'); }
  get fecha_inicio() { return this.eventoForm.get('fecha_inicio'); }
  get fecha_fin() { return this.eventoForm.get('fecha_fin'); }
  get status() { return this.eventoForm.get('status'); }
  get is_featured() { return this.eventoForm.get('is_featured' + ''); }
  get lugar() { return this.eventoForm.get('lugar'); }
  get pais_id() { return this.eventoForm.get('pais_id'); }
  get company_id() { return this.eventoForm.get('company_id'); }
  get category_id() { return this.eventoForm.get('category_id'); }

  onSubmit() {

    const formData = new FormData();
    formData.append('name', this.eventoForm.get('name').value);
    formData.append('description', this.eventoForm.get('description').value);
    formData.append('precio_general', this.eventoForm.get('precio_general').value);
    formData.append('precio_estudiantes', this.eventoForm.get('precio_estudiantes').value);
    formData.append('precio_especialistas', this.eventoForm.get('precio_especialistas').value);
    formData.append('tickets_disponibles', this.eventoForm.get('tickets_disponibles').value);
    formData.append('fecha_inicio', this.eventoForm.get('fecha_inicio').value);
    formData.append('fecha_fin', this.eventoForm.get('fecha_fin').value)
    formData.append('status', this.eventoForm.get('status').value);
    formData.append('lugar', this.eventoForm.get('lugar').value);
    formData.append('company_id', this.eventoForm.get('company_id').value);
    formData.append('pais_id', this.eventoForm.get('pais_id').value);
    formData.append('category_id', this.eventoForm.get('category_id').value);
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
            const modalElement = document.getElementById('editEvent');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
            this.refreshCatList.emit();
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
            const modalElement = document.getElementById('editEvent');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
            }
            this.refreshCatList.emit();
            this.loading = false;
          }
        },
        error => this.error = error
      );
    }
    // console.log(this.eventoForm.value)
  }


  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }


}
