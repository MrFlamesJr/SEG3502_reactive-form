import { Routes } from '@angular/router';
import { UserForm } from './user-form/user-form';
import { UserResult } from './user-result/user-result';

export const routes: Routes = [
  { path: 'form', component: UserForm },
  { path: 'result', component: UserResult },
  { path: '', redirectTo: 'form', pathMatch: 'full' },
  { path: '**', redirectTo: 'form' },
];
