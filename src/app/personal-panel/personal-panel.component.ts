import { Component, OnInit } from '@angular/core';
import { LoggedService } from './extra/logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-panel',
  templateUrl: './personal-panel.component.html',
  styleUrls: ['./personal-panel.component.css']
})
export class PersonalPanelComponent implements OnInit {

  constructor(private loggedService: LoggedService,
              private router: Router) { }

  ngOnInit() {
    this.loggedService.loggedValidator();
  }

}
