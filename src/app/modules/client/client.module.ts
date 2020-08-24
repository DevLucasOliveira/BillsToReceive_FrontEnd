import { MaskDirective } from './../../directives/mask.directive';
import { ModalClientComponent } from 'src/app/modules/client/components/modal-client/modal-client.component';
import { OrderComponent } from './pages/order/order.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientComponent } from './pages/client/client.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModalPagarComponent } from './components/modal-pagar/modal-pagar.component';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';



@NgModule({
  declarations: [
    MaskDirective,
    OrderComponent,
    ClientComponent,
    ProfileComponent,
    ModalClientComponent,
    ModalPagarComponent,
    ModalItemComponent,
    ModalConfirmationComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientModule { }
