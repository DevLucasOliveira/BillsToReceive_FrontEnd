import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Order } from '../models/order';




@Injectable({
    providedIn: 'root'
})
export class OrderService {

    private readonly API_URL: string = environment.apiURL;

    constructor(private http: HttpClient) {}

    deleteOrdersOfClient(clientId: number): Observable<Order>{
        return this.http.delete<Order>(this.API_URL + '/Order/client/' + clientId)
    }
    
    createOrders(orders: Order): Observable<Order>{
        return this.http.post<Order>(this.API_URL + '/Order', orders);
    }

    updateOrders(orders: Order): Observable<Order>{
        return this.http.put<Order>(this.API_URL + '/Order', orders);
    }

    getOrders(): Observable<Order[]>{
        return this.http.get<Order[]>(this.API_URL + '/Order');
    } 

    getOneOrders(ordersId: number): Observable<Order>{
        return this.http.get<Order>(this.API_URL + '/Order/' + ordersId);
    }
    
    deleteOrder(ordersId: number): Observable<Order>{
        return this.http.delete<Order>(this.API_URL + '/Order/' + ordersId);
    }

    getOrdersByClient(clientId: number): Observable<Order>{
        return this.http.get<Order>(this.API_URL + '/Order/client/' + clientId);
    }
}