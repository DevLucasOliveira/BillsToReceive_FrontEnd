import { OrderItem } from './../../shared/models/order-item.model';
import { OrderService } from './../../shared/providers/order.service';
import { ItemService } from './../../shared/providers/item.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Item } from 'src/app/shared/models/item.model';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: []
})
export class OrderItemsComponent implements OnInit {
  public form: FormGroup;
  formData: OrderItem;
  itemList: Item[];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.itemService.getItemList().then(res => this.itemList = res as Item[]);
    this.form = this.formBuilder.group({
      OrderItemID: [0],
      OrderID: [this.data.OrderID],
      ItemID: [0],
      Date: [new Date()],
      ItemName: ['', Validators.required],
      Price: [null, Validators.required],
      Quantity: [1, Validators.compose([Validators.required, Validators.min(0)])],
      Total: [0]
    });
    this.form.patchValue(Object.assign({}, this.orderService.orderItems[this.data.orderItemIndex]));
  }

  alterarTotal() {
    if (this.form.controls.Quantity.value < 1) {
      this.form.controls.Quantity.setValue(null);
    }
    this.form.controls.Total.setValue(parseFloat((this.form.controls.Quantity.value * this.form.controls.Price.value).toFixed(2)));
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.data.orderItemIndex == null) {
        this.orderService.orderItems.push(this.form.value);
      } else {
        this.orderService.orderItems[this.data.orderItemIndex] = this.form.value;
      }
      this.dialogRef.close();
    }
  }


}
