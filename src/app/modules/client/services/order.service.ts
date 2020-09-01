import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderItem } from '../models/orderItem';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly url: string = environment.apiURL;

  constructor(private http: HttpClient) { }


  createClient(item: OrderItem) {
    return this.http.post(`${this.url}/v1/orders`, item);
  }

  // getClientsOfUser(idUser: string) {
  //   return this.http.get(`${this.url}/v1/clients/` + idUser);
  // }

  // deleteClient(clientId: string) {
  //   return this.http.delete(`${this.url}/v1/clients/` + clientId);
  // }



}
