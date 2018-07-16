export class User {
  public id: number;
  public name: string;
  public phone: number;
  public door: number;
  public type_id: number;
  public user: string;
  public pass: string

  constructor(
    id: number,
    name: string,
    phone: number,
    door: number,
    type_id: number,
    user: string,
    pass: string
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.door = door;
    this.type_id = type_id;
    this.user = user;
    this.pass = pass;
  }
}
