import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListahijosComponent } from './listahijos/listahijos.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListapaymentsComponent } from './listapayments/listapayments.component';
import { ListapaymentshijoComponent } from './listapaymentshijo/listapaymentshijo.component';
import { SharedModule } from '../shared/shared.module';
import { RecentpaymentsComponent } from './recentpayments/recentpayments.component';
import { TasadiabcvComponent } from './tasadiabcv/tasadiabcv.component';
import { StatuspagosComponent } from './statuspagos/statuspagos.component';
import { PipesModule } from '../pipes/pipes.module';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { CalificacionesEditComponent } from './calificaciones-edit/calificaciones-edit.component';
import { ExamenesStudentComponent } from './examenes-student/examenes-student.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChart2Component } from './charts/pie-chart2/pie-chart2.component';
import { CalendariotModule } from './calendarioT/calendariot.module';
import { CalculadorBarComponent } from './calculador-bar/calculador-bar.component';
@NgModule({
  declarations: [ListahijosComponent, ListapaymentsComponent, ListapaymentshijoComponent, 
    RecentpaymentsComponent, TasadiabcvComponent,StatuspagosComponent, CalificacionesComponent, 
    CalificacionesEditComponent, ExamenesStudentComponent, PieChartComponent, LineChartComponent, BarChartComponent, 
    PieChart2Component, CalculadorBarComponent, 
  ],

  exports: [ListahijosComponent, ListapaymentsComponent, ListapaymentshijoComponent,
    RecentpaymentsComponent, TasadiabcvComponent,StatuspagosComponent, CalificacionesComponent,
    CalificacionesEditComponent  , ExamenesStudentComponent, PieChartComponent,LineChartComponent, BarChartComponent,
    PieChart2Component,CalculadorBarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    CKEditorModule,
    SharedModule,
    PipesModule,
    NgxChartsModule,
    CalendariotModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
