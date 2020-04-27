import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InitialPageComponent } from './initial-page/initial-page.component';
import { ContainerRoutingModule } from './container-routing.module';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [FooterComponent, HeaderComponent, InitialPageComponent, NavbarComponent],
  imports: [
    CommonModule,
    ContainerRoutingModule
  ]
})
export class ContainerModule { }
