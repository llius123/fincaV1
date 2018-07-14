import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoggedService {
  test = {
    id: "",
    tipo: "",
    nombre: "",
    telefono: "",
    puerta: "",
    password: "",
    usuario: ""
  };

  constructor(private router: Router) {}
  
  saveData(data: JSON) {
    this.test = {
      id: data[0].id,
      tipo: data[0].tipo_id,
      nombre: data[0].nombre,
      telefono: data[0].telefono,
      puerta: data[0].puerta,
      password: data[0].password,
      usuario: data[0].usuario
    };
  }
  getData() {
    return this.test;
  }

  loggedValidator() {
    if (this.getData().id === "") {
      this.router.navigate(["/"]);
    }
  }

  updateDataObject(data: JSON) {
    const dataString = JSON.stringify(data);
    const dataJSON = JSON.parse(dataString);
    this.saveData(dataJSON);
  }

  newUser() {}
}