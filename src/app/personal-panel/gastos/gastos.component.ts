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
    this.allTypeFactura = this.sqlService.allTipoFactura().subscribe(data => {
      this.addTypeToArray(data);
    });
    this.subData = this.sqlService.allGastos().subscribe(data => {
      this.addDataToArray(data);
    });
  }

  ngOnDestroy() {
    this.subData.unsubscribe();
    this.allTypeFactura.unsubscribe();
  }
  console(i:number){
    console.log('Indice del bucle for del html =  ' + i)
  }

  loadData(){
    this.validator = true;
  }
  addDataToArray(data: any) {
    for (let q of data) {
      this.arrayData.push([
        q.id,
        q.numero_factura,
        this.whatTypeIs(q.tipo_id-1),
        this.transformDate(q.fecha_recepcion),
        this.transformDate(q.fecha_factura),
        q.descripcion
      ]);
    }
    console.log(this.arrayData)
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
