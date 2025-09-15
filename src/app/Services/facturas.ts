import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFacturas } from '../Interfaces/ifacturas';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Facturas {
  private readonly rutaApi="https://localhost:7206/api/Factura";
  constructor(private http: HttpClient) { }

   manejoErrores(error: HttpErrorResponse) {
    const msg = error.error?.message || error.statusText || 'Error';
    return throwError(() => {
      new Error(msg);
    });
  }

    todas_Facturas(): Observable<IFacturas[]> {
        var clientes = this.http
          .get<IFacturas[]>(this.rutaApi)
          .pipe(catchError(this.manejoErrores));
        return clientes;
      }
}
  

