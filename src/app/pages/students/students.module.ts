import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventoEditComponent } from './evento-edit/evento-edit.component';



@NgModule({
  declarations: [
    StudentsComponent, StudentDetailComponent, EventoEditComponent
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
       ComponentsModule,
       SharedModule,
       PipesModule
  ]
})
export class StudentsModule { }
