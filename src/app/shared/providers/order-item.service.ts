import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '@shared/models';


@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  private readonly API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) {}

  deleteOrderOfOrders(ordersId: number): Observable<OrderItem>{
    return this.http.delete<OrderItem>(this.API_URL + '/OrderItem/orders/' + ordersId);
  }

  createOrder(order: OrderItem): Observable<OrderItem>{
    return this.http.post<OrderItem>(this.API_URL + '/OrderItem', order);
  }

  updateOrderItem(order: OrderItem): Observable<OrderItem>{
    return this.http.put<OrderItem>(this.API_URL + '/OrderItem', order);
  }

  getOrder(): Observable<OrderItem[]>{
    return this.http.get<OrderItem[]>(this.API_URL + '/OrderItem');
  }

  getOneOrder(orderId: number): Observable<OrderItem>{
    return this.http.get<OrderItem>(this.API_URL + '/OrderItem/' + orderId);
  }

  deleteOrderItem(orderId: number): Observable<OrderItem>{
    return this.http.delete<OrderItem>(this.API_URL + '/OrderItem/' + orderId);
  }

  getOrderByOrders(ordersId: number): Observable<OrderItem[]>{
    return this.http.get<OrderItem[]>(this.API_URL + '/OrderItem/orders/' + ordersId);
  }

}
