import { LoggedService } from './../extra/logged.service';
import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { SqlService } from '../extra/sql.service';

import { User } from './../extra/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  dataUser: FormGroup;
  readOnly = true;
  modeEditable = false;

  constructor(
    private sqlServices: SqlService,
    private loggedService: LoggedService
  ) {}

  ngOnInit() {
    this.dataUser = new FormGroup({
      nombre: new FormControl(null),
      telefono: new FormControl(null),
      usuario: new FormControl(null),
      password: new FormControl(null)
    });
    this.getUser();
  }

  getUser() {
    this.dataUser.patchValue({
      nombre: this.loggedService.getData().nombre,
      telefono: this.loggedService.getData().telefono,
      password: this.loggedService.getData().password,
      usuario: this.loggedService.getData().usuario
    });
  }

  editable() {
    this.readOnly = false;
    this.modeEditable = true;
  }
  reloadPage(){
    
  }
}
