import { map } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SqlService } from "../../extra/sql.service";
import { Response } from "@angular/http";
import { Subscriber, Subscription } from "rxjs";

@Component({
  selector: "app-new-action",
  templateUrl: "./new-action.component.html",
  styleUrls: ["./new-action.component.css"]
})
export class NewActionComponent implements OnInit, OnDestroy {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private sqlService: SqlService
  ) {}

  titulo = "";

  routeSubscribe: Subscription;

  newUser = false;
  newActa = false;
  newGasto = false;
  newIncidencia = false;
  editUserValidator = false;

  dataUser: FormGroup;
  userInterface = [];
  allTipeUsers = [];

  ngOnInit() {
    this.getAllTipeUsers();
    this.getUrl();
  }
  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  getAllTipeUsers() {
    this.sqlService.allTypesUsuarios().subscribe(params => {this.allTipesUsers(params)});
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
        break;
      case "newGasto":
        this.newGasto = true;
        break;
      case "newIncidencia":
        this.newIncidencia = true;
        break;
    }
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
  }

  addNewUser() {
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
    this.editUserValidator = false;
  }

  editUserDatabase() {
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
    this.editUserValidator = false;
  }

  goBackButton() {
    this.route.navigate(["/personal_panel/admin_panel"]);
  }
  cancellButton() {
    this.dataUser.reset();
    this.editUserValidator = false;
  }
  deleteUserDatabase() {
    this.sqlService.deleteUser(this.dataUser.get("id").value).subscribe(() => {
      this.startNewUserData();
    });
    this.editUserValidator = false;
  }
}
