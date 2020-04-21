import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  private readonly API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) {}


  deleteOrdersOfClient(clientId: number): Observable<Order>{
    return this.http.delete<Order>(this.API_URL + '/Orders/clients/' + clientId);
  }

  createOrder(order: Order): Observable<Order>{
    return this.http.post<Order>(this.API_URL + '/Orders', order);
  }

  updateOrder(order: Order): Observable<Order>{
    return this.http.put<Order>(this.API_URL + '/Orders', order);
  }

  getOrder(): Observable<Order[]>{
    return this.http.get<Order[]>(this.API_URL + '/Orders');
  }

  getOneOrder(orderId: number): Observable<Order>{
    return this.http.get<Order>(this.API_URL + '/Orders/' + orderId);
  }

  deleteOrder(orderId: number): Observable<Order>{
    return this.http.delete<Order>(this.API_URL + '/Orders/' + orderId);
  }

  getOrderByClient(clientId: number): Observable<Order[]>{
    return this.http.get<Order[]>(this.API_URL + '/Orders/clients/' + clientId);
  }

}
