import { Component, Input } from '@angular/core';
import { single } from './data';
import { GraficoService } from 'src/app/services/grafico.service';
import { EventoService } from 'src/app/services/evento.service';

interface Grafico {
  name: string;
  value: number;
}
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  //  single: any[];
  view: [number,number] = [700, 400];
  @Input() event;

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  isLoading: boolean = false;
  error: string;
  filteredClients: any[];
  clients: any[];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  private data: Grafico[]  = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  },
    {
    "name": "UK",
    "value": 6200000
  }
];

  getgraficoData(){
    return this.data;
  }

  randomData(){
      this.data = [
  {
    "name": "Germany",
    "value": Math.random() * 1000000
  },
  {
    "name": "USA",
    "value": Math.random() * 1000000
  },
  {
    "name": "France",
    "value": Math.random() * 1000000
  },
    {
    "name": "UK",
    "value": Math.random() * 1000000
  }
]
  }

  constructor(
     private eventoService: EventoService,

  ) {
    // Object.assign(this, { single });
  }

  get single(){
    return this.getgraficoData();
  }

  onRandomData(){
    this.randomData();
  }

  getEventos(): void {
      if (!this.event || !this.event.id) {
        this.isLoading = false;
        this.error = 'User profile is not defined';
        return;
      }
      this.isLoading = true;
      this.eventoService.getClientsbyEvent(this.event.id).subscribe(
        (res: any) => {
          this.event = res.event;
          this.clients = res.event.clients.map(client => ({
            ...client,
            asistencia: !!client.pivot?.asistencia,
            ticketCount: 0 // Initialize ticketCount
          }));

          this.filteredClients = this.clients;
          // this.name = this.event.name;
          // this.value = this.event.name;

          this.filteredClients = this.event.clients;


          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
