import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { GraficoService } from 'src/app/services/grafico.service';
import { EventoService } from 'src/app/services/evento.service';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from 'src/app/models/pais';

interface Grafico {
  name: string;
  value: number;
}
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  //  single: any[];
  view: [number,number] = [500, 300];
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
  pais_id:number;
  pais:Pais;
  paises: Pais[] = [];
  
  // Data for charts
  dataCountry: Grafico[] = [];
  dataGender: Grafico[] = [];
  dataGenderLabel: { [key: number]: string } = {
    0: 'Femenino',
    1: 'Masculino',
    2: 'Otro',
    3: 'Prefiero no decir'
  };

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF8042', '#00b5ad']
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


  

  constructor(
     private eventoService: EventoService,
     private paiservice: PaisService,
  ) {
    // Object.assign(this, { single });
  }

  ngOnInit(): void {
    // this.loadPaises();
  }

  loadPaises(callback?: () => void): void {
    this.paiservice.getPaises().subscribe(
      (res: any) => {
        this.paises = res.paises;
        // Execute callback if provided (to process data after countries are loaded)
        if (callback) {
          callback();
        }
      },
      (error) => {
        console.error('Error loading countries:', error);
      }
    );
  }

   ngOnChanges(changes: SimpleChanges) {
      console.log('ngOnChanges called with filteredClients:', this.event);
      if (changes['event'] && this.event !== undefined) {
       this.getClientesEvento()
      }
    }

  get single(){
    return this.getClientesEvento();
  }

  getClientesEvento(): void {
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

          this.filteredClients = this.event.clients;
          console.log(this.event);
          
          // Process data for charts
          this.processDataByCountry();
          this.processDataByGender();
          
          this.isLoading = false;
        },
        (error) => {
          this.error = error;
          this.isLoading = false;
        }
      );
    }

    /**
     * Process clients data to group by country
     */
    processDataByCountry(): void {
      if (!this.event?.clients) {
        this.dataCountry = [];
        return;
      }

      // Ensure paises is initialized
      if (!this.paises || !this.paises.length) {
        this.loadPaises(() => this.processDataByCountry());
        return;
      }

      const countryCount: { [key: number]: number } = {};

      // Count clients per country
      this.event.clients.forEach(client => {
        if (client.pais_id) {
          countryCount[client.pais_id] = (countryCount[client.pais_id] || 0) + 1;
        }
      });

      // Create chart data with country names
      this.dataCountry = Object.keys(countryCount).map(paisId => {
        const pais = this.paises.find(p => p.id === Number(paisId));
        return {
          name: pais ? pais.title : `País ${paisId}`,
          value: countryCount[Number(paisId)]
        };
      });

      console.log('Data by country:', this.dataCountry);
    }

    /**
     * Process clients data to group by gender
     */
    processDataByGender(): void {
      if (!this.event?.clients) {
        this.dataGender = [];
        return;
      }

      const genderCount: { [key: number]: number } = {};

      // Count clients per gender
      this.event.clients.forEach(client => {
        if (client.gender !== undefined && client.gender !== null) {
          genderCount[client.gender] = (genderCount[client.gender] || 0) + 1;
        }
      });

      // Create chart data with gender labels
      this.dataGender = Object.keys(genderCount).map(genderId => {
        return {
          name: this.dataGenderLabel[Number(genderId)] || `Género ${genderId}`,
          value: genderCount[Number(genderId)]
        };
      });

      console.log('Data by gender:', this.dataGender);
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
