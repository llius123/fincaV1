import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Response } from "@angular/http";
import { isEmpty, map } from "rxjs/operators";
import { SqlService } from "../personal-panel/extra/sql.service";
import { LoggedService } from "../personal-panel/extra/logged.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-loggin",
  templateUrl: "./loggin.component.html",
  styleUrls: ["./loggin.component.css"]
})
export class LogginComponent implements OnInit {
  logginData: FormGroup;
  loggValidator = false;
  sqlLoggin: Subscription;
  userForm: string;
  passForm: string;

  constructor(
    private sqlService: SqlService,
    private route: ActivatedRoute,
    private router: Router,
    private loggedData: LoggedService
  ) { }

  ngOnInit() {
    this.logginData = new FormGroup({
      user: new FormControl(null),
      pass: new FormControl(null)
    });
  }
  submit() {
    const autologgin = "test";
    this.userForm = autologgin;
    this.passForm = autologgin;
    this.sqlLoggin = this.sqlService.loggin("test", "test").pipe(map((data) => {
      let dataJSON = data.json();
      dataJSON = dataJSON[0]

      if (dataJSON !== null) {
        if (
          dataJSON.usuario === this.userForm && dataJSON.password === this.passForm
        ) {
          this.loggValidator = false;
          this.loggedData.saveData(dataJSON);
          this.router.navigate(["personal_panel"]);
        } else {
          this.loggValidator = true;
        }
      } else {
        this.loggValidator = true;
      }
    }
)).subscribe();
