import { Injectable } from "@angular/core";

@Injectable()
export class GenericClass {
    transformDate(data: any) {
        const date = new Date(data);
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();
        const result = day + "-" + month + "-" + year;
        return result;
    }

    insertDateDatabase(date: any) {
        const year = date.substring(6, 10);
        const day = date.substring(0, 2);
        const month = date.substring(3, 5)
        const dataformatted = year + '-' + month + '-' + day;
        return dataformatted;
    }
}