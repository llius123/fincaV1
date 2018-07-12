import { LogginServices } from './../app.services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';
import { isEmpty } from 'rxjs/operators';

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

  constructor(private logginServices: LogginServices,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.logginData = new FormGroup({
      user: new FormControl(null),
      pass: new FormControl(null)
    });
  }
  submit2(){
    this.logginServices
    .loggin('test', 'test')
    .subscribe(
      (result: Response) => {
        this.logginValidator(result.json());
      }
    )
    this.loggValidator = true;
    this.router.navigate(["personal_panel"]);
    console.log('default sesion');
  }
  submit() {
    this.userForm = this.logginData.get("user").value;
    this.passForm = this.logginData.get("pass").value;

    this.logginServices
      .loggin(this.logginData.value.user, this.logginData.value.pass)
      .subscribe(
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
      } else {
        this.loggValidator = true;
      }
    } else {
      this.loggValidator = true;
    }
  }
}
