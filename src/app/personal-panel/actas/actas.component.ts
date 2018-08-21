import { Response } from '@angular/http';
import { Subscription } from 'rxjs';
import { SqlService } from "./../extra/sql.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { GenericClass } from '../extra/generic.services';
import { map } from  'rxjs/operators';

@Component({
  selector: "app-actas",
  templateUrl: "./actas.component.html",
  styleUrls: ["./actas.component.css"]
})
export class ActasComponent implements OnInit,OnDestroy {
  constructor(private sqlService: SqlService,
              private genericClass: GenericClass) {}

  allActas: Subscription;

  arrayAllData = [];

  fecha = "";
  desc = "";
  texto = "";

  ngOnInit() {
    this.loadAllActas();
  }
  ngOnDestroy() {
    this.allActas.unsubscribe();
  }

  loadAllActas() {
    this.allActas = this.sqlService.allActas().pipe(map((data: any) => {
      for (let q of data) {
        this.arrayAllData.push([
          q.id,
          this.genericClass.transformDate(q.fecha),
          q.descripcion,
          q.textoCompleto
        ]);
      }
    })).subscribe();
  }

  dataModal(data: any){
    this.fecha = data[1];
    this.desc = data[2];
    this.texto = data[3];
  }
  
}
