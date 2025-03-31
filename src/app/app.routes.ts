// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/AuthGuard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TaskListComponent } from './tasks/pages/task-list/task-list.component';
import { TaskFormComponent } from './tasks/pages/task-form/task-form.component';
import { HomeComponent } from './tasks/pages/home/home.component';
import { TaskEditComponent } from './tasks/pages/task-edit/task-edit.component';
import { MyInfosComponent } from './tasks/pages/my-infos/my-infos.component';

export const routes: Routes = [
  // Rotas públicas
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  
  // Rotas protegidas 
  { 
    path: 'tasks', 
    canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'new', component: TaskFormComponent },
      { path: ':id', component: TaskEditComponent }
    ]
  },
  
 { path: 'me', component: MyInfosComponent, canActivate: [AuthGuard] },

  // Redirecionamentos
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: '**', redirectTo: '/tasks' }
];