import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http"


import { AppComponent } from './app.component';
import { LogginComponent } from './loggin/loggin.component';
import { HeaderComponent } from './personal-panel/header/header.component';
import { PersonalPanelComponent } from './personal-panel/personal-panel.component';
import { AppRoute } from "./app.route";
import { UsersComponent } from './personal-panel/users/users.component';
import { SqlService } from "./personal-panel/extra/sql.service";
import { LoggedService } from "./personal-panel/extra/logged.service";
import { ActasComponent } from './personal-panel/actas/actas.component';
import { ActaComponent } from './personal-panel/actas/acta/acta.component';

@NgModule({
  declarations: [
    AppComponent, 
    LogginComponent, 
    HeaderComponent, 
    PersonalPanelComponent, 
    UsersComponent, 
    ActasComponent, ActaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoute
  ],
  providers: [SqlService, LoggedService],
  bootstrap: [AppComponent]
})
export class AppModule {}
