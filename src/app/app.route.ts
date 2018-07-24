import { IncidenciasComponent } from './personal-panel/incidencias/incidencias.component';
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LogginComponent } from "./loggin/loggin.component";
import { PersonalPanelComponent } from "./personal-panel/personal-panel.component";
import { UsersComponent } from "./personal-panel/users/users.component";
import { ActasComponent } from "./personal-panel/actas/actas.component";
import { GastosComponent } from './personal-panel/gastos/gastos.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LogginComponent },
  { path: "personal_panel", component: PersonalPanelComponent, children: [
    { path: "listUsers", component: UsersComponent },
    { path: "listActas", component: ActasComponent },
    { path: "gastos", component: GastosComponent},
    { path: "incidencias",  component: IncidenciasComponent}
  ] },
  { path: "**", redirectTo: "/login" }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoute {}
