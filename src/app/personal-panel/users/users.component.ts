import { LoggedService } from "./../extra/logged.service";
import { Response } from "@angular/http";
import { Component, OnInit } from "@angular/core";
import { SqlService } from "../extra/sql.service";

import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataUser: FormGroup;
  readOnly = true;
  modeEditable = false;

  constructor(
    private sqlServices: SqlService,
    private loggedService: LoggedService
  ) {}

  ngOnInit() {
    this.dataUser = new FormGroup({
      nombre: new FormControl(null),
      telefono: new FormControl(null),
      puerta: new FormControl(null),
      usuario: new FormControl(null),
      password: new FormControl(null)
    });
    this.getUser();
  }

  getUser() {
    this.dataUser.patchValue({
      nombre: this.loggedService.getData().nombre,
      telefono: this.loggedService.getData().telefono,
      puerta: this.loggedService.getData().puerta,
      password: this.loggedService.getData().password,
      usuario: this.loggedService.getData().usuario
    });
  }
  //Al principio los datos no se pueden editar, pulsando el boton editar los label
  //pasaran a ser editables y a pareceran 2 botones mas
  editable() {
    this.readOnly = false;
    this.modeEditable = true;
  }

  updateData() {
    const data = {
      id: this.loggedService.getData().id,
      nombre: this.dataUser.get("nombre").value,
      telefono: this.dataUser.get("telefono").value,
      puerta: this.dataUser.get("puerta").value,
      usuario: this.dataUser.get("usuario").value,
      pass: this.dataUser.get("password").value
    };
    this.sqlServices.updateUser(data).subscribe();
    this.sqlServices
      .loggin(data.usuario, data.pass)
      .subscribe((result: Response) => {
        this.loggedService.updateDataObject(result.json());
      });
    this.getUser();
  }

  cancelButton() {
    this.getUser();
    this.readOnly = true;
    this.modeEditable = false;
  }
}
