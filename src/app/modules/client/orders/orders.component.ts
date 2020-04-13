import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/shared/models/client';
import { ClientService } from 'src/app/shared/providers/client.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  clients: Client[];

  constructor(private service: ClientService) { }

  ngOnInit() {
    this.service.getClient()
    .subscribe(API => this.clients = API),
    error => console.error(error);
  }



}
