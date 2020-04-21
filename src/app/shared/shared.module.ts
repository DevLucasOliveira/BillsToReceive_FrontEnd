import { SharedRoutingModule } from './shared-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalClientComponent } from './components/modal-client/modal-client.component';


@NgModule({
  declarations: [ModalItemComponent, ModalClientComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    SharedRoutingModule
  ]
})
export class SharedModule { }
