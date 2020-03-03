import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgetComponent } from './views/forget/forget.component';
import { SettingsLayoutComponent } from './views/settings/settings-layout/settings-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgetpassword',
    component: ForgetComponent,
    data: {
      title: 'Forget Password'
    }
  },
  {
    path: 'home',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'organization',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/organization/organization.module').then(m => m.OrganizationModule)
      },
      {
        path: 'onboarding',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/onboarding/onboarding.module').then(m => m.OnboardingModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        component: SettingsLayoutComponent,
        data: {
          title: 'Settings'
        },
        children: [
          {
            path: 'country',
            canActivate: [AuthGuard],
            loadChildren: () => import('./views/settings/country/country.module').then(m => m.CountryModule)
          },
          {
            path: 'city',
            canActivate: [AuthGuard],
            loadChildren: () => import('./views/settings/city/city.module').then(m => m.CityModule)
          },
          {
            path: 'state',
            canActivate: [AuthGuard],
            loadChildren: () => import('./views/settings/state/state.module').then(m => m.StateModule)
          },
          {
            path: 'role',
            canActivate: [AuthGuard],
            loadChildren: () => import('./views/settings/roles/roles.module').then(m => m.RolesModule)
          },
          {
            path: 'companyevent',
            canActivate: [AuthGuard],
            loadChildren: () => import('./views/settings/companyevents/companyevents.module').then(m => m.CompanyeventsModule)
          }
        ]
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
