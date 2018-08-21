import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedService {

  admin: boolean;

  logginData = {
    id: "",
    tipo: "",
    nombre: "",
    telefono: "",
    puerta: "",
    password: "",
    usuario: "",
    admin: "" 
  };

  constructor(private router: Router) {}

//Objeto donde guardo los datos del usuario loggeado
  saveData(data) {
    this.logginData = {
      id: data.id,
      nombre: data.nombre,
      tipo: data.tipo_id,
      telefono: data.telefono,
      puerta: data.puerta,
      password: data.password,
      usuario: data.usuario,
      admin: data.tipo_id
    };
    this.isAdmin(this.logginData.admin);
  }

  //Guardo si el usuario es admin o no
  isAdmin(number: string){
    if(number == '1'){
      this.admin = true;
    }else{
      this.admin = false;
    }
  }

  getAdmin(){
    return this.admin
  }
  //Devuelvo los datos del usuario logeado
  getData() {
    return this.logginData;
  }
  //Si alguien accede directamente a una url especifica como el panel personal este
  //metodo lo devuelve al inicio ya que no se ha logeado
  loggedValidator() {
    if (this.getData().id === "") {
      this.router.navigate(["/login"]);
    }
  }
  //Metodo para updatear los datos del panel personal
  updateDataObject(data: JSON) {
    const dataString = JSON.stringify(data);
    const dataJSON = JSON.parse(dataString);
    this.saveData(dataJSON);
  }
}
