import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Evento } from 'src/app/models/evento';
import { Student } from 'src/app/models/student';
import { EventoService } from 'src/app/services/evento.service';
import { ParentService } from 'src/app/services/parent-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listahijos',
  standalone: false,
  templateUrl: './listahijos.component.html',
  styleUrls: ['./listahijos.component.css']
})
export class ListahijosComponent implements OnChanges {
  @Input() userprofile: any;
  @Input() showMatricula: boolean = true;
  @Input() showAcciones: boolean = true;
  @Input() showGenero: boolean = true;
  @Input() showNacimiento: boolean = true;
  isLoading = false;
  title = 'Padres';

  loading = false;
  usersCount = 0;
  events: Evento;
  eventprofile: Evento;
  roles;

  p: number = 1;
  count: number = 8;

  error: string;
  selectedValue!: any;
  msm_error: string;
  query: string = '';

  ServerUrl = environment.url_servicios;
  doctores;
  // role:any;

  selectedStudentProfile: Student;

  constructor(
    private parentService: ParentService,
    private eventosService: EventoService,
    private http: HttpClient,
    handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    // console.log(this.userprofile);
    // Removed this.getUsers() from here to avoid calling before userprofile is set
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userprofile'] && this.userprofile && this.userprofile.id) {
      this.getEvents();
    }
  }

  getEvents(): void {
    if (!this.userprofile || !this.userprofile.id) {
      this.isLoading = false;
      this.error = 'User profile is not defined';
      return;
    }
    this.isLoading = true;
    this.eventosService.getUserbyEvent(this.userprofile.id).subscribe(
      (res: any) => {
        this.events = res.events;
        this.isLoading = false;
      },
      (error) => {
        this.error = error;
        this.isLoading = false;
      }
    );
  }

  search() {
    return this.eventosService.search(this.query).subscribe((res: any) => {
      this.events = res;
      if (!this.query) {
        this.ngOnInit();
      }
    });
  }

  public PageSize(): void {
    this.getEvents();
    this.query = '';
  }

  openPaymentsModal(student: Student): void {
    this.selectedStudentProfile = student;
  }
}
