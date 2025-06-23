import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '@environments/environment';
import {TipoPropiedadModel} from '@data/interfaces/TipoPropiedadModel';
import { Observable } from 'rxjs';
import { PropiedadModel } from "@data/interfaces/PropiedadModel";
import {PropiedadElementoModel} from "@data/interfaces/PropiedadElementoModel";
import { ParametroElementosPropiedadesModel } from "@data/interfaces/ParametroElementosPropiedadesModel";
@Injectable({
    providedIn:'root'
})
export class PropiedadesApiService {
    constructor(private http:HttpClient) {

    }

    Tipos():Observable<TipoPropiedadModel[]> {
        return this.http.get<TipoPropiedadModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.tipos}`);
    }

    Propiedades(codPropiedadPadre:string|null,codTipoElemento:string|null=null):Observable<PropiedadModel[]> {
        var ruta=`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.lista}`;
        if(codPropiedadPadre!=null) {
            ruta+=`${ruta.indexOf('?')>=0?"&":"?"}codPadrePropiedad=${codPropiedadPadre}`;
        }
        if(codTipoElemento!=null) {
            ruta+=`${ruta.indexOf('?')>=0?"&":"?"}codTipoElemento=${codTipoElemento}`;
        }
        return this.http.get<PropiedadModel[]>(ruta);
    }

    PropiedadesElemento(guid:string,codPropiedades:string|null=null):Observable<PropiedadElementoModel[]> {
        return this.http    
                    .get<PropiedadElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.elemento.porIdElemento.replace(':idElemento',guid)}${(codPropiedades!=null?`/${codPropiedades}`:'')}`);
    }

    ConsultaPropiedadesElementos(parametro:ParametroElementosPropiedadesModel):Observable<PropiedadElementoModel[]> {
        return this.http
                    .post<PropiedadElementoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.elemento.consulta}`,parametro);
    }

    GuardarPropiedadElemento(propiedad:PropiedadElementoModel) {
        return this.http
                    .post<PropiedadElementoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.propiedades.elemento.actualiza_anyade}`,propiedad);
    }
}