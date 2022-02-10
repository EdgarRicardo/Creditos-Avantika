import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/interfaces';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlBase = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI";
  urlLocalBase = "http://localhost:8000/api";
  httpHeaders: HttpHeaders;
  constructor(public http: HttpClient, private router : Router) {
    this.httpHeaders = new HttpHeaders({
      /* Authorization: 'Bearer ' + localStorage.getItem("access_token"), */
      'Content-Type':'application/json',
      'X-Requested-With' : 'XMLHttpRequest'
    });
  }

  getLogin(login: Login): Observable<any>{
    let jsonData = JSON.stringify(login);
    return this.http.post(this.urlBase, jsonData ,{ headers: this.httpHeaders });
  }

  newCliente(cliente: Cliente){
    let jsonData = JSON.stringify(cliente);
    return this.http.post(this.urlLocalBase+"/register", jsonData ,{ headers: this.httpHeaders });
  }

  getClientes(){
    return this.http.get(this.urlLocalBase+"/clientes",{ headers: this.httpHeaders });
  }

  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('infoLogin');
    this.router.navigate(['/login']);
  }

  errorToken(){
    alert("Error con tu token, vuelve a iniciar sesión")
    this.cerrarSesion();
  }
}
