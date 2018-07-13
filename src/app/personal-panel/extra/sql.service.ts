import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable()
export class SqlService {
  constructor(private http: Http) {}

  loggin(user: string, pass: string) {
    const url = "http://localhost:3000/loggin/" + user + "/" + pass;
    return this.http.get(url);
  }

  //Lista de todos los usuarios de la base de datos
  allUsers() {
    const url = "http://localhost:3000/allUsers";
    return this.http.get(url);
  }

  //Devuelve el string del type_id
  getType(number: number) {
    const url = "http://localhost:3000/type/" + number;
    return this.http.get(url);
  }
}
