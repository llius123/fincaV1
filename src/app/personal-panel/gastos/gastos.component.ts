import { OnDestroy } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { SqlService } from "../extra/sql.service";
import { Subscription } from "rxjs";
import { Response } from "@angular/http";

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.component.html",
  styleUrls: ["./gastos.component.css"]
})
export class GastosComponent implements OnInit, OnDestroy {
  subData: Subscription;
  allTypeFactura: Subscription;

  dataTypeFactura = [];

  arrayData = [];
  arrayDataType = [];

  validator = false;

  constructor(private sqlService: SqlService) {}

  ngOnInit() {
    this.subData = this.sqlService.allGastos().subscribe(data => {
      this.addDataToArray(data);
    });
  }

  ngOnDestroy() {
    this.subData.unsubscribe();
  }

  loadData(){
    this.validator = true;
  }
  addDataToArray(data: any) {
    for (let q of data) {
      this.arrayData.push([
        q.id,
        q.numero_factura,
        q.tipo,
        this.transformDate(q.fecha_recepcion),
        this.transformDate(q.fecha_factura),
        q.descripcion
      ]);
    }
  }
  addTypeToArray(data: any) {
    for (let q of data) {
      this.arrayDataType.push(q);
    }
  }
  whatTypeIs(id: number){
    return this.arrayDataType[id].tipo;
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
