import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-acta',
  templateUrl: './acta.component.html',
  styleUrls: ['./acta.component.css']
})
export class ActaComponent implements OnInit, OnDestroy {

  constructor(private router: ActivatedRoute) { }

  idActa: Subscription;
  id:number;

  ngOnInit() {
    this.idActa = this.router.queryParams.subscribe(
      params => {
        this.id = params.idActa;
      }
    )
  }

  ngOnDestroy() {
    this.idActa.unsubscribe();
  }

}
