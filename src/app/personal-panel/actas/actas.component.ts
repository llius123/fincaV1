import { SqlService } from "./../extra/sql.service";
import { Component, OnInit } from "@angular/core";
import { Actas } from "../extra/interfaces.services";
import { Observable } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-actas",
  templateUrl: "./actas.component.html",
  styleUrls: ["./actas.component.css"]
})
export class ActasComponent implements OnInit {
  constructor(private sqlService: SqlService,
              private route: Router,
              private router: ActivatedRoute) {}

  allActas;
  saveData;

  dataLength;

  arrayAllData = [];

  date;
  date2id: number;

  ngOnInit() {
    this.loadAllActas();
  }

  loadAllActas() {
    this.allActas = this.sqlService.allActas();
    this.saveData = this.allActas.subscribe(data => {
      for (let q of data) {
        this.arrayAllData.push([q.id, this.transformDate(q.fecha), q.descripcion, q.textoCompleto]);
      }
    });
  }
  
  transformDate(data: any) {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const result = day + "-" + month + "-" + year;
    console.log(this.arrayAllData)
    return result;
  }
  especificActa(idActa: number){
    this.route.navigate(["acta"], {relativeTo: this.router, queryParams: {idActa}});
  }
}
