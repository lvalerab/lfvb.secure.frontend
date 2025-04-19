import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class BrowserCacheService {
    constructor() {

    }

    Get(key:string,json:boolean=false):any {

        return json?JSON.parse(localStorage.getItem(key)+""):localStorage.getItem(key);
    }

    Set(key:string, value:any | undefined,json:boolean=false) {
        localStorage.setItem(key,json?JSON.stringify(value):value);
        return this.Get(key,json);
    }

    Del(key:string) {
        localStorage.removeItem(key);
    }
}