import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@environments/environment";
import { TramiteModel } from "@data/interfaces/Circuitos/TramiteModel";
import { CircuitoModel } from "@data/interfaces/Circuitos/CircuitoModel";
import { FiltroCircuitoModel } from "@data/interfaces/Circuitos/FiltroCircuitoModel";
import { AltaCircuitoModel } from "@app/data/interfaces/Circuitos/AltaCircuitoModel";
import { PasoModel } from "@app/data/interfaces/Pasos/PasoModel";
import { RelacionGuids } from "@app/data/interfaces/RelacionGuidsModel";
import { AccionPasoModel } from "@app/data/interfaces/Pasos/AccionPasoModel";
import { AccionModel } from "@app/data/interfaces/Acciones/AccionModel";
import { BandejaModel } from "@app/data/interfaces/Bandejas/BandejaModel";
@Injectable({
    providedIn:'root'
})
export class AdministracionCircuitosTramitacionService {
    constructor(private http:HttpClient) {

    }

    public ListaTramites():Observable<TramiteModel[]> {
        return this.http.get<TramiteModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.lista}`);
    }

    public GetTramite(id:string):Observable<TramiteModel|null> {
        return this.http.get<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.elemento}`.replace(':id',id));
    }

    public AltaTramite(tramite:TramiteModel):Observable<TramiteModel|null> {
        return this.http.post<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.alta}`,tramite);
    }

    public ModificaTramite(tramite:TramiteModel):Observable<TramiteModel|null> {
        return this.http.put<TramiteModel|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.tramites.modifica}`,tramite);
    }


    public ListaCircuitos(filtro:FiltroCircuitoModel):Observable<CircuitoModel[]|null> {
        return this.http.post<CircuitoModel[]|null>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.lista}`,filtro);
    }

    public GetCircuito(id:string):Observable<CircuitoModel> {
        return this.http.get<CircuitoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.elemento}`.replace(':id',id))
    }

    public NuevoCircuito(circuito:AltaCircuitoModel):Observable<AltaCircuitoModel> {
        return this.http.post<AltaCircuitoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.nuevo}`,circuito);
    }

    public ModficiarCircuito(circuito:CircuitoModel):Observable<CircuitoModel> {
        return this.http.put<CircuitoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.circuitos.modificar}`,circuito);
    }

    public ListaPasos(idCircuito:string):Observable<PasoModel[]> {
        return this.http.get<PasoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.lista}`.replace(':id',idCircuito));
    }

    public GetPaso(id:string):Observable<PasoModel> {
        return this.http.get<PasoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.elemento}`.replace(':id',id));
    }

    public AltaPaso(paso:PasoModel):Observable<PasoModel> {
        return this.http.post<PasoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.alta}`,paso);
    }

    public ModificaPaso(paso:PasoModel):Observable<PasoModel> {
        return this.http.put<PasoModel>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.modificacion}`,paso);
    }

    public EliminaPaso(id:string):Observable<boolean> {
        return this.http.delete<boolean>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.eliminar}`.replace(':id',id));
    }

    public RelacionaPasos(relacion:RelacionGuids):Observable<string[]> {
        return this.http.post<string[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.Relacion.relaciona}`,relacion);
    }

    public DesrelacionaPasos(relacion:RelacionGuids):Observable<string[]> {
        return this.http.post<string[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.Relacion.desrelaciona}`,relacion);
    }

    public ListaAcciones():Observable<AccionModel[]> {
        return this.http.get<AccionModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Acciones.lista}`);
    }

    public AccionesPrepaso(id:string):Observable<AccionPasoModel[]> {
        return this.http.get<AccionPasoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.Acciones.lista}`.replace(':pasoId',id).replace(':tipo','PREPASO'));
    }

    public AccionesPostpaso(id:string):Observable<AccionPasoModel[]> {
        return this.http.get<AccionPasoModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Pasos.Acciones.lista}`.replace(':pasoId',id).replace(':tipo','POSTPASO'));
    }

    public ListaBandejas():Observable<BandejaModel[]> {
        return this.http.get<BandejaModel[]>(`${environment.api.auth.base}${environment.api.auth.rutas.modulos.circuitos.administracion.Bandejas.lista}`);
    }
}