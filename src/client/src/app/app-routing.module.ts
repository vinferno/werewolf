import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageCreateGameComponent } from './pages/page-create-game/page-create-game.component';
import { PageJoinGameComponent } from './pages/page-join-game/page-join-game.component';

const routes: Routes = [
  { path: 'join-game', component: PageJoinGameComponent },
  { path: 'create-game', component: PageCreateGameComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature-modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./feature-modules/user/user.module').then((m) => m.UserModule),
  },
  { path: '**', redirectTo: 'admin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
