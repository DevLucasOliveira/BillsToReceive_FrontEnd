import { Order } from '.';

export class Client {
    idClient: number;
    idUser: number;
    name: string;
    phone: string;
    orders: Array<Order>;
    
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
