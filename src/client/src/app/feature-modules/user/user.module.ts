import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { OverviewComponent } from './pages/overview/overview.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { UserListComponent } from './components/user-list/user-list.component';
import * as fromUser from './store/reducers/user.reducer'
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user/user.effects';

@NgModule({
  declarations: [
    OverviewComponent,
    UserCreateComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('user', fromUser.userReducer),
    EffectsModule.forFeature([UserEffects]),
  ]
})
export class UserModule { }
