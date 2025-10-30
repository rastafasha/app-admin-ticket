import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersListComponent } from './user-list/users-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ComponentsModule } from "../../components/components.module";
import { ProfileComponent } from './profile/profile.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    UserDetailsComponent,
    UserEditComponent,
    UsersListComponent,
    ProfileComponent
  ],
  exports: [
    UserDetailsComponent,
    UserEditComponent,
    
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
    ComponentsModule,
    PipesModule
]
})
export class UserModule { }
