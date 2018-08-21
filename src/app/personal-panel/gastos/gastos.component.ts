import { FormControl, FormControlName } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Component, OnInit } from "@angular/core";
import { SqlService } from "../extra/sql.service";
import { Subscription } from "rxjs";
import { Response } from "@angular/http";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericClass } from "../extra/generic.services";
import { map } from "rxjs/operators";

@Component({
  selector: "app-gastos",
  templateUrl: "./gastos.component.html",
  styleUrls: ["./gastos.component.css"]
})
export class GastosComponent implements OnInit, OnDestroy {
  subData: Subscription;
  subTypes: Subscription;

  arrayData = [];
  arrayGastos = [];

  arraySearch = [];

  selectedOption: number;

  validator = false;

  searchDisabled = false;

  tipo: {id:number, tipo:string};

  constructor(
    private sqlService: SqlService,
    private router: ActivatedRoute,
    private route: Router,
    private genericClass: GenericClass
  ) {}

  ngOnInit() {
    this.subData = this.sqlService.allGastos().subscribe(data => {
      this.addDataToArray(data);
    });

    this.subTypes = this.sqlService.allTypesGastos().pipe(map((data: JSON) => {
      this.arrayGastos.push(data)
      console.log(this.arrayGastos)
    })).subscribe()
  }

  ngOnDestroy() {
    this.subData.unsubscribe();
    this.subTypes.unsubscribe();
  }

  dataSearchForm(optionSelected: string, orderBy: number) {
    console.log(optionSelected)
    if(optionSelected !== '0'){
      if(orderBy > 0){
        this.sqlService.gastosByType(optionSelected, orderBy).subscribe(
          (data) => {
            this.addDataToArray(data);
          }
        );
      }else{
        this.subData = this.sqlService.gastosByType(optionSelected, 1).subscribe(data => {
          this.addDataToArray(data);
        });        
      }
    }else{
      this.subData = this.sqlService.allGastos().subscribe(data => {
        this.addDataToArray(data);
      });
    }
  }

  addDataTipoGastosToArray(data: any) {
    for (let q of data) {
      this.arrayGastos.push([q.id,q.tipo]);
    }
  }
  addDataToArray(data: any) {
    this.arrayData = [];
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
  transformDate(data: any) {
    return this.genericClass.transformDate(data);
  }
}
