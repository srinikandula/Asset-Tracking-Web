import {Input, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../../_helpers/auth.guard';
import {LayoutComponent} from './layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const layoutRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19,74, 72, 43, 78, 47, 80, 70, 76]},
                loadChildren: () => import('./dashboard/dashboard.module')
                    .then(m => m.DashboardModule)
            },
            {path: '', pathMatch: 'full', component: DashboardComponent},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(layoutRoutes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {
}
