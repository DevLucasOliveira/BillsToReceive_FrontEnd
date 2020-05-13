export class Order {
    idOrder: number;
    idOrders: number;
    productName: string;
    price: number;
    quantity: number;
    date: Date;
    total: number;
    partial: number;

    constructor(
        idOrders: number,
        productName: string,
        price: number,
        quantity: number,
        date: Date,
        total: number,
    ) {
    this.idOrders = idOrders;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.date = date;
    this.total = total;
    }

}
