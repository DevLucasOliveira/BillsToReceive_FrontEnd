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

  getClientByUser(userId: number): Observable<Client[]> {
    return this.http.get<Client[]>(this.url + '/Client/User/' + userId);
  }




  createClient(client: Client) {
    return this.http.post(`${this.url}/v1/clients`, client);
  }

  getClientsOfUser(idUser: string) {
    return this.http.get(`${this.url}/v1/clients/` + idUser);
  }

  deleteClient(clientId: string) {
    return this.http.delete(`${this.url}/v1/clients/` + clientId);
  }

  getClientById(clientId: string){
    return this.http.get(`${this.url}/v1/clients/get/` +clientId);
  }


}
