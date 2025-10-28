import {
  AfterViewInit,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Calificacion } from 'src/app/models/calificacion';
import { Examen } from 'src/app/models/examen';
import { Materia } from 'src/app/models/materia';
import { Student } from 'src/app/models/student';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MateriaService } from 'src/app/services/materia.service';
import { Modal } from 'bootstrap';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-calificaciones-edit',
  templateUrl: './calificaciones-edit.component.html',
  styleUrls: ['./calificaciones-edit.component.css'],
})
export class CalificacionesEditComponent implements AfterViewInit {
  @Input() selectedMateria: number;
  @Input() userprofile: Student;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  @ViewChild('examenModal') modalElementRef: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  student_id: number;
  pageTitle: string;

  calificacion: Calificacion;
  materia: Materia | undefined;
  materias: Materia[] = [];
  examenSeleccionado: Examen;
  examen: Examen;

  public isLoading: boolean = false;
  loadingTitle!: string;
  materia_id: number;
  title: string;
  user: any;

  examenForm: FormGroup = new FormGroup({
    student_id: new FormControl('', [Validators.required]),
    user_id: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    materia_id: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    exam_date: new FormControl(''),
    puntaje: new FormControl(''),
    valor_examen: new FormControl(''),
  });

  private modalInstance: Modal;

  constructor(
    private calificacionesService: CalificacionService,
    private examenService: ExamenService,
    private materiaService: MateriaService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit() {
    if (this.modalElementRef) {
      this.modalInstance = new Modal(this.modalElementRef.nativeElement);
    }
  }

  ngOnInit() {
    let USER = localStorage.getItem('user');
    this.user = JSON.parse(USER ? USER : '');
    if (this.userprofile) {
      this.student_id = this.userprofile.id;
    }
  }

  ngOnChanges(): void {
    this.getMaterias();
    if (this.userprofile && this.userprofile.id) {
      this.student_id = this.userprofile.id;
    }
    this.getCalificacionMateria();
    this.validarFormularioPerfil();
    this.iniciarFormularioPerfil(this.selectedMateria);
    if (this.selectedMateria && this.userprofile && this.userprofile.id) {
    }
  }

  getMaterias() {
    this.materiaService.getMaterias().subscribe((resp: any) => {
      this.materias = resp;
      // console.log(resp);
    });
  }
  getCalificacionMateria() {
    this.calificacionesService
      .getCalificacionsbyMateriabyStudent(this.selectedMateria, this.student_id)
      .subscribe((resp: any) => {
        if (resp && resp.calificacion && resp.calificacion.length > 0) {
          this.calificacion = resp.calificacion[0];
          this.materia = resp.calificacion[0].materia;
        } else {
          this.calificacion = undefined;
          this.materia = undefined;
        }
        // console.log(resp);
      });
  }

  iniciarFormularioPerfil(id: number) {
    if (!id == null || !id == undefined || id) {
      this.pageTitle = 'Editar Examen';
      this.examenService.getExamen(id).subscribe((res: any) => {
        this.examenForm.patchValue({
          id: res.id,
          materia_id: res.materia_id,
          title: res.title,
          exam_date: res.exam_date,
          puntaje: res.puntaje,
          valor_examen: res.valor_examen,
          user_id: res.user_id,
          student_id: res.student_id,
        });
        this.examenSeleccionado = res;
        // console.log('examenSeleccionado',res);
      });
    } else {
      this.pageTitle = 'Crear Examen';
    }
  }

  validarFormularioPerfil() {
    this.examenForm = this.fb.group({
      title: ['', Validators.required],
      materia_id: ['', Validators.required],
      user_id: [this.user ? this.user.id : '', Validators.required],
      student_id: ['', Validators.required],
      exam_date: ['', Validators.required],
      puntaje: [''],
      valor_examen: [''],
      id: [''],
    });
  }

  onUserSave() {
    const formData = new FormData();
    formData.append('student_id', this.student_id + '');
    formData.append('user_id', this.user.id + '');
    // formData.append("title", this.examenForm.value.title);

    if (this.examenForm.value.title) {
      formData.append('title', this.examenForm.value.title);
    }
    if (this.examenForm.value.materia_id) {
      formData.append('materia_id', this.examenForm.value.materia_id);
    }

    if (this.examenForm.value.exam_date) {
      formData.append('exam_date', this.examenForm.value.exam_date);
    }
    if (this.examenForm.value.puntaje) {
      formData.append('puntaje', this.examenForm.value.puntaje);
    }
    if (this.examenForm.value.valor_examen) {
      formData.append('valor_examen', this.examenForm.value.valor_examen);
    }

    const data ={
      title: this.examenForm.value.title,
      materia_id: this.examenForm.value.materia_id,
      user_id: this.user.id,
      student_id: this.student_id,
      exam_date: this.examenForm.value.exam_date,
      puntaje: this.examenForm.value.puntaje,
      valor_examen: this.examenForm.value.valor_examen,

    }

    if (this.selectedMateria) {
      this.examenService
        .updateExamen(data, this.selectedMateria)
        .subscribe((resp: any) => {
          // console.log(resp);
          // this.profileSeleccionado = resp;
          // this.router.navigate(['/profile']);
          // Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
          this.ngOnInit();
          const modalElement = document.getElementById('examenModal');
          document.getElementsByClassName('exmodal');
          if (modalElement) {
            const modal = Modal.getInstance(modalElement);
            if (modal) {
              modal.hide();
              this.closeModal.emit();
              // Remove backdrop element from DOM
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop && backdrop.parentNode) {
                backdrop.parentNode.removeChild(backdrop);
              }
              // No need to remove classes manually from modalElement
            }
            this.closeModald();
          }
        });
    } else {
      this.examenService.createExamen(data).subscribe((resp: any) => {
        console.log(resp);
        // Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
        // this.router.navigate(['/students']);
        this.ngOnInit();
        const modalElement = document.getElementById('examenModal');
        document.getElementsByClassName('exmodal');
        if (modalElement) {
          const modal = Modal.getInstance(modalElement);
          if (modal) {
            modal.hide();
            this.closeModal.emit();
            // Remove backdrop element from DOM
            const backdrop = document.querySelector('.modal-backdrop');
            if (backdrop && backdrop.parentNode) {
              backdrop.parentNode.removeChild(backdrop);
            }
            // No need to remove classes manually from modalElement
          }
          this.closeModald();
        }
      });
    }
  }

  closeModald(){
      this.closeButton.nativeElement.click();
    }
}
