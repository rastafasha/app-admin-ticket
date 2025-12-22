import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnChanges {
  public chart: Chart;
  @Input() filteredClients: any;

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges called with filteredClients:', this.filteredClients);
    if (changes['filteredClients'] && this.filteredClients !== undefined) {
      this.createChart();
    }
  }
  event(arg0: string, event: any) {
    throw new Error('Method not implemented.');
  }

  createChart() {
    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    // Helper function to generate random color
    function getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // Group event by client.gender
    const grouped: { [key: string]: number[] } = {};
    if (this.filteredClients) {
      this.filteredClients.forEach((client) => {
        const date = new Date(client.created_at);
        const month = date.getMonth(); // 0-based month index
        const gender = client.gender || 'Desconocido';

        if (!grouped[gender]) {
          grouped[gender] = new Array(12).fill(0);
        }
        grouped[gender][month] += 1; // Increment count for the month
      });
    }

    const datasets = Object.keys(grouped).map((gender) => ({
      label: gender,
      data: grouped[gender],
      fill: false,
      borderColor: getRandomColor(),
      tension: 0.1,
    }));

    const data = {
      labels: labels,
      datasets: datasets,
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('lineChart', {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
