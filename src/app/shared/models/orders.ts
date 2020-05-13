export class Orders{
    idOrders: number;
    idClient: number;
    total: number;
    paid: number;

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