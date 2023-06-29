import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import {

} from '../../actions/user.actions';

@Injectable()
export class UserEffects {


  constructor(private actions$: Actions, private userService: UserService) {}
}
