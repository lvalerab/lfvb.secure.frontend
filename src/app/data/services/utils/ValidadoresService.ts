import {Injectable} from '@angular/core';
@Injectable({
    providedIn:'root'
})
export class ValidadoresService {
    
    
    LetraDNI(valor:string) {
      if(valor.trim()!="") {
        let vi=parseInt(valor,10);
        let di=vi%23;
        let letras='TRWAGMYFPDXBNJZSQVHLCKE';
        return letras[di];
      } else {
        return "";
      }
    }


    LetraNIE(valor:string) {
        let aux=valor.trim().toUpperCase();
        if(aux!="" && (aux.trim()[0]=="X" || aux.trim()[0]=="Y" || aux.trim()[0]=="Z")) {
            switch(aux[0]) {
                case "X":
                    aux.replace("X","0");
                    break;
                case "Y":
                    aux.replace("Y","1");
                    break;
                case "Z":
                    aux.replace("Z","2");
                    break;    
            }
            let vi=parseInt(aux);
            let di=vi%23;
            return "TRWAGMYFPDXBNJZSQVHLCKE"[di];
        } else {
            return "";
        }
    }
}