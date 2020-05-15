import { OrderItem } from '@shared/models';
export class Order{
    idOrder: number;
    idClient: number;
    total: number;
    paid: number;
    items: Array<OrderItem>;

    constructor(
        idClient: number,
        total: number,
        paid: number
        ) {
        this.idClient = idClient;
        this.total = total;
        this.paid = paid;
    }
}