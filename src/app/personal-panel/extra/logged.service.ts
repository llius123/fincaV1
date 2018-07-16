import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

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

//Objeto donde guardo los datos del usuario loggeado
  saveData(data: JSON) {
    this.test = {
      id: data[0].id,
      nombre: data[0].nombre,
      tipo: data[0].tipo_id,
      telefono: data[0].telefono,
      puerta: data[0].puerta,
      password: data[0].password,
      usuario: data[0].usuario
    };
  }
  //Devuelvo los datos del usuario logeado
  getData() {
    return this.test;
  }
  //Si alguien accede directamente a una url especifica como el panel personal este
  //metodo lo devuelve al inicio ya que no se ha logeado
  loggedValidator() {
    if (this.getData().id === "") {
      this.router.navigate(["/"]);
    }
  }
  //Metodo para updatear los datos del panel personal
  updateDataObject(data: JSON) {
    const dataString = JSON.stringify(data);
    const dataJSON = JSON.parse(dataString);
    this.saveData(dataJSON);
  }
}
