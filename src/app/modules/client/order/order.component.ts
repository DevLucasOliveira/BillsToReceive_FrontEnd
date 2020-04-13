import { ClientService } from './../../../shared/providers/client.service';
import { Client } from 'src/app/shared/models/client';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private service: ClientService) { }

  form: FormGroup;
  orders: Order[];

  ngOnInit() {
    this.buildForm();
  }


    buildForm() {
      this.form = this.fb.group({
        name: '',
        phone: ''
      });
    }


  save() {
    let client: Client = Object.assign({}, this.form.value);

    this.service.createClient(client).subscribe(client => this.OnSaveSucess()),
      error => console.error(error);

  }

  OnSaveSucess() {
    this.router.navigate(['/client']);
  }


}