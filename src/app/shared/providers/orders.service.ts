import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Orders } from '../models/orders';




@Injectable({
    providedIn: 'root'
})
export class OrdersService {

    private readonly API_URL: string = environment.apiURL;

    constructor(private http: HttpClient) {}

    deleteOrdersOfClient(clientId: number): Observable<Orders>{
        return this.http.delete<Orders>(this.API_URL + '/Orders/client/' + clientId)
    }
    
    createOrders(orders: Orders): Observable<Orders>{
        return this.http.post<Orders>(this.API_URL + '/Orders', orders);
    }

    updateOrders(orders: Orders): Observable<Orders>{
        return this.http.put<Orders>(this.API_URL + '/Orders', orders);
    }

    getOrders(): Observable<Orders[]>{
        return this.http.get<Orders[]>(this.API_URL + '/Orders');
    } 

    getOneOrders(ordersId: number): Observable<Orders>{
        return this.http.get<Orders>(this.API_URL + '/Orders/' + ordersId);
    }
    
    deleteOrder(ordersId: number): Observable<Orders>{
        return this.http.delete<Orders>(this.API_URL + '/Orders/' + ordersId);
    }

    getOrdersByClient(clientId: number): Observable<Orders>{
        return this.http.get<Orders>(this.API_URL + '/Orders/client/' + clientId);
    }
}