import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Response } from "@angular/http";
import { isEmpty } from "rxjs/operators";
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
  ) {}

  ngOnInit() {
    this.logginData = new FormGroup({
      user: new FormControl(null),
      pass: new FormControl(null)
    });
  }
  submit() {
    // this.userForm = this.logginData.get("user").value;
    // this.passForm = this.logginData.get("pass").value;
    // this.sqlService
    //   .loggin(this.logginData.value.user, this.logginData.value.pass)
    //   .subscribe(
    //     (result: Response) => {
    //       this.logginValidator(result.json());
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   );
    //AUTOLOGIN, QUE ME CANSO DE ESCRIBIR EL USER Y LA PASS TODO EL RATO
    const autologgin = "test";
    this.userForm = autologgin;
    this.passForm = autologgin;
    this.sqlLoggin = this.sqlService.loggin("test", "test").subscribe(
      (result: Response) => {
        this.logginValidator(result.json());
      },
      error => {
        console.log(error);
      }
    );
  }

  logginValidator(data: JSON) {
    const dataString = JSON.stringify(data);
    const dataJSON = JSON.parse(dataString);

    if (dataJSON.length > 0) {
      if (
        data[0].usuario === this.userForm &&
        data[0].password === this.passForm
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
}
