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
import { PaymentsComponent } from './payments/payments.component';
import { ListComponent } from './clientes/list/list.component';
import { ClientdetailComponent } from './clientes/clientdetail/clientdetail.component';
import { ConfigComponent } from './config/config.component';
import { TasabcvComponent } from './tasabcv/tasabcv.component';
import { EventoDetailComponent } from './eventos/evento-detail/evento-detail.component';
import { EventosComponent } from './eventos/eventos.component';
import { ProfileComponent } from './users/profile/profile.component';
import { EventoEditComponent } from './eventos/evento-edit/evento-edit.component';
import { CompanyListComponent } from './company/list/Companylist.component';
import { EditCompanyComponent } from './company/edit/edit.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { TicketVerifyComponent } from './ticket/ticket-verify/ticket-verify.component';
import { CategoriaComponent } from './config/categoria/categoria.component';
import { CatEditComponent } from './config/categoria/cat-edit/cat-edit.component';

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
            { path: 'cliente/detail/:id', component: ClientdetailComponent},
            
            { path: 'slider', component: SliderIndexComponent},
            { path: 'slider/create', component: SliderEditComponent},
            { path: 'slider/edit/:id', component: SliderEditComponent},
            
            { path: 'payments', component: PaymentsComponent},
            { path: 'payment/edit/:id', component: PaymentEditComponent},
            { path: 'payment-detail/:id', component: PaymentDetailsComponent},
            
            { path: 'config', component: ConfigComponent},
            { path: 'tasabcv', component: TasabcvComponent},
            
            { path: 'eventos', component: EventosComponent},
            { path: 'evento/create', component: EventoEditComponent},
            { path: 'evento/edit/:id', component: EventoEditComponent},
            { path: 'evento/detail/:id', component: EventoDetailComponent},
            { path: 'eventos/partner/:id', component: EventosComponent},

            { path: 'companies', component: CompanyListComponent},
            { path: 'company/create', component: EditCompanyComponent},
            { path: 'company/edit/:id', component: EditCompanyComponent},
            { path: 'company/detail/:id', component: CompanyDetailComponent},
            { path: 'companies/partner/:id', component: CompanyListComponent},
            
            { path: 'categories', component: CategoriaComponent},
            { path: 'category/create', component: CatEditComponent},
            { path: 'category/edit/:id', component: CatEditComponent},

            { path: 'ticket/verify', component: TicketVerifyComponent},

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
