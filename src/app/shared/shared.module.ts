import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalItemComponent } from './components/modal-item/modal-item.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ModalItemComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
