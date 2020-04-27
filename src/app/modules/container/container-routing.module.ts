import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { InitialPageComponent } from './initial-page/initial-page.component';

const routes: Routes = [
    {
        path: '', component: InitialPageComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../client/client.module').then(m => m.ClientModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule)
            },
            {
                path: 'authentication',
                loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)
            },
            {
                path: '**',
                redirectTo: ''
            }
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContainerRoutingModule { }
