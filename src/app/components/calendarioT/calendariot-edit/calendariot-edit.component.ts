import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Modal } from 'bootstrap';
import { CalendarioTareas } from 'src/app/models/calendariotarea';
import { Examen } from 'src/app/models/examen';
import { Materia } from 'src/app/models/materia';
import { Student } from 'src/app/models/student';
import { AuthService } from 'src/app/services/auth.service';
import { CalendariotareaService } from 'src/app/services/calendariotarea.service';
import { ExamenService } from 'src/app/services/examen.service';
import { MateriaService } from 'src/app/services/materia.service';

@Component({
  selector: 'app-calendariot-edit',
  templateUrl: './calendariot-edit.component.html',
  styleUrls: ['./calendariot-edit.component.css']
})
export class CalendariotEditComponent {

@Input() selectedCalendario: CalendarioTareas;
  @Input() userprofile: Student;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  @ViewChild('calendarioModal') modalElementRef: ElementRef;
  @ViewChild('closeButton') closeButton!: ElementRef;
  student_id: number;
  pageTitle: string;

  calendariotarea: CalendarioTareas;
  materia: Materia | undefined;
  materias: Materia[] = [];
  examenSeleccionado: Examen;
  examen: Examen;

  public isLoading: boolean = false;
  loadingTitle!: string;
  title: string;
  user: any;

  examenForm: FormGroup = new FormGroup({
    user_id: new FormControl('', [
      Validators.required,
    ]),
    status: new FormControl('', [Validators.required]),
    title: new FormControl(''),
    fecha_entrega: new FormControl(''),
    description: new FormControl(''),
  });

  private modalInstance: Modal;

  constructor(
    private calendarioService: CalendariotareaService,
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
    console.log(this.selectedCalendario);
    if (this.userprofile && this.userprofile.id) {
      this.student_id = this.userprofile.id;
    }
    this.getCalendarioTarea();
    this.validarFormularioPerfil();
    this.iniciarFormularioPerfil(this.selectedCalendario.id);
    if (this.selectedCalendario && this.userprofile && this.userprofile.id) {
    }
  }

  getCalendarioTarea() {
    this.calendarioService
      .getCalendarioTareabyMaestro(this.student_id)
      .subscribe((resp: any) => {
        if (resp && resp.calificacion && resp.calificacion.length > 0) {
          this.calendariotarea = resp.calendariotarea[0];
        } else {
          this.calendariotarea = undefined;
        }
        // console.log(resp);
      });
  }

  iniciarFormularioPerfil(id: number) {
    if (!id == null || !id == undefined || id) {
      this.pageTitle = 'Editar Examen';
      this.calendarioService.getCalendarioTarea(this.selectedCalendario.id).subscribe((res: any) => {
        this.examenForm.patchValue({
          id: res.id,
          title: res.title,
          fecha_entrega: res.fecha_entrega,
          description: res.description,
          status: res.status,
          user_id: res.user_id,
        });
        this.examenSeleccionado = res;
        console.log('examenSeleccionado',res);
      });
    } else {
      this.pageTitle = 'Crear Examen';
    }
  }

  validarFormularioPerfil() {
    this.examenForm = this.fb.group({
      title: ['', Validators.required],
      user_id: [this.user ? this.user.id : '', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      fecha_entrega: ['', Validators.required],
      id: [''],
    });
  }


  onUserSave() {
      const formData = new FormData();
      // formData.append('student_id', this.student_id + '');
      formData.append('user_id', this.user.id + '');
      // formData.append("title", this.examenForm.value.title);
  
      // if (this.examenForm.value.title) {
      //   formData.append('title', this.examenForm.value.title);
      // }
      // if (this.examenForm.value.description) {
      //   formData.append('description', this.examenForm.value.description);
      // }
  
      // if (this.examenForm.value.fecha_entrega) {
      //   formData.append('fecha_entrega', this.examenForm.value.fecha_entrega);
      // }
      
      const data ={
        user_id: this.user.id,
        title: this.examenForm.value.title,
        description: this.examenForm.value.description,
        status: this.examenForm.value.status,
        fecha_entrega: this.examenForm.value.fecha_entrega,
  
      }
  
      if (this.selectedCalendario) {
        this.calendarioService
          .updateCalendarioTarea(data, this.selectedCalendario.id)
          .subscribe((resp: any) => {
            // console.log(resp);
            // this.profileSeleccionado = resp;
            // this.router.navigate(['/profile']);
            // Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
            this.ngOnInit();
            const modalElement = document.getElementById('calendarioModal');
            document.getElementsByClassName('calendmodal');
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
        this.calendarioService.createCalendarioTarea(data).subscribe((resp: any) => {
          console.log(resp);
          // Swal.fire('Exito!', 'Se ha actualizado la formData', 'success');
          // this.router.navigate(['/students']);
          this.ngOnInit();
          const modalElement = document.getElementById('calendarioModal');
          document.getElementsByClassName('calendmodal');
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
