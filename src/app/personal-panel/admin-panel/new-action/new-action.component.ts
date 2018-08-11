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

  user = "newUser";
  acta = "newActa";
  gasto = "newGasto";
  incidencia = "newIncidencia";

  titulo = "";
  actionType = "";

  patternOnlyNumber = "[0-9]*";
  patternOnlyCharacters = "[a-zA-Z]*";
  patternDate =
    "(^ (((0[1 - 9] | 1[0 - 9] | 2[0 - 8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|[2-9][0-9])dd$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)";

  routeSubscribe: Subscription;

  newUser = false;
  newActa = false;
  newGasto = false;
  newIncidencia = false;
  editUserValidator = false;

  dataUser: FormGroup;
  dataActa: FormGroup;
  dataGastos: FormGroup;
  dataIncidencia: FormGroup;

  userInterface = [];
  allActasArray = [];
  allGastosArray = [];
  allIncidenciaArray = [];

  allTipeUsers = [];
  allTipeGastos = [];

  ngOnInit() {
    this.getUrl();
    this.getAllTipes();
  }
  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }
  getAllTipes() {
    switch (this.actionType) {
      case this.user:
        this.sqlService.allTypesUsuarios().subscribe(data => {
          this.allTipes(data);
        });
        break;
      case this.gasto:
        this.sqlService.allTypesGastos().subscribe(data => {
          this.allTipes(data);
        });
        break;
    }
  }
  allTipes(data: any) {
    switch (this.actionType) {
      case this.user:
        for (let q of data) {
          this.allTipeUsers.push([q.id, q.titulo]);
        }
        break;
      case this.gasto:
        for (let q of data) {
          this.allTipeGastos.push([q.id, q.tipo]);
        }
        break;
    }
  }

  getUrl() {
    this.routeSubscribe = this.router.queryParams.subscribe(params => {
      this.action(params.action);
    });
  }

  action(action: string) {
    switch (action) {
      case this.user:
        this.newUser = true;
        this.titulo = "Editar o crear un nuevo usuario";
        this.actionType = action;
        this.startNewData();
        break;
      case this.acta:
        this.newActa = true;
        this.titulo = "Editar o crear una nueva acta";
        this.actionType = action;
        this.startNewData();
        break;
      case this.gasto:
        this.newGasto = true;
        this.titulo = "Editar o crear un nuevo gasto";
        this.actionType = action;
        this.startNewData();
        break;
      case this.incidencia:
        this.newIncidencia = true;
        this.titulo = "Editar o borrar nuevas incidencias";
        this.actionType = action;
        this.startNewData();
        break;
    }
  }
  startNewData() {
    switch (this.actionType) {
      case this.user:
        this.dataUser = new FormGroup({
          id: new FormControl({ value: null, disabled: true }),
          nombre: new FormControl(null, Validators.required),
          telefono: new FormControl(null, Validators.required),
          puerta: new FormControl(null, Validators.required),
          tipo: new FormControl(null, Validators.required),
          usuario: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required)
        });

        this.sqlService.allUsers().subscribe(data => {
          this.listAll(data);
        });
        break;
      case this.acta:
        this.dataActa = new FormGroup({
          id: new FormControl({ value: null, disabled: true }),
          fecha: new FormControl(null, [Validators.required]),
          descripcion: new FormControl(null, Validators.required),
          textocompleto: new FormControl(null, Validators.required)
        });
        this.sqlService.allActas().subscribe(data => {
          this.listAll(data);
        });
        break;
      case this.gasto:
        this.dataGastos = new FormGroup({
          id: new FormControl({ value: null, disabled: true }),
          tipo: new FormControl(null, Validators.required),
          recepcion: new FormControl(null, Validators.required),
          factura: new FormControl(null, Validators.required),
          descripcion: new FormControl(null, Validators.required)
        });
        this.sqlService.allGastos().subscribe(data => {
          this.listAll(data);
        });
        break;
      case this.incidencia:
        this.dataIncidencia = new FormGroup({
          id: new FormControl({ value: null, disabled: true }),
          titulo: new FormControl(null, Validators.required),
          descripcion: new FormControl(null, Validators.required)
        });
        this.sqlService.allIncidencias().subscribe(data => {
          this.listAll(data);
        });
        break;
    }
  }

  listAll(data: any) {
    switch (this.actionType) {
      case this.user:
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
        break;
      case this.acta:
        this.allActasArray = [];
        for (let q of data) {
          this.allActasArray.push([
            q.id,
            this.genericClass.transformDate(q.fecha),
            q.descripcion,
            q.textoCompleto
          ]);
        }
        break;
      case this.gasto:
        this.allGastosArray = [];
        for (let q of data) {
          this.allGastosArray.push([
            q.id,
            q.tipo,
            this.genericClass.transformDate(q.fecha_recepcion),
            this.genericClass.transformDate(q.fecha_factura),
            q.descripcion
          ]);
        }
        break;
      case this.incidencia:
        this.allIncidenciaArray = [];
        for (let q of data) {
          this.allIncidenciaArray.push([q.id, q.titulo, q.descripcion]);
        }
        break;
    }
  }
  
  editUser(data: any) {
    switch (this.actionType) {
      case this.user:
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
        break;
      case this.acta:
        this.editUserValidator = true;
        this.dataActa.patchValue({
          id: data[0],
          fecha: data[1],
          descripcion: data[2],
          textocompleto: data[3]
        });
        break;
      case this.gasto:
        this.editUserValidator = true;
        this.dataGastos.patchValue({
          id: data[0],
          tipo: data[1],
          recepcion: data[2],
          factura: data[3],
          descripcion: data[4]
        });
        break;
      case this.incidencia:
        this.editUserValidator = true;
        this.dataIncidencia.patchValue({
          id: data[0],
          titulo: data[1],
          descripcion: data[2]
        });
        break;
    }
  }

  addNewUser() {
    switch (this.actionType) {
      case this.user:
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
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.acta:
        this.sqlService
          .newActa(
            this.genericClass.insertDateDatabase(
              this.dataActa.get("fecha").value
            ),
            this.dataActa.get("descripcion").value,
            this.dataActa.get("textocompleto").value
          )
          .subscribe(() => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.gasto:
        this.sqlService
          .newGasto(
            this.dataGastos.get("tipo").value,
            this.genericClass.insertDateDatabase(
              this.dataGastos.get("recepcion").value
            ),
            this.genericClass.insertDateDatabase(
              this.dataGastos.get("factura").value
            ),
            this.dataGastos.get("descripcion").value
          )
          .subscribe(data => {
            this.startNewData();
          });
        break;
    }
  }

  editUserDatabase() {
    switch (this.actionType) {
      case this.user:
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
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.acta:
        this.sqlService
          .editActa(
            this.genericClass.insertDateDatabase(
              this.dataActa.get("fecha").value
            ),
            this.dataActa.get("descripcion").value,
            this.dataActa.get("textocompleto").value,
            this.dataActa.get("id").value
          )
          .subscribe(data => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.gasto:
        this.sqlService
          .editGasto(
            this.dataGastos.get("tipo").value,
            this.genericClass.insertDateDatabase(
              this.dataGastos.get("recepcion").value
            ),
            this.genericClass.insertDateDatabase(
              this.dataGastos.get("factura").value
            ),
            this.dataGastos.get("descripcion").value,
            this.dataGastos.get("id").value
          )
          .subscribe(data => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.incidencia:
        this.sqlService
          .editIncidencia(
            this.dataIncidencia.get("id").value,
            this.dataIncidencia.get("titulo").value,
            this.dataIncidencia.get("descripcion").value
          )
          .subscribe(data => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
    }
  }

  cancellButton() {
    switch (this.actionType) {
      case this.user:
        this.dataUser.reset();
        this.editUserValidator = false;
        break;
      case this.acta:
        this.dataActa.reset();
        this.editUserValidator = false;
        break;
      case this.gasto:
        this.dataGastos.reset();
        this.editUserValidator = false;
        break;
      case this.incidencia:
        this.dataIncidencia.reset();
        this.editUserValidator = false;
        break;
    }
  }
  deleteUserDatabase() {
    switch (this.actionType) {
      case this.user:
        this.sqlService
          .deleteUser(this.dataUser.get("id").value)
          .subscribe(() => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.acta:
        this.sqlService
          .deleteActa(this.dataActa.get("id").value)
          .subscribe(() => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.gasto:
        this.sqlService
          .deleteGasto(this.dataGastos.get("id").value)
          .subscribe(() => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
      case this.incidencia:
        this.sqlService
          .deleteIncidencia(this.dataIncidencia.get("id").value)
          .subscribe(() => {
            this.startNewData();
          });
        this.editUserValidator = false;
        break;
    }
  }
  goBackButton() {
    this.route.navigate(["/personal_panel/admin_panel"]);
  }

  buttonVisible() {
    let result: boolean = true;
    switch (this.actionType) {
      case this.incidencia:
        result = false;
        break;
    }
    return result;
  }
}
