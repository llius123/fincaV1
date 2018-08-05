import { map } from "rxjs/operators";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SqlService } from "../../extra/sql.service";
import { Response } from "@angular/http";
import { Subscriber, Subscription } from "rxjs";
import { GenericClass } from "../../extra/generic.services";

@Component({
  selector: "app-new-action",
  templateUrl: "./new-action.component.html",
  styleUrls: ["./new-action.component.css"]
})
export class NewActionComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private sqlService: SqlService,
    private genericClass: GenericClass
  ) {}

  titulo = "";

  routeSubscribe: Subscription;

  newUser = false;
  newActa = false;
  newGasto = false;
  newIncidencia = false;
  editUserValidator = false;

  dataUser: FormGroup;
  dataActa: FormGroup;

  userInterface = [];
  allActasArray = [];

  allTipeUsers = [];

  ngOnInit() {
    this.getAllTipeUsers();
    this.getUrl();
  }
  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  getAllTipeUsers() {
    this.sqlService.allTypesUsuarios().subscribe(params => {
      this.allTipesUsers(params);
    });
  }
  allTipesUsers(data: any) {
    for (let q of data) {
      this.allTipeUsers.push([q.id, q.titulo]);
    }
  }

  getUrl() {
    this.routeSubscribe = this.router.queryParams.subscribe(params => {
      this.action(params.action);
    });
  }

  action(action: string) {
    switch (action) {
      case "newUser":
        this.newUser = true;
        this.titulo = "Editar o crear un nuevo usuario";
        this.startNewUserData();
        break;
      case "newActa":
        this.newActa = true;
        this.titulo = "Editar o crear una nueva acta";
        this.startNewActaData();
        break;
      case "newGasto":
        this.newGasto = true;
        break;
      case "newIncidencia":
        this.newIncidencia = true;
        break;
    }
  }
  startNewActaData() {
    this.dataActa = new FormGroup({
      id: new FormControl({ value: null, disabled: true }),
      fecha: new FormControl(null),
      descripcion: new FormControl(null),
      textocompleto: new FormControl(null)
    });
    this.sqlService.allActas().subscribe(data => {
      this.listAllActas(data);
    });
  }

  startNewUserData() {
    this.dataUser = new FormGroup({
      id: new FormControl({ value: null, disabled: true }, Validators.required),
      nombre: new FormControl(null, Validators.required),
      telefono: new FormControl(null, Validators.required),
      puerta: new FormControl(null, Validators.required),
      tipo: new FormControl(null, Validators.required),
      usuario: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });

    this.sqlService.allUsers().subscribe(data => {
      this.listAllUsers(data);
    });
  }

  listAllActas(data: any) {
    this.allActasArray = [];
    for (let q of data) {
      this.allActasArray.push([
        q.id,
        this.genericClass.transformDate(q.fecha),
        q.descripcion,
        q.textoCompleto
      ]);
    }
  }

  listAllUsers(data: any) {
    this.userInterface = [];
    for (let q of data) {
      this.userInterface.push([
        q.id,
        q.nombre,
        q.telefono,
        q.puerta,
        q.titulo,
        q.usuario,
        q.password
      ]);
    }
  }

  editUser(data: any) {
    if (this.newUser === true) {
      this.editUserValidator = true;
      this.dataUser.patchValue({
        id: data[0],
        nombre: data[1],
        telefono: data[2],
        puerta: data[3],
        tipo: data[4],
        usuario: data[5],
        password: data[6]
      });
    } else if (this.newActa == true) {
      this.editUserValidator = true;
      this.dataActa.patchValue({
        id: data[0],
        fecha: data[1],
        descripcion: data[2],
        textocompleto: data[3]
      });
    }
  }

  addNewUser() {
    if (this.newUser === true) {
      this.sqlService
        .newUser(
          this.dataUser.get("nombre").value,
          this.dataUser.get("telefono").value,
          this.dataUser.get("puerta").value,
          this.dataUser.get("tipo").value,
          this.dataUser.get("usuario").value,
          this.dataUser.get("password").value
        )
        .subscribe(() => {
          this.startNewUserData();
        });
    } else if (this.newActa === true) {
      const date = this.genericClass.insertDateDatabase(
        this.dataActa.get("fecha").value
      );
      this.sqlService
        .newActa(
          date,
          this.dataActa.get("descripcion").value,
          this.dataActa.get("textocompleto").value
        )
        .subscribe(() => {
          this.startNewActaData();
        });
    }
    this.editUserValidator = false;
  }

  editUserDatabase() {
    if (this.newUser === true) {
      this.sqlService
        .editUser(
          this.dataUser.get("nombre").value,
          this.dataUser.get("telefono").value,
          this.dataUser.get("puerta").value,
          this.dataUser.get("tipo").value,
          this.dataUser.get("usuario").value,
          this.dataUser.get("password").value,
          this.dataUser.get("id").value
        )
        .subscribe(() => {
          this.startNewUserData();
        });
    } else if (this.newActa === true) {
      const date = this.genericClass.insertDateDatabase(
        this.dataActa.get("fecha").value
      );
      this.sqlService
        .editActa(
          date,
          this.dataActa.get("descripcion").value,
          this.dataActa.get("textocompleto").value,
          this.dataActa.get("id").value
        )
        .subscribe(data => {
          this.startNewActaData();
        });
    }
    this.editUserValidator = false;
  }

  goBackButton() {
    this.route.navigate(["/personal_panel/admin_panel"]);
  }
  cancellButton() {
    if (this.newUser === true) {
      this.dataUser.reset();
    } else if (this.newActa === true) {
      this.dataActa.reset();
    }
    this.editUserValidator = false;
  }
  deleteUserDatabase() {
    if (this.newUser === true) {
      this.sqlService
        .deleteUser(this.dataUser.get("id").value)
        .subscribe(() => {
          this.startNewUserData();
        });
    } else if (this.newActa === true) {
      this.sqlService
        .deleteActa(this.dataActa.get("id").value)
        .subscribe(() => {
          this.startNewActaData();
        });
    }
    this.editUserValidator = false;
  }
}
