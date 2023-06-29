import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../../../../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  createUser() {
    return this.apiService.get('test').subscribe((data) => { console.log(data); });
  }
}
