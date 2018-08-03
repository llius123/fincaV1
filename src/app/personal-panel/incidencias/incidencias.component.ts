import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SqlService } from "../extra/sql.service";

@Component({
  selector: "app-incidencias",
  templateUrl: "./incidencias.component.html",
  styleUrls: ["./incidencias.component.css"]
})
export class IncidenciasComponent implements OnInit {
  dataForm: FormGroup;
  saveDataForm: { title: string; description: string };

  constructor(private sqlService: SqlService) {}

  ngOnInit() {
    this.dataForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    });
  }

  saveIncidencia() {
    this.saveDataForm = {
      title: this.dataForm.get("title").value,
      description: this.dataForm.get("description").value
    };
    this.sqlService
      .newIncidencia(this.saveDataForm.title, this.saveDataForm.description)
      .subscribe();
    this.clearInputs();
  }
  clearInputs() {
    this.dataForm.patchValue({
      title: "",
      description: ""
    });
  }
}
