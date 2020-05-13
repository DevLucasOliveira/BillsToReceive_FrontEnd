import { Client } from 'src/app/shared/models/client';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly API_URL: string = environment.apiURL;

  constructor( private http: HttpClient) {}

  getClient(): Observable<Client[]>{
    return this.http.get<Client[]>(this.API_URL + '/client');
  }

  getOneClient(clientId: number): Observable<Client>{
    return this.http.get<Client>(this.API_URL + '/client/' + clientId);
  }

  createClient(client: Client): Observable<Client>{
    return this.http.post<Client>(this.API_URL + '/client', client);
  }

  updateClient(client: Client): Observable<Client>{
    return this.http.put<Client>(this.API_URL + '/client', client);
  }

  deleteClient(clientId: number): Observable<Client>{
    return this.http.delete<Client>(this.API_URL + '/client/' + clientId);
  }

  getClientByUser(userId: number): Observable<Client[]>{
    return this.http.get<Client[]>(this.API_URL + '/client/User/' + userId);
  }



}
