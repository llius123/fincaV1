import { GenericClass } from './personal-panel/extra/generic.services';
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http"
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { HeaderComponent } from './personal-panel/header/header.component';
import { PersonalPanelComponent } from './personal-panel/personal-panel.component';
import { AppRoute } from "./app.route";
import { UsersComponent } from './personal-panel/users/users.component';
import { SqlService } from "./personal-panel/extra/sql.service";
import { LoggedService } from "./personal-panel/extra/logged.service";
import { ActasComponent } from './personal-panel/actas/actas.component';
import { GastosComponent } from './personal-panel/gastos/gastos.component';
import { IncidenciasComponent } from './personal-panel/incidencias/incidencias.component';
import { AdminPanelComponent } from './personal-panel/admin-panel/admin-panel.component';
import { NewActionComponent } from './personal-panel/admin-panel/new-action/new-action.component';

@NgModule({
  declarations: [
    AppComponent, 
    LogginComponent, 
    HeaderComponent, 
    PersonalPanelComponent, 
    UsersComponent, 
    ActasComponent, 
    GastosComponent, 
    IncidenciasComponent, AdminPanelComponent, NewActionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoute,
    NgbModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [SqlService, LoggedService, GenericClass],
  bootstrap: [AppComponent]
})
export class AppModule {}
