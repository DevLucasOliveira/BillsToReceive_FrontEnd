import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private readonly url: string = environment.apiURL;

  public authenticateAdmin(admin: any) {
    return this.http.post(`${this.url}/v1/admin`, admin);
  }

  public createAcessKey(admin: any) {
    return this.http.post(`${this.url}/v1/admin/keyaccess`, admin);
  }


}
