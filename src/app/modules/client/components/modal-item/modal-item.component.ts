import { OrderItem } from '../../../../shared/models/order-item';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from '@shared/models';
import { OrderItemService } from '@shared/providers/order-item.service';

@Component({
  selector: 'app-modal-item',
  templateUrl: './modal-item.component.html',
  styleUrls: ['./modal-item.component.css']
})
export class ModalItemComponent implements OnInit {

  form: FormGroup;
  orderArray: Order[];
  closeResult: string;
  @Input() order: Order;
  @Input() orderItem: OrderItem;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private activatedRoute: ActivatedRoute,
    private orderItemService: OrderItemService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getOrder();
  }

  getOrder() {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          this.loadForm();
          return;
        }
        this.orderItemService.getOneOrder(params.id).subscribe(
          response => {
            this.orderItem = response;
            this.loadForm();
          },
          error => {
            console.error(error);
          });
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      price: [null, Validators.required],
      quantity: [1, Validators.compose([Validators.required, Validators.min(0)])],
      date: [new Date()],
      total: [0]
    });
  }

  loadForm() {
    if (this.orderItem) {
      this.form.patchValue({
        productName: this.orderItem.productName,
        price: this.orderItem.price,
        quantity: this.orderItem.quantity,
        date: this.orderItem.date,
        total: this.orderItem.total
      });
    }
  }

  save() {
    if (this.orderItem === undefined) {
      this.fillOrder();
      this.orderItemService.createOrder(this.orderItem).subscribe(
        response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        });
    } else {
      this.fillOrder();
      this.orderItemService.updateOrderItem(this.orderItem).subscribe(
        response => {
          this.closeModal();
        },
        error => {
          console.error(error);
        });
    }
  }

  fillOrder() {
    let value = this.form.value;

    if (this.orderItem === undefined) {
      this.orderItem = new OrderItem(
        this.order.idOrder,
        value.productName,
        value.price,
        value.quantity,
        value.date,
        value.total);
    }
    this.orderItem.idOrder = this.order.idOrder;
    this.orderItem.productName = value.productName;
    this.orderItem.price = value.price;
    this.orderItem.quantity = value.quantity;
    this.orderItem.date = value.date;
    this.orderItem.total = value.total;
  }

  closeModal() {
    this.activeModal.close();
  }

  updateTotal() {
    if (this.form.controls.quantity.value < 1) {
      this.form.controls.quantity.setValue(null);
    }
    this.form.controls.total.setValue(parseFloat((this.form.controls.quantity.value * this.form.controls.price.value).toFixed(2)));
  }



}
