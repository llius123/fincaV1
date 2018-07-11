import { LogginServices } from './../app.services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "app-loggin",
  templateUrl: "./loggin.component.html",
  styleUrls: ["./loggin.component.css"]
})
export class LogginComponent implements OnInit {
  logginData: FormGroup;
  loggValidator = false;
  userForm: string;
  passForm: string;

  constructor(private logginServices: LogginServices) {}

  ngOnInit() {
    this.logginData = new FormGroup({
      user: new FormControl(null),
      pass: new FormControl(null)
    });
  }
  submit() {
    this.userForm = this.logginData.get("user").value;
    this.passForm = this.logginData.get("pass").value;

    this.logginServices
      .loggin(this.logginData.value.user, this.logginData.value.pass)
      .subscribe(
        result => {
          const data = JSON.parse(result._body);
          this.logginValidator(data);
        },
        error => {
          console.log(error);
        }
      );
  }

  logginValidator(data: JSON) {
    if (data.length > 0) {
      if (
        data[0].usuario === this.userForm &&
        data[0].password === this.passForm
      ) {
        this.loggValidator = false;
      } else {
        this.loggValidator = true;
      }
    } else {
      this.loggValidator = true;
    }
  }
}
