import { OrderService } from './../../shared/providers/order.service';
import { ItemService } from './../../shared/providers/item.service';
import { Component, OnInit, Inject} from '@angular/core';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Item } from 'src/app/shared/models/item.model';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;
  itemList: Item[];

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private orderService: OrderService
    ) {}
    public form: FormGroup;

  ngOnInit(){
    this.itemService.getItemList().then( res => this.itemList = res as Item[]);

    this.form = this.formBuilder.group({
      OrderItemID: [null],
      OrderID: [this.data.OrderID],
      ItemID: [null],
      Date: [null],
      ItemName: [null, Validators.required] ,
      Price: [null, Validators.required],
      Quantity: [null, Validators.compose([
        Validators.required,
        Validators.min(0)])],
      Total: [0]
    });
  }

  alterarTotal(){
    if (this.form.controls.Quantity.value < 0){
      this.form.controls.Quantity.setValue(null);
    }
    this.form.controls.Total.setValue(parseFloat((this.form.controls.Quantity.value * this.form.controls.Price.value).toFixed(2)));
  }

  onSubmit(form: FormGroup){
    this.orderService.orderItems.push(form.value);
    this.dialogRef.close();
  }

}
