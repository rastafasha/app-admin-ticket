import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/users';
import { ParentService } from 'src/app/services/parent-service.service';
import { environment } from 'src/environments/environment';
import { StudentService } from 'src/app/services/student-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventoService } from 'src/app/services/evento.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-students',
  standalone: false,
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  title = "Eventos";
  @Input() event_id:string;
  @Input() user_id:string;

    
      loading = false;
      usersCount = 0;
      eventos: any;
      user: any;
      roles;
      role;
      isLoading:boolean=false;
    
      p: number = 1;
      id: number = 1;
      count: number = 8;
    
      error: string;
      selectedValue!: any;
      msm_error: string;
      query:string ='';
      payments:Payment;
    
      ServerUrl = environment.url_servicios;
      doctores;
      // role:any;
    
      constructor(
        private eventosService:EventoService,
        private location: Location,
        private http: HttpClient,
        public accountService: AuthService,
        public activatedRoute: ActivatedRoute,
        handler: HttpBackend
        ) {
          this.http = new HttpClient(handler);
        }
    
      ngOnInit(): void {
        window.scrollTo(0,0);
        this.accountService.closeMenu();
        this.role = this.accountService.role;
        if (this.activatedRoute.snapshot.params['id']) {
          this.activatedRoute.params.subscribe(({ id }) => this.getEventsbyUser(id));
        }else{
          this.getEvents();
          
        }

        
      }
    
    
      getEvents(): void {
        this.isLoading = true;
        this.eventosService.getAll().subscribe(
          (res:any) =>{
            this.eventos = res.events;
            error => this.error = error;
            this.isLoading = false;
            // console.log(this.students);
          }
        );
      }

      getEventsbyUser(id:number): void {
        this.isLoading = true;
        this.user_id = id.toString();
        this.eventosService.eventsbyUser(+id).subscribe(
          (res:any) =>{
            this.eventos = res.user.eventos;
            error => this.error = error;
            this.isLoading = false;
            console.log(this.eventos);
          }
        );
      }
    
    
      
      goBack() {
        this.location.back(); // <-- go back to previous location on cancel
      }
    
      search() {
        return this.eventosService.search(this.query).subscribe(
          (res:any)=>{
            console.log(res);
            this.eventos = res;
            if(!this.query){
              this.ngOnInit();
            }
          });
      }
    
      public PageSize(): void {
        this.ngOnInit();
        this.query = '';
      }
} 
