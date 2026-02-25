import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IdiomaModel} from "@data/interfaces/i18N/IdiomaModel";
import { environment } from "@environments/environment";
import { ColeccionTextoModel } from "@app/data/interfaces/i18N/Colecciones/ColeccionTextoModel";
import { CampoColeccionTextoModel } from "@app/data/interfaces/i18N/Colecciones/CampoColeccionTextoModel";
import {OpcionCampoColeccionTextoModel} from "@data/interfaces/i18N/Colecciones/OpcionCampoColeccionTextoModel";
import { TextoModel } from "@app/data/interfaces/i18N/Textos/TextoModel";
import { env } from "process";
import { BusquedaTextoModel } from "@app/data/interfaces/i18N/Textos/BusquedaTextoModel";
import { VariableTextoModel } from "@app/data/interfaces/i18N/Textos/VariableTextoModel";

@Injectable(
    {
        providedIn:'root'
    }
)
export class i18NService {
    constructor(private http:HttpClient) {

    }

    Lista():Observable<IdiomaModel[]> {
        return this.http.get<IdiomaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.lista}`);
    }

    Detalle(codIdioma:string):Observable<IdiomaModel> {
        return this.http.get<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.detalle}`.replace(":codigoIdioma",codIdioma));
    }

    Ident(codIdioma:string):Observable<string> {
        return this.http.get<string>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.ident}`.replace(":codigoIdioma",codIdioma));
    }

    ListaTodos():Observable<IdiomaModel[]> {
        return this.http.get<IdiomaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.listaTodos}`);
    }

    Alta(idioma:IdiomaModel):Observable<IdiomaModel> {
        return this.http.post<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.alta}`,idioma);
    }

    Modifica(idioma:IdiomaModel):Observable<IdiomaModel> {
        return this.http.put<IdiomaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.modificar}`,idioma);
    }

    ColeccionesLista():Observable<ColeccionTextoModel[]> {
        return this.http.get<ColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.lista}`);
    }

    Coleccion(id:string):Observable<ColeccionTextoModel> {
        return this.http.get<ColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.detalle}`.replace(':id',id));
    }

    ColeccionCampos(id:string):Observable<CampoColeccionTextoModel[]> {
        return this.http.get<CampoColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.lista}`.replace(':id',id));
    }

    ColeccionCampo(idCampo:string,id:string):Observable<CampoColeccionTextoModel> {
        return this.http.get<CampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.detalle}`.replace(':idCampo',idCampo).replace(':id',id));
    }

    ColeccionCampoOpciones(idCampo:string, id:string):Observable<OpcionCampoColeccionTextoModel[]> {
        return this.http.get<OpcionCampoColeccionTextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.opciones.lista}`.replace(':idCampo',idCampo).replace(':id',id));
    }

    ColeccionCampoOpcion(idOpcion:string, idCampo:string, id:string):Observable<OpcionCampoColeccionTextoModel> {
        return this.http.get<OpcionCampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.colecciones.campos.opciones.lista}`.replace(':idOpcion',idOpcion).replace(':idCampo',idCampo).replace(':id',id));
    }

    AltaColeccion(modelo:ColeccionTextoModel):Observable<ColeccionTextoModel> {
        return this.http.post<ColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.alta}`,modelo);
    }

    ModificarColeccion(modelo:ColeccionTextoModel):Observable<ColeccionTextoModel> {
        return this.http.put<ColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.modificacion}`,modelo);
    }

    EliminarColeccion(id:string, textos:boolean):Observable<Boolean> {
        return this.http.delete<Boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.eliminar}`.replace(":id",id).replace(":textos",textos?"true":"false"));
    }

    AltaCampoColeccion(modelo:CampoColeccionTextoModel):Observable<CampoColeccionTextoModel> {
        return this.http.post<CampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.alta}`,modelo);
    }

    ModificarCampoColeccion(modelo:CampoColeccionTextoModel):Observable<CampoColeccionTextoModel> {
        return this.http.put<CampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.alta}`,modelo);
    }

    EliminarCampoColeccion(id:string, textos:boolean):Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.eliminar}`.replace(":id",id).replace(":textos",textos?"true":"false"));
    }

    AltaOpcionCampoColeccion(modelo:OpcionCampoColeccionTextoModel):Observable<OpcionCampoColeccionTextoModel> {
        return this.http.post<OpcionCampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.opciones.alta}`,modelo);
    }

    ModificaOpcionCampoColeccion(modelo:OpcionCampoColeccionTextoModel):Observable<OpcionCampoColeccionTextoModel> {
        return this.http.put<OpcionCampoColeccionTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.opciones.alta}`,modelo);
    }

    EliminarOpcionCampoColeccion(id:string, textos:boolean):Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.coleccion.campos.opciones.eliminar}`.replace(":id",id).replace(":textos",textos?"true":"false"));
    }

    Texto(id:string):Observable<TextoModel> {
        return this.http.get<TextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.textos.elemento}`.replace(':id',id));
    }

    TextoBusqueda(modelo:BusquedaTextoModel):Observable<string[]> {
        return this.http.post<string[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.textos.busqueda.id}`,modelo);
    }

    TextoBusquedaModelo(modelo:BusquedaTextoModel):Observable<TextoModel[]> {
        return this.http.post<TextoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.i18N.textos.busqueda.textos}`,modelo);
    }

    AltaTexto(texto:TextoModel):Observable<TextoModel> {
        return this.http.post<TextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.textos.alta}`,texto);
    }

    ModificaTexto(texto:TextoModel):Observable<TextoModel> {
        return this.http.put<TextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.textos.alta}`,texto);
    }

    EliminaTexto(id:string):Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.textos.eliminar}`.replace(':id',id));
    }

    AltaVariableTexto(variable:VariableTextoModel):Observable<VariableTextoModel> {
        return this.http.post<VariableTextoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.textos.variables.alta}`,variable);
    }

    EliminaVariableTexto(id:string):Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.administracion.i18N.textos.variables.eliminar}`.replace(':id',id));
    }
}