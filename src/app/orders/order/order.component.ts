import { Customer } from '../../shared/models/client';
import { CustomerService } from '../../shared/providers/client.service';
import { OrderItem } from '../../shared/models/order';
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

  constructor(public service: OrderService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private customerService: CustomerService) { }
  public form: FormGroup;
  customerList: Customer[];
  isValid = true;



  ngOnInit() {
    this.buildForm();
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
  }

  buildForm() {
    this.form = this.formBuilder.group({
      OrderID: [null],
      OrderNo: [null],
      CustomerID: ['', Validators.required],
      Date: [moment().toISOString()],
      GTotal: [0]
    });
    this.service.orderItems = [];
  }

  bodyapi() {
    const body = {
      OrderID: this.form.value.OrderID,
      OrderNo: this.form.value.OrderNo,
      CustomerID: this.form.value.CustomerID,
      Date: this.form.value.Date,
      GTotal: this.form.value.Gtotal
    };
    this.service.orderItems = [];
  }


  manipularItem(orderItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = { orderItemIndex, OrderID };
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.alterarTotal();
    });
  }

  deletarItem(ordemItemID: number, i: number) {
    this.service.orderItems.splice(i, 1);
    this.alterarTotal();
  }

  alterarTotal() {
    this.form.controls.GTotal.setValue(this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0));
    this.form.controls.GTotal.setValue(parseFloat((this.form.controls.GTotal.value.toFixed(2))));
  }

  validarForm() {
    this.isValid = true;
    if (this.form.controls.CustomerID.value === '') {
      this.isValid = false;
    } else if (this.service.orderItems.length === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

  onSubmit() {
    if (this.validarForm()) {
      this.service.salvaroualterarItem().subscribe(res => {
        this.buildForm();
      });
    }
  }


}
