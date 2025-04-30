import { Injectable, WritableSignal, Signal, signal } from "@angular/core";
import {BrowserCacheService} from "@data/services/data/BrowserCacheService";

@Injectable({
    providedIn:'root'
})
export class AuthService {
    useSignal:boolean=true;

    token:WritableSignal<string | null>=signal(null);

    constructor(private cache:BrowserCacheService) {
        ///this.token.set(null);
        console.log('llama al constructor');
    }

    login(inputToken:string) {
        if(this.useSignal) {
            console.log(`INPUT TOKEN ${inputToken}`);
            this.token.set(inputToken);
        } else {
            this.cache.Set("token",inputToken);
        }
    }

    getAuthorizationToken():string | null { 
        if(this.useSignal) {       
            let aux:string | null=this.token();
            return aux;
        } else {
            return this.cache.Get("token");    
        }
    }

    isAuthenticated() {
        let aux:string|null;
        if(this.useSignal) {
            aux=this.token();
        } else  {
            aux=this.cache.Get("token");
        }
        console.log(`TOKEN: ${aux}`);
        return aux!==null;
    }

    logout() {
        if(this.useSignal) {
            console.log('Llama a logout');
            this.token.set(null);
        } else {
            this.cache.Del("token");
        }
    }
}