import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { deleteUser, loadUsers } from '../../store/actions/user.actions';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(public store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadUsers({users: [{_id: 'a', name: 'joe', email: '', username: ''}]}));
    this.store.dispatch(deleteUser({_id: 'a'}));
    console.log('users reducers')
  }

}
