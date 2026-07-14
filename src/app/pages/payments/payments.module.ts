import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentEditComponent } from './payment-edit/payment-edit.component';
import { PaymentsComponent } from './payments.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ParentsModule } from '../clientes/clientes.module';
import { PagesModule } from "../pages.module";
import { ReportarPagoComponent } from './reportar-pago/reportar-pago.component';



@NgModule({
  declarations: [
    PaymentDetailsComponent,
    PaymentEditComponent,
    PaymentsComponent,
    ReportarPagoComponent
  ],
  
  exports: [
    PaymentDetailsComponent,
    PaymentEditComponent,
    PaymentsComponent,
    ReportarPagoComponent
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
    ComponentsModule,
    ParentsModule,
]
})
export class PaymentsModule { }
