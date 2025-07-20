import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { EjecucionComponent } from './ejecucion/ejecucion.component';





import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { MatTableModule } from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatStepperModule} from '@angular/material/stepper';
import { HttpClientModule } from '@angular/common/http'; 

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginatorIntl } from './custom/custom-paginator-intl'; // Ajusta la ruta según tu estructura


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PlantillaComponent,
    PlanificacionComponent,
    EjecucionComponent
  ],
  imports: [
    MatPaginatorModule,
    HttpClientModule,
    MatDividerModule,
    MatMenuModule,
    MatStepperModule,
    MatTableModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatTooltipModule,
    MatTreeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,    
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    FormsModule,
     MatDialogModule,
     
  ],
  providers: [{provide:MatPaginatorIntl,useClass:CustomPaginatorIntl}],
  bootstrap: [AppComponent]
})
export class AppModule { }





