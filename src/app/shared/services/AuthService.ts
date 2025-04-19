import { Injectable } from "@angular/core";
import {BrowserCacheService} from "@data/services/data/BrowserCacheService";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    constructor(private cache:BrowserCacheService) {}


    getAuthorizationToken():string {        
        let token:string=this.cache.Get("token")??"";
        console.info("Get TOKEN",token);
        return token;
    }
}