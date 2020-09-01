import { OrderItem } from './orderItem';

export class Order {

  constructor(items: OrderItem[]) {
    this.items = items;
  }

  public id: string;
  public items: OrderItem[];
}
