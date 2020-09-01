import { Order } from './order';

export class Client {

  constructor(user: string, name: string, cellPhone: string) {
    this.user = user;
    this.name = name;
    this.cellPhone = cellPhone;
  }

  public id: string;
  public user: string;
  public name: string;
  public cellPhone: string;
  public orders: Order;
}
