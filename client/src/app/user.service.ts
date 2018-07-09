import { Injectable } from '@angular/core';
import { User } from './user';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  currentUser: User = null;

  constructor(
    private _http: Http
  ) { }

  create(newUser: User, cb){
    this._http.post('/users', newUser).subscribe(
      res => {
        let user = res.json();
        if(!user.errors){
          this.currentUser = user;
        }
        cb(user);
      },
      err => console.log(err)
    );
  }

  logout(cb){
    this._http.delete('/users').subscribe(
      res => {
        this.currentUser = null;
        cb(res.json())
      },
      err => console.log(err)
    );
  }

  session(cb){
    this._http.get('/session').subscribe(
      res => cb(res.json()),
      err => console.log(err)
    );
  }

}
