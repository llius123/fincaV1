import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-gasto",
  templateUrl: "./gasto.component.html",
  styleUrls: ["./gasto.component.css"]
})
export class GastoComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal) {}

  ngOnInit() {}
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
