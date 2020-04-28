export class User {
    public idUser: number; 
    public fullName: string;
    public userName: string;
    public password: string;

    constructor(fullName: string, userName: string, password: string) {
        this.fullName = fullName;
        this.userName = userName;
        this.password = password;
    }

}