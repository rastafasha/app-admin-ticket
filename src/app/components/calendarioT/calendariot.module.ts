import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioTComponent } from './calendario-t/calendario-t.component';
import { CalendariotEditComponent } from './calendariot-edit/calendariot-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CalendarioTComponent,
    CalendariotEditComponent
  ],
  exports: [
    CalendarioTComponent,
    CalendariotEditComponent
  ],
  imports: [
    CommonModule,
     CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BrowserAnimationsModule,
        NgxPaginationModule,
        SharedModule,
        PipesModule,
  ]
})
export class CalendariotModule { }
