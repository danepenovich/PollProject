import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class OptionService {

  constructor(
    private _http: Http
  ) { }

  update(id: string, cb){
    this._http.put(`options/${id}`, {}).subscribe(
      res => cb(res.json()),
      err => console.log(err)
    );
  }

}
