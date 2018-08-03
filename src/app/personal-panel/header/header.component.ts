import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LoggedService } from "../extra/logged.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private logged: LoggedService
  ) {}

  adminAttr: boolean;

  ngOnInit() {
    this.adminAttr = this.logged.getAdmin();
  }
  admin() {
    if (this.adminAttr === false) {
      return "none";
    }
  }
  adminComponent(){
    this.route.navigate(["admin_panel"], { relativeTo: this.router });
  }
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
