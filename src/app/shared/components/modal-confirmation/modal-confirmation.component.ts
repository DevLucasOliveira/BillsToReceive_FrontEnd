import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  @Input() message: string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {

  }

  confirm() {
    this.activeModal.close('delete');

  }

  closeModal() {
    this.activeModal.close();
  }

}
