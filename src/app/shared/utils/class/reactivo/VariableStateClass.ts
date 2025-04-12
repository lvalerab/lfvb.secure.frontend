/*
Clase: VariableStateService
Descripción: Clase para manejar el estado de una variable en la aplicación.
Propósito: Permitir la gestión de una variable de estado de forma reactiva, utilizando señales y computados de SolidJS. 
*/

import { signal, computed, Signal } from '@angular/core';

export class VariableStateClass<T> {
    readonly State =signal({} as T);

    constructor() {}

    public select<K extends keyof T>(key: K): Signal<T[K]> {
        return computed(() => this.State()[key]);
    }

    public getState():Signal<T> {
        return this.State;
    }
    
    public set<K extends keyof T>(key: K, value: T[K]): void {
        this.State.update((state) => ({ ...state, [key]: value }));
    }   

    public setState(state: T): void {
        this.State.set(state);
    }
}

export class VariableSignal<T> {
    readonly State=signal(null as T);
    constructor() {}

    public set(value: T): void {
        this.State.set(value);
    }

    public get(): T {
        return this.State();
    }

    public select(): Signal<T> {
        return this.State;
    }

}