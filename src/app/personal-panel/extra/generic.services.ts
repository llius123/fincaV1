import { Injectable } from "@angular/core";

@Injectable()
export class GenericClass {
  transformDate(data: any) {
    const date = new Date(data);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const result = day + "/" + month + "/" + year;
    return result;
  }

  insertDateDatabase(data: any) {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const result = year + "-" + month + "-" + day;
    return result;
  }
}
