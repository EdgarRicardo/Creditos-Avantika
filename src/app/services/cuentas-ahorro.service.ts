import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CuentasAhorro } from '../models/cuentas_ahorro';

@Injectable({
  providedIn: 'root'
})
export class CuentasAhorroService {

  urlBase = "https://mibanco-333616-default-rtdb.firebaseio.com/cuentaAhorro/OcBMnUGvAqVlUOskPph6ZIDpDqj2.json";
  httpHeaders: HttpHeaders;
  constructor(public http: HttpClient) {
    let token = localStorage.getItem('token');
    this.urlBase += "?auth="+token;
    this.httpHeaders = new HttpHeaders({
      'Content-Type':'application/json',
      'X-Requested-With' : 'XMLHttpRequest'
    });
  }

  consulta():Observable<any>{
    return this.http.get(this.urlBase ,{ headers: this.httpHeaders });
  }

  alta(data:CuentasAhorro):Observable<any>{
    let jsonData = JSON.stringify(data);
    return this.http.post(this.urlBase, jsonData ,{ headers: this.httpHeaders });
  }

}
