import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { Role } from './_models';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { pageName: 'Home' }
    },
    {
        path: 'summary',
        component: SummaryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin], pageName: 'Summary' }
    },
    {
        path: 'login',
        component: LoginComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);