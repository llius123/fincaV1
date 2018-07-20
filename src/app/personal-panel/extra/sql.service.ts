import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actas } from './interfaces.services';

@Injectable()
export class SqlService {

  base = "http://localhost:3000";

  constructor(private http: Http,
              private http2: HttpClient) {}

  loggin(user: string, pass: string) {
    const url =this.base + "/loggin/" + user + "/" + pass;
    return this.http.get(url);
  }

  //Lista de todos los usuarios de la base de datos
  allUsers() {
    const url =this.base + "/allUsers";
    return this.http.get(url);
  }

  //Devuelve el string del type_id
  getType(number: number) {
    const url =this.base + "/type/" + number;
    return this.http.get(url);
  }

  //Updateo los datos del usuario
  updateUser(user: any){
    const url = this.base + "/updateUser/" + user.nombre +'&'+user.telefono+'&'+user.puerta+'&'+user.usuario+'&'+user.pass+'&'+user.id;
    return this.http.put(url, JSON.stringify(user));
  }

  //Lista todas las actas
  allActas(){
    const url = this.base + "/allActas";
    return this.http2.get(url);
  }

  //Busco un acta determinada
  acta(id: number){
    const url = this.base + "/acta/" + id;
    return this.http2.get(url);
  }

  //Listo todos los gastos
  allGastos(){
    const url = this.base + "/allGastos";
    return this.http2.get(url);
  }
}
