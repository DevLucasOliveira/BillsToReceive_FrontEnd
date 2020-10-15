export class OrderItem {

  constructor(
    id: string,
    description: string,
    price: number,
    quantity: string,
    total: number,
    date: Date) {
    this.id = id;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.total = total;
    this.date = date;
  }

  public id: string;
  public description: string;
  public price: number;
  public quantity: string;
  public total: number;
  public date: Date;
}
