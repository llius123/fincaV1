import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-admin-panel",
  templateUrl: "./admin-panel.component.html",
  styleUrls: ["./admin-panel.component.css"]
})
export class AdminPanelComponent implements OnInit {
  constructor(private route: Router, private router: ActivatedRoute) {}

  ngOnInit() {}

  newUser() {
    this.route.navigate(["newAction"], {
      relativeTo: this.router,
      queryParams: { action: "newUser" }
    });
  }

  newActa() {
    this.route.navigate(["newAction"], {
      relativeTo: this.router,
      queryParams: { action: "newActa" }
    });
  }

  newGasto() {
    this.route.navigate(["newAction"], {
      relativeTo: this.router,
      queryParams: { action: "newGasto" }
    });
  }

  newIncidencia() {
    this.route.navigate(["newAction"], {
      relativeTo: this.router,
      queryParams: { action: "newIncidencia" }
    });
  }
}
