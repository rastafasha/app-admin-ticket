import { RouterModule, Routes } from '@angular/router';


import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        
        children: [
            {
                path: 'admin',
                component: DashboardComponent,
                
                data: { titulo: 'Dashboard', }
            },

            

            { path: '', redirectTo: '/admin', pathMatch: 'full'},
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
