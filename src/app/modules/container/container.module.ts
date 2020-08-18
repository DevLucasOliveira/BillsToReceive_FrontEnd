import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ContainerRoutingModule } from './container-routing.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [ InitialPageComponent, NavbarComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule
  ]
})
export class ContainerModule { }
