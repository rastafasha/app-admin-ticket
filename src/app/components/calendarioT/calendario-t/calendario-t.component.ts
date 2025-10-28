import { Component, Input } from '@angular/core';
import { CalendarioTareas } from 'src/app/models/calendariotarea';
import { CalendariotareaService } from 'src/app/services/calendariotarea.service';

@Component({
  selector: 'app-calendario-t',
  templateUrl: './calendario-t.component.html',
  styleUrls: ['./calendario-t.component.css'],
})
export class CalendarioTComponent {
  title = 'calendario-t';
  calendariotareas: CalendarioTareas;
  @Input() user: any;
  isLoading: boolean = false;

  selectedStudentProfile: CalendarioTareas;
  selectedCalendario: CalendarioTareas;

  constructor(private calendarioService: CalendariotareaService) {}

  ngOnInit() {
    this.user;
    this.getCalendariosBymaestro();
  }

  getCalendariosBymaestro() {
    this.isLoading = true;
    this.calendarioService
      .getCalendarioTareabyMaestro(this.user.id)
      .subscribe((resp: any) => {
        this.calendariotareas = resp.calendariotareas;
        this.isLoading = false;
      });
  }

  openPaymentsModal(cal: CalendarioTareas): void {
    this.selectedCalendario = cal;
    console.log(cal);
  }

  openNewModal(cal: CalendarioTareas): void {
    this.selectedStudentProfile = cal;
    console.log(cal);
  }
}
