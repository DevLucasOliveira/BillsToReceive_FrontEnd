import { Component, OnInit, Inject} from '@angular/core';
import { OrderItem } from 'src/app/shared/models/order-item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private formBuilder: FormBuilder) {}
    public form: FormGroup;

  ngOnInit(){
    this.form = this.formBuilder.group({
      OrderItemID: [null],
      OrderID: [this.data.OrderID],
      ItemID: [0],
      Date: [null],
      ItemName: [null] ,
      Price: [null],
      Quantity: [null],
      Total: [0]
    });
  }

}
