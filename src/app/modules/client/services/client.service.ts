import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private readonly url: string = environment.apiURL;

  constructor(private http: HttpClient) { }

  getClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/Client');
  }

  getOneClient(clientId: number): Observable<Client> {
    return this.http.get<Client>(this.url + '/Client/' + clientId);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(this.url + '/Client', client);
  }

  deleteClient(clientId: string): Observable<Client> {
    return this.http.delete<Client>(this.url + '/Client/' + clientId);
  }

  getClientByUser(userId: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/Client/User/' + userId);
  }

  createClient(client: Client) {
    return this.http.post(`${this.url}/v1/clients`, client);
  }

}
