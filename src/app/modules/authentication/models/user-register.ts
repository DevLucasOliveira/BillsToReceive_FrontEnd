export class UserRegister {

  constructor(name: string, userName: string, password: string, keyAccess: string) {
    this.name = name;
    this.userName = userName;
    this.password = password;
    this.keyAccess = keyAccess;
  }

  public name: string;
  public userName: string;
  public password: string;
  public keyAccess: string;

}
