import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Poll } from './poll';
import { NewPoll } from './new-poll';

@Injectable()
export class PollService {

  constructor(
    private _http: Http
  ) { }

  index(cb){
    this._http.get('/polls').subscribe(
      res => cb(res.json()),
      err => console.log(err)
    );
  }

  create(newPoll: NewPoll, cb){
    this._http.post('/polls', newPoll).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    );
  }

  show(id:string, cb){
    this._http.get(`/polls/${id}`).subscribe(
      res =>  cb(res.json()),
      err => console.log(err)
    );
  }

  destroy(id:string, cb){
    this._http.delete(`/polls/${id}`).subscribe(
      res =>  cb(res.json()),
      err => console.log(err)
    );
  }

}
