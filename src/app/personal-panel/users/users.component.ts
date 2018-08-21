import { LoggedService } from "./../extra/logged.service";
import { Response } from "@angular/http";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { SqlService } from "../extra/sql.service";

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { DISABLED } from "@angular/forms/src/model";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataUser: FormGroup;
  dataUserSave: FormGroup;

  readOnly = true;
  modeEditable = false;
  data;

  test: any;

  constructor(
    private sqlServices: SqlService,
    private loggedService: LoggedService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dataUser = new FormGroup({
      nombre: new FormControl({ value: null, disabled: this.readOnly }, [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*$')
      ]),
      telefono: new FormControl({ value: null, disabled: this.readOnly }, [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      puerta: new FormControl(
        { value: null, disabled: this.readOnly },
        [Validators.required]
      ),
      usuario: new FormControl(
        { value: null, disabled: this.readOnly },
        Validators.required
      ),
      password: new FormControl(
        { value: null, disabled: this.readOnly },
        Validators.required
      )
    });
    this.dataUserSave = new FormGroup({
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
    this.dataUserSave.patchValue({
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
    this.dataUser.get("nombre").enable();
    this.dataUser.get("telefono").enable();
    this.dataUser.get("puerta").enable();
    this.dataUser.get("usuario").enable();
    this.dataUser.get("password").enable();
  }

  updateData() {
    this.data = {
      id: this.loggedService.getData().id,
      nombre: this.dataUser.get("nombre").value,
      telefono: this.dataUser.get("telefono").value,
      puerta: this.dataUser.get("puerta").value,
      titulo: this.loggedService.getData().admin,
      usuario: this.dataUser.get("usuario").value,
      pass: this.dataUser.get("password").value
    };
    this.sqlServices.updateUser(this.data).subscribe((result: Response) => {
      this.sqlServices
        .loggin(this.data.usuario, this.data.pass)
        .subscribe((result: Response) => {
          this.loggedService.updateDataObject(result.json());
          this.loadNewData();
        });
    });
    this.resetInputs();
  }

  resetInputs() {
    this.readOnly = true;
    this.modeEditable = false;
    this.dataUser.get("nombre").disable();
    this.dataUser.get("telefono").disable();
    this.dataUser.get("puerta").disable();
    this.dataUser.get("usuario").disable();
    this.dataUser.get("password").disable();
  }

  cancellButton() {
    this.loadOldData();
    this.resetInputs();
  }
  loadOldData() {
    this.dataUser.patchValue({
      nombre: this.dataUserSave.get("nombre").value,
      telefono: this.dataUserSave.get("telefono").value,
      puerta: this.dataUserSave.get("puerta").value,
      password: this.dataUserSave.get("password").value,
      usuario: this.dataUserSave.get("usuario").value
    });
  }
  loadNewData() {
    this.dataUserSave.patchValue({
      nombre: this.loggedService.getData().nombre,
      telefono: this.loggedService.getData().telefono,
      puerta: this.loggedService.getData().puerta,
      password: this.loggedService.getData().password,
      usuario: this.loggedService.getData().usuario
    });
  }
}