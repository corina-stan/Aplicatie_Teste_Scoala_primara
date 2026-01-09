import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TestListComponent } from './components/test-list/test-list.component';
import { TestFormComponent } from './components/test-form/test-form.component';
import { TestSolveComponent } from './components/test-solve/test-solve.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tests/:discipline/:grade',
    component: TestListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'test/new',
    component: TestFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'parent'] }
  },
  {
    path: 'test/edit/:id',
    component: TestFormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'parent'] }
  },
  {
    path: 'test/:id',
    component: TestSolveComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
