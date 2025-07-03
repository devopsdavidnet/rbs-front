import { Component, ViewChild } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout'
import { MatSidenav } from '@angular/material/sidenav';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./plantilla.component.css']
})
export class PlantillaComponent {

  title='RBS';
  @ViewChild(MatSidenav)
  sidenav!:MatSidenav;
  isMobile=true;
  
  isCollapsed=true;
constructor(private observer: BreakpointObserver, private global:GlobalService){}


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        
      this.global.setIsMobile(true);
      } else {
        this.global.setIsMobile(false);
        
      }
    });
    this.global.isMobile$.subscribe(valor => {
      this.isMobile = valor;
    });
  }

toggleMenu(){
 if(this.isMobile){
   this.sidenav.toggle();
   this.isCollapsed=false;
   }else{
    this.sidenav.open();
    this.isCollapsed=!this.isCollapsed;
   }

  }
closeSidenav() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }



}
