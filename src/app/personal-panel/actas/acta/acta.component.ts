import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { SqlService } from "../../extra/sql.service";
import { Response } from "@angular/http";

@Component({
  selector: "app-acta",
  templateUrl: "./acta.component.html",
  styleUrls: ["./acta.component.css"]
})
export class ActaComponent implements OnInit, OnDestroy {
  constructor(private router: ActivatedRoute, private sqlService: SqlService) {}

  idActa: Subscription;
  dataActaObject: Subscription;
  acta = {
    id: "",
    fecha: "",
    descripcion: "",
    texto: ""
  }

  ngOnInit() {
    this.idActa = this.router.queryParams.subscribe(params => {
      this.dataActa(+params.idActa);
    });
  }

  ngOnDestroy() {
    this.idActa.unsubscribe();
    this.dataActaObject.unsubscribe();
  }

  dataActa(id: number) {
    this.dataActaObject = this.sqlService
      .acta(id)
      .subscribe((result: Response) => {
        this.acta.id = result[0].id;
        this.acta.fecha = result[0].fecha;
        this.acta.descripcion = result[0].descripcion;
        this.acta.texto = result[0].textoCompleto;
      });
  }

  transformDate(data: any) {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const result = day + "-" + month + "-" + year;
    return result;
  }
}
