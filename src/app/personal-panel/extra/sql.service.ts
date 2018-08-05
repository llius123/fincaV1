import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Actas } from './interfaces.services';

@Injectable()
export class SqlService {
  base = "http://localhost:3000";

  constructor(private http: Http, private http2: HttpClient) {}

  loggin(user: string, pass: string) {
    const url = this.base + "/loggin/" + user + "/" + pass;
    return this.http.get(url);
  }

  //Lista de todos los usuarios de la base de datos
  allUsers() {
    const url = this.base + "/allUsers";
    return this.http2.get(url);
  }
  //Creo nuevo usuario
  newUser(
    name: string,
    phone: string,
    door: number,
    type: number,
    user: string,
    password: string
  ) {
    const url =
      this.base +
      "/newUser/" +
      name +
      "&" +
      phone +
      "&" +
      door +
      "&" +
      type +
      "&" +
      user +
      "&" +
      password;
    return this.http2.post(url, name);
  }
  //Edito un usuario
  editUser(
    name: string,
    phone: string,
    door: number,
    type: number,
    user: string,
    password: string,
    id: number
  ) {
    const url =
      this.base +
      "/updateUser/" +
      name +
      "&" +
      phone +
      "&" +
      door +
      "&" +
      type +
      "&" +
      user +
      "&" +
      password +
      "&" +
      id;
    return this.http2.put(url, name);
  }

  //Eliminar usuario
  deleteUser(id: number) {
    const url = this.base + "/deleteUser/" + id;
    return this.http2.delete(url);
  }
  //Devuelve el string del type_id
  getType(number: number) {
    const url = this.base + "/type/" + number;
    return this.http.get(url);
  }

  //Updateo los datos del usuario
  updateUser(user: any) {
    const url =
      this.base +
      "/updateUser/" +
      user.nombre +
      "&" +
      user.telefono +
      "&" +
      user.puerta +
      "&" +
      user.titulo +
      "&" +
      user.usuario +
      "&" +
      user.pass +
      "&" +
      user.id;
    return this.http.put(url, JSON.stringify(user));
  }

  //Lista todas las actas
  allActas() {
    const url = this.base + "/allActas";
    return this.http2.get(url);
  }

  //Nueva acta
  newActa(fecha: string, descripcion: string, textoCompleto: string) {
    const url = this.base + "/newActa/" + fecha + "&" + descripcion + "&" + textoCompleto;
    return this.http2.post(url, descripcion);
  }

  //Edit acta
  editActa(fecha: string, descripcion: string, textoCompleto: string, id: number){
    const url = this.base + "/editActa/" + fecha + "&" + descripcion + "&" + textoCompleto + "&" + id;
    console.log(url);
    return this.http2.put(url,descripcion);
  }

  //Eliminar Acta
  deleteActa(id: number){
    const url = this.base + "/deleteActa/" + id;
    return this.http2.delete(url);
  }

  //Busco un acta determinada
  acta(id: number) {
    const url = this.base + "/acta/" + id;
    return this.http2.get(url);
  }

  //Listo todos los gastos
  allGastos() {
    const url = this.base + "/allGastos";
    return this.http2.get(url);
  }

  //Nueva incidencia
  newIncidencia(titulo: string, descripcion: string) {
    const url = this.base + "/newIncidencia/" + titulo + "&" + descripcion;
    return this.http.put(url, JSON.stringify(titulo));
  }

  //Todos los tipos de gastos
  allTypesGastos() {
    const url = this.base + "/allTypesGastos";
    return this.http2.get(url);
  }

  //Todos los tipos de usuarios
  allTypesUsuarios() {
    const url = this.base + "/allTypeUser";
    return this.http2.get(url);
  }

  //Buscar gastos por el tipo
  gastosByType(tipo: string, order: number) {
    const url = this.base + "/gastosByType/" + tipo + "/" + order;
    return this.http2.get(url);
  }
}
