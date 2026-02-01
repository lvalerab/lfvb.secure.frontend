import { Pipe, PipeTransform } from "@angular/core";
import { I18NGlobalService } from "../services/I18NGlobalService";

@Pipe({
    name:'traduce',
    pure:false
})
export class I18NTextoTranslatePipe implements PipeTransform {
    constructor(private i18NGServ:I18NGlobalService) {

    }

    transform(value: string,pagina:string,defecto:string="") {
        return this.i18NGServ.translate(pagina,value)??defecto;
    }
}