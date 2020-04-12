import { ClientService } from './../../../shared/providers/client.service';
import { Client } from 'src/app/shared/models/client';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  constructor(private service: ClientService ) { }

  ngOnInit() {
    this.service.getClient()
    .subscribe(API => this.clients = API),
    error => console.error(error);
  }



}
