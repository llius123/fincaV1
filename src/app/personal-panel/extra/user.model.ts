export class User {
  public id: number;
  public name: string;
  public phone: number;
  public door: number;
  public type_id: number;

  constructor(
    id: number,
    name: string,
    phone: number,
    door: number,
    type_id: number
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.door = door;
    this.type_id = type_id;
  }
}
