import { Injectable } from "@angular/core";

@Injectable()
export class GenericClass {
    transformDate(data: any) {
        const date = new Date(data);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const result = day + "-" + month + "-" + year;
        return result;
    }
}