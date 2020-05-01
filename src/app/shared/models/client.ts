export class Client {
    idClient: number;
    idUser: number;
    name: string;
    phone: string;
    lastOrderDate?: Date;
    totalOrders: number;

    constructor(
        idUser: number,
        name: string,
        phone: string
        ) {
        this.idUser = idUser;
        this.name = name;
        this.phone = phone;
    }

}
