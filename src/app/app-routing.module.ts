import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./_helpers/auth.guard";
import {LoginComponent} from "./main/authentication/login/login.component";
import {SignupComponent} from "./main/authentication/signup/signup.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {expectedRole: [45, 41, 40, 35, 31, 30, 29, 28, 27, 26, 25, 20, 19, 74, 72, 43, 78, 47,80, 70, 76]},
    loadChildren: () => import('./main/layout/layout.module')
      .then(m => m.LayoutModule)
  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
