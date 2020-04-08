import { OrderItem } from './../../shared/models/order-item.model';
import { OrderItemsComponent } from './../order-items/order-items.component';
import { OrderService } from '../../shared/providers/order.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {
  public form: FormGroup;

  constructor(public service: OrderService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) {

    this.form = this.formBuilder.group({
      OrderID: [null],
      OrderNo: [null],
      CustomerID: [null, Validators.required],
      Date: [moment().toISOString()],
      GTotal: [0]
    });
    this.service.orderItems = [];
  }

  ngOnInit() {
    this.resetForm();
  }


  resetForm() {
    this.service.formData = {
      OrderID: this.form.controls.OrderID.value,
      OrderNo: this.form.controls.OrderNo.value,
      CustomerID: this.form.controls.CustomerID.value,
      Date: this.form.controls.Date.value,
      GTotal: this.form.controls.GTotal.value
    };
    this.service.orderItems = [];
  }


  manipularItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }



}
