export class OrderItem {
    idOrderItem: number;
    idOrder: number;
    productName: string;
    price: number;
    quantity: number;
    date: Date;
    total: number;
    partial: number;

    constructor(
        idOrder: number,
        productName: string,
        price: number,
        quantity: number,
        date: Date,
        total: number,
    ) {
    this.idOrder = idOrder;
    this.productName = productName;
    this.price = price;
    this.quantity = quantity;
    this.date = date;
    this.total = total;
    }

}
