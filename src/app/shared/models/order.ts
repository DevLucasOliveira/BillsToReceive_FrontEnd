export class Order {
    idOrder: number;
    idClient: number;
    productName: string;
    price: number;
    quantity: number;
    date: Date;
    total: number;
    partial: number;

    constructor(
        idClient: number,
        productName: string,
        price: number,
        quantity: number,
        date: Date,
        total: number,
    ) {
    this.idClient = idClient;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.date = date;
    this.total = total;
    }

}
