import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  ngOnInit() {}

  listUsers() {
    this.route.navigate(["listUsers"], { relativeTo: this.router });
  }
  listActas() {
    this.route.navigate(["listActas"], { relativeTo: this.router });
  }
  listGastos() {
    this.route.navigate(["gastos"], { relativeTo: this.router });
  }
  incidencias() {
    this.route.navigate(["incidencias"], { relativeTo: this.router });
  }
}
