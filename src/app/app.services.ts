import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";
//import "rxjs/add/operator/map";

@Injectable()
export class LogginServices {
  constructor(private http: Http) {}

  loggin(user: string, pass: string){
    const url = "http://localhost:3000/loggin/" + user + "&" + pass;
    return this.http.get(url);
  }
}
