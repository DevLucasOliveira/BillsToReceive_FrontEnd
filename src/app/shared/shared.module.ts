import { FrameAdminPageComponent } from './frame/frame-admin';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { FramePageComponent } from './frame/frame';
import { FrameAuthenticationPageComponent } from './frame/frame-authentication';
import { SidebarComponent } from './sidebar/sidebar.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    FramePageComponent,
    FrameAuthenticationPageComponent,
    SidebarComponent,
    FrameAdminPageComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
