import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { TipoPersonaModel } from "@app/data/interfaces/Censo/TipoPersonaModel";
import { environment } from "@environments/environment";
import { TipoSexoPersonaModel } from "@app/data/interfaces/Censo/TipoSexoPersonaModel";
import { TipoIdentificacionPersonaModel } from "@app/data/interfaces/Censo/TipoIdentificacionPersonaModel";
import { TipoSituacionPersonaModel } from "@app/data/interfaces/Censo/TipoSituacionPersonaModel";
import { TipoRelacionPersonaModel } from "@app/data/interfaces/Censo/TipoRelacionPersonaModel";
import { EntradaBusquedaPersonaModel } from "@app/data/interfaces/Censo/EntradaBusquedaPersonaModel";
import { PersonaModel } from "@app/data/interfaces/Censo/PersonaModel";
import { env } from "process";
import { RelacionPersonaModel } from "@app/data/interfaces/Censo/RelacionPersonaModel";
import { SituacionPersonaModel } from "@app/data/interfaces/Censo/SituacionPersonaModel";
import { IdentificacionPersonaModel } from "@app/data/interfaces/Censo/IdentificacionPersonaModel";
import { EntradaLineaTemporalPersonaModel } from "@app/data/interfaces/Censo/EntradaLineaTemporalPersonaModel";

@Injectable({
    providedIn:'root'
})
export class CensoService {
    constructor(private http:HttpClient) {

    }

    TiposPersona():Observable<TipoPersonaModel[]> {
        return this.http.get<TipoPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.maestros.tipos.personas}`);
    }

    TiposSexo():Observable<TipoSexoPersonaModel[]> {
        return this.http.get<TipoSexoPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.maestros.tipos.sexo}`);
    }

    TiposIdentificadores():Observable<TipoIdentificacionPersonaModel[]> {
        return this.http.get<TipoIdentificacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.maestros.tipos.identificadores}`);
    }

    TiposSituacionesPersonales():Observable<TipoSituacionPersonaModel[]> {
        return this.http.get<TipoSituacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.maestros.tipos.situaciones}`);
    }

    TiposRelacionesPersonales():Observable<TipoRelacionPersonaModel[]> {
        return this.http.get<TipoRelacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.maestros.tipos.relaciones}`);
    }

    BuscarPersona(filtro:EntradaBusquedaPersonaModel):Observable<PersonaModel[]> {
        return this.http.post<PersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.buscar}`,filtro);
    }

    GetPersona(id:string):Observable<PersonaModel> {
        return this.http.get<PersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.datos}`.replace(':id',id));
    }

    GetLineaTemporal(id:string):Observable<EntradaLineaTemporalPersonaModel[]> {
        return this.http.get<EntradaLineaTemporalPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.lineaTemporal}`.replace(':id',id));
    }

    AltaPersona(persona:PersonaModel) {
        return this.http.post<PersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.alta}`,persona);
    }

    ModificaPersona(persona:PersonaModel) {
        return this.http.put<PersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.alta}`,persona);
    }

    GetIdentificadoresPersona(id:string):Observable<IdentificacionPersonaModel[]> {
        return this.http.get<IdentificacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.identificadores.lista}`.replace(':id',id));
    }

    AltaModificacionIdentificadorPersona(identificador:IdentificacionPersonaModel):Observable<IdentificacionPersonaModel> {
        return this.http.post<IdentificacionPersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.identificadores.altaModificacion}`,identificador);
    }

    GetSituacionesPersona(id:string):Observable<SituacionPersonaModel[]>{
        return this.http.get<SituacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.situaciones.lista}`.replace(':id',id));
    }

    AltaSituacionPersona(situacion:SituacionPersonaModel):Observable<SituacionPersonaModel> {
        return this.http.post<SituacionPersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.situaciones.alta}`,situacion);
    }

    ModificaSituacionPersona(situacion:SituacionPersonaModel):Observable<SituacionPersonaModel> {
        return this.http.post<SituacionPersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.situaciones.alta}`,situacion);
    }

    GetRelacionesPersona(id:string):Observable<RelacionPersonaModel[]> {
        return this.http.get<RelacionPersonaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.relaciones.lista}`.replace(':id',id));
    }

    AltaModificacionRelacionPersona(relacion:RelacionPersonaModel):Observable<RelacionPersonaModel> {
        return this.http.post<RelacionPersonaModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.censo.persona.relaciones.altaModificar}`,relacion);
    }
}