import {Injectable} from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class IndexedDBService {
    canUseDB:boolean;
    db:IDBFactory|null=null;
    tr:any=null;
    constructor() {
        //db=window.indexedDB||window.mozIndexedDb||window.webkitIndexedDB  || window.msIndexedDB;
        //tr=window.IDBTransaction||window.webkitDBTransaction||window.msIDBTransaction;

        this.db=window.indexedDB;
        this.tr=window.IDBTransaction;

        this.canUseDB=!(!this.db);
    }

    //usar base de datos
    open(namebd:string, version:number=1):IDBOpenDBRequest | undefined {
        return this.db?.open(namebd,version);
    }

    use(namebd:string, version:number=1):IDBOpenDBRequest | undefined {
        return this.open(namebd,version);
    }

    
}