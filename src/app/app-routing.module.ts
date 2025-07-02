import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { PlanificacionComponent } from './planificacion/planificacion.component';

const routes: Routes = [
 {path:'', component:HomeComponent},
 {path:'plan', component:PlanificacionComponent},
 {path:'**', redirectTo:''},
  
 
 
 ];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
