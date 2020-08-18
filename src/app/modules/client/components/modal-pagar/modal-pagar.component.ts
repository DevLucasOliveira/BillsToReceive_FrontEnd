import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pagar',
  templateUrl: './modal-pagar.component.html',
  styleUrls: ['./modal-pagar.component.css']
})
export class ModalPagarComponent implements OnInit {

  form: FormGroup;
  @Input() partial: number;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    this.form = this.formBuilder.group({
      amountPaid: [null,Validators.required]
    });
  }

  save() {
    let newTotal;
    newTotal = this.form.value.amountPaid;
    this.activeModal.close(newTotal);
  }

  closeModal() {
    this.activeModal.close();
  }

}
