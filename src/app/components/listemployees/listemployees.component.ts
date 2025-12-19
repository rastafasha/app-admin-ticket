import { HttpClient, HttpBackend } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Evento } from 'src/app/models/evento';
import { Parent } from 'src/app/models/parents';
import { Payment } from 'src/app/models/payment';
import { User } from 'src/app/models/users';
import { CompanyService } from 'src/app/services/company.service';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listemployees',
  templateUrl: './listemployees.component.html',
  styleUrls: ['./listemployees.component.css']
})
export class ListemployeesComponent {

  @Input() companySelected: Company;
      asistencia= false;
      isLoading = false;
      title = 'Empleados del Evento';
    
      loading = false;
      usersCount = 0;
      employees: User[];
      eventos: Evento;
      clients: Parent[];
      filteredClients: Parent[];
      client_id: number;
      events: Evento[] = [];
      clienteProfile: any;
      roles;
  
      p: number = 1;
      count: number = 8;
      ticketCount!: number ;
      
      error: string;
      selectedValue!: any;
      msm_error: string;
      query: string = '';
      payments: Payment[] = [];
      eventPaymentCounts: { [eventId: number]: number } = {};
      paymentscount: number = 0;
      
      ServerUrl = environment.url_servicios;

      company_id:number = null;
    
      constructor(
       private companyService: CompanyService,
       private paymentService: PaymentService,
        private http: HttpClient,
        handler: HttpBackend
      ) {
        this.http = new HttpClient(handler);
      }
    
      ngOnInit(): void {
        window.scrollTo(0, 0);
      }
    
      ngOnChanges(changes: SimpleChanges): void {
        if (changes['companySelected'] && this.companySelected && this.companySelected.id) {
          
          this.getEmployees();
        }
      }
    
      getEmployees(): void {
        if (!this.companySelected || !this.companySelected.id) {
          this.isLoading = false;
          this.error = 'Company is not defined';
          return;
        }
        this.isLoading = true;
        this.companyService.usersById(this.companySelected.id).subscribe(
          (res: any) => {
            this.filteredClients = res.company.users;
            console.log(res);
        
            this.isLoading = false;
          },
          (error) => {
            this.error = error;
            this.isLoading = false;
          }
        );
      }
  
      search() {
        if (!this.query) {
          this.filteredClients = this.clients;
        } else {
          this.filteredClients = this.clients.filter(client =>
            client.name.toLowerCase().includes(this.query.toLowerCase())
          );
        }
      }
    
      public PageSize(): void {
        this.getEmployees();
        this.query = '';
        this.filteredClients = this.clients;
      }
    
      
  
      selectClient(client){
        this.clienteProfile = client;
        console.log('cliente', client)
      }

      removeColab(client: number) {
        this.company_id = this.companySelected.id
          const data = {
            user_id: client,
            company_id: this.companySelected.id
          }
          this.companyService.removeColaborador( this.company_id, data).subscribe(
            (res: any) => {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Colaborador eliminado',
                showConfirmButton: false,
                timer: 1500,
              });
              this.getEmployees();
            })       
          }
  
      
}
