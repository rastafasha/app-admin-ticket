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
import { ImagenPipe } from 'src/app/pipes/imagen.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    PaymentDetailsComponent,
    PaymentEditComponent,
    PaymentsComponent,
    
    
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
        ComponentsModule
  ]
})
export class PaymentsModule { }
