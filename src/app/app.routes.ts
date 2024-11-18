import { Routes } from '@angular/router';
import { LoginComponent } from './Main Pages/login/login.component';
import { DashboardComponent } from './Main Pages/dashboard/dashboard.component';
import { LayoutComponent } from './Main Pages/layout/layout.component';

export const routes: Routes = [

    {
        path : '',
        redirectTo: 'login',
        pathMatch:'full'
    },

    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children:[
            {
                path:'dashboard',
                component:DashboardComponent
            }
        ]
    }
];
