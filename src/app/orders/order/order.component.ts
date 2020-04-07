import { OrderItemsComponent } from './../order-items/order-items.component';
import { OrderService } from '../../shared/providers/order.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: []
})
export class OrderComponent implements OnInit {

  constructor(public service: OrderService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog) { }
  public form: FormGroup;

  ngOnInit(){
    this.buildForm();
  }

  private buildForm(){
    this.form = this.formBuilder.group({
      OrderID: [null],
      OrderNo: [null],
      CustomerID: [null, Validators.required],
      Date: [moment().toISOString()],
      GTotal: [0]
    });
    this.service.orderItems = [];
  }

  manipularItem(orderItemIndex, OrderID){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, OrderID};
    this.dialog.open(OrderItemsComponent, dialogConfig);

  }



}
