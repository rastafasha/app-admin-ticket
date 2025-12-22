import { Component } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { ClientService } from 'src/app/services/client.service';
import { CompanyService } from 'src/app/services/company.service';
import { EventoService } from 'src/app/services/evento.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-verify',
  templateUrl: './ticket-verify.component.html',
  styleUrls: ['./ticket-verify.component.css']
})
export class TicketVerifyComponent {

  title = 'Ticket Verification';
  ticketCode: string = '';
  verificationResult: string = '';
  isLoading = false;
  query: string = '';
  tickets: any;
  ticket: Ticket;

  client_id: number;
  from_id: number;
  event_id: number;
  company_id: number;

  comprado: string;
  client: string;
  event: string;
  company: string;

  constructor(
    private ticketService: TicketService,
    private clientService: ClientService,
    private ccompanyService: CompanyService,
    private eventService: EventoService,
  ) { }

  verifyTicket(ticket: string) {
    this.ticketCode = ticket;
    this.isLoading = true;
    // Simulate an API call to verify the ticket
    const data = 
    { referencia: this.ticketCode };
    this.ticketService.verify(data).subscribe((response: any) => {
      this.isLoading = false;
      if (response.valid) {
        this.verificationResult = 'Ticket is valid.';
      } else {
        this.verificationResult = 'Ticket is invalid.';
      }
    }, (error) => {
      this.isLoading = false;
      this.verificationResult = 'Error verifying ticket.';
    });
   
  }


  search() {
    return this.ticketService.search(this.query).subscribe(
      (res: any) => {
        console.log(res);
        this.tickets = res;
        this.ticket = this.tickets[0];
        this.client_id = this.ticket.client_id;
        this.from_id = this.ticket.from_id;
        this.event_id = this.ticket.event_id;
        this.company_id = this.ticket.company_id;

        this.getTicketCompradopor();
        this.getClient();
        this.getEvent();
        this.getCompany();
      },
      (err) => {
        console.log(err);
        this.tickets = null;
        this.ticket = null;
        this.client_id = null;
        this.event_id = null;
        this.company_id = null; 
        if (!this.query) {
          // this.ngOnInit();
        }
      });
  }

  public PageSize(): void {
    // this.ngOnInit();
    this.query = '';
  }


  getEvent(){
    this.eventService.getById(this.event_id).subscribe(
      (res:any)=>{
        console.log(res);
        this.event = res.event;
      }
    )
  }

  getTicketCompradopor(){
    this.clientService.getUserById(this.from_id).subscribe(
      (res:any)=>{
        console.log('from',res);
        this.comprado = res.cliente;
      }
    )
  }
  getClient(){
    this.clientService.getUserById(this.client_id).subscribe(
      (res:any)=>{
        console.log('cliente',res);
        this.client = res.cliente;
      }
    )
  }

  getCompany(){
    this.ccompanyService.getById(this.company_id).subscribe(
      (res:any)=>{
        console.log(res);
        this.company = res.company;
      }
    ) 
  }

}
