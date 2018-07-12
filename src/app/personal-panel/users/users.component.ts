import { Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { SqlService } from '../extra/sql.service';

import { User } from './../extra/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private sqlServices: SqlService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    // data: User = [];
    this.sqlServices.allUsers().subscribe(
      (result: Response) => {
        console.log(result.json());
      }
    )
    // this.logginServices
    //   .loggin("test", "test")
    //   .subscribe((result: Response) => {
    //     this.logginValidator(result.json());
    //   });
  }

}
