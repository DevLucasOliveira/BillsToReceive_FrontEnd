import { Component, OnInit, Inject} from '@angular/core';
import { OrderItem } from 'src/app/shared/order-item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: []
})
export class OrderItemsComponent implements OnInit {
  formData: OrderItem;

  constructor(
    @Inject (MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>) {}


  ngOnInit(){
  }

}
