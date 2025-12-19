import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventosclienteComponent } from './eventoscliente/eventoscliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListapaymentsComponent } from './listapayments/listapayments.component';
import { SharedModule } from '../shared/shared.module';
import { RecentpaymentsComponent } from './recentpayments/recentpayments.component';
import { TasadiabcvComponent } from './tasadiabcv/tasadiabcv.component';
import { PipesModule } from '../pipes/pipes.module';
import { SubscriptoresComponent } from './subscriptores/subscriptores.component';
import { PagosEventoComponent } from './pagos-evento/pagos-evento.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChart2Component } from './charts/pie-chart2/pie-chart2.component';
import { ListahijosComponent } from './listahijos/listahijos.component';
import { ListemployeesComponent } from './listemployees/listemployees.component';
@NgModule({
  declarations: [EventosclienteComponent, ListapaymentsComponent,  
    RecentpaymentsComponent, TasadiabcvComponent, SubscriptoresComponent, 
    PagosEventoComponent, PieChartComponent, LineChartComponent, BarChartComponent, 
    PieChart2Component, ListahijosComponent, ListemployeesComponent 
  ],

  exports: [EventosclienteComponent, ListapaymentsComponent,
    RecentpaymentsComponent, TasadiabcvComponent, SubscriptoresComponent,
     PagosEventoComponent, PieChartComponent,LineChartComponent, BarChartComponent,
    PieChart2Component,ListahijosComponent, ListemployeesComponent
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
