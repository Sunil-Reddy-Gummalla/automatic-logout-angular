import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AutomaticLogoutComponent } from './automatic-logout/automatic-logout.component';
import { DummyComponent } from './dummy/dummy.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'automatic-logout', component: AutomaticLogoutComponent },
    { path: 'dummy', component: DummyComponent },
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
