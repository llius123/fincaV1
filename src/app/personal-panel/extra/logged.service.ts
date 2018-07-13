import { Injectable } from '@angular/core';

@Injectable()
export class LoggedService {

  test = {
    id: "",
    tipo: "",
    nombre: "",
    telefono: "",
    password: "",
    usuario:""
  };

  constructor() {}

  getData() {
      return this.test;
  }

  saveData(data: JSON) {
      this.test = {
          id: data[0].id,
          tipo: data[0].tipo_id,
          nombre: data[0].nombre,
          telefono: data[0].telefono,
          password: data[0].password,
          usuario: data[0].usuario
      }
  }
}