import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//pages
import { DashboardComponent } from './dashboard/dashboard.component';
import { SliderEditComponent } from './slider/slider-edit/slider-edit.component';
import { SliderIndexComponent } from './slider/slider-index/slider-index.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersListComponent } from './users/user-list/users-list.component';
import { PaymentEditComponent } from './payments/payment-edit/payment-edit.component';
import { PaymentDetailsComponent } from './payments/payment-details/payment-details.component';
import { Payment } from '../models/payment';
import { PaymentsComponent } from './payments/payments.component';
import { ListComponent } from './parents/list/list.component';
import { DetailparentComponent } from './parents/detailparent/detailparent.component';
import { ConfigComponent } from './config/config.component';
import { TasabcvComponent } from './tasabcv/tasabcv.component';
import { MateriasComponent } from './materias/materias.component';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentsComponent } from './students/students.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EventoEditComponent } from './students/evento-edit/evento-edit.component';

const childRoutes: Routes = [

    { path: '',  component: DashboardComponent, data:{title:'Dashboard'} },
    //auth

    //paginas

            { path: 'partners', component: UsersListComponent},
            { path: 'partner/create', component: UserEditComponent},
            { path: 'partner/edit/:id', component: UserEditComponent},
            { path: 'partner/profile/:id', component: ProfileComponent},
            { path: 'partner/detail/:id', component: UserDetailsComponent},
            
            { path: 'clientes', component: ListComponent},
            { path: 'cliente/detail/:id', component: DetailparentComponent},
            
            { path: 'slider', component: SliderIndexComponent},
            { path: 'slider/create', component: SliderEditComponent},
            { path: 'slider/edit/:id', component: SliderEditComponent},
            
            { path: 'payments', component: PaymentsComponent},
            { path: 'payment/edit/:id', component: PaymentEditComponent},
            { path: 'payment-detail/:id', component: PaymentDetailsComponent},
            
            { path: 'config', component: ConfigComponent},
            { path: 'tasabcv', component: TasabcvComponent},
            { path: 'materias', component: MateriasComponent},
            
            { path: 'eventos', component: StudentsComponent},
            { path: 'evento/create', component: EventoEditComponent},
            { path: 'evento/edit/:id', component: EventoEditComponent},
            { path: 'evento/detail/:id', component: StudentDetailComponent},
            { path: 'eventos/partner/:id', component: StudentsComponent},


    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: '**', component:  DashboardComponent },





]

@NgModule({
  imports: [
    // RouterModule.forRoot(appRoute),
    RouterModule.forChild(childRoutes),
  ],
    exports: [ RouterModule ],
})
export class ChildRoutesModule { }
