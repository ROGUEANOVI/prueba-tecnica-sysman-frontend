import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'materials',
    loadChildren: () =>
      import('./modules/materials/materials.module').then(
        (m) => m.MaterialsModule
      ),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
