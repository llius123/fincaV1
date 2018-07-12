import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class SqlService {

  constructor(private http: Http) { }

  allUsers(){
    const url = "http://localhost:3000/allUsers";
    return this.http.get(url);
  }
}
