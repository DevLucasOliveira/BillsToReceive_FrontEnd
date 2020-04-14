import { ClientService } from './../../../shared/providers/client.service';
import { Client } from 'src/app/shared/models/client';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private service: ClientService,
              private activatedRoute: ActivatedRoute) { }

  form: FormGroup;
  orders: Order[];
  client: Client;

  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id === undefined) {
          return;
        }
        this.service.getOneClient(params.id).subscribe(
          response => {
            this.loadForm(response);
            this.client = response;
          },
          error => {
            console.error(error);
          });
      });
  }


  loadForm(client: Client) {
    this.form.patchValue({
      name: client.name,
      phone: client.phone
    });
  }


  buildForm() {
    this.form = this.fb.group({
      name: '',
      phone: ''
    });
  }


  save() {

    if (this.client) {
      this.fillClient();
      this.service.updateClient(this.client).subscribe(
        response => {
          this.onSaveSucess();
        },
        error => {
          console.error(error);
        });
    }
    else {
      this.fillClient();
      this.service.createClient(this.client).subscribe(
        response => {
          this.onSaveSucess();
        },
        error => {
          console.error(error);
        });
    }
  }

  onSaveSucess() {
    this.router.navigate(['/client']);
  }

  fillClient(){
    if (this.client === undefined){
      this.client = new Client();
    }
    this.client.name = this.form.controls.name.value;
    this.client.phone = this.form.controls.phone.value;
  }


}
