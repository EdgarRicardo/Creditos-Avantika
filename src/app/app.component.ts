import { Component, DoCheck } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements DoCheck{

  public token: String;
  constructor(private userService: UsuariosService){
    this.token = localStorage.getItem('token');
  }

  ngDoCheck(): void {
    this.token = localStorage.getItem('token');
  }

  collapseMenu(){
    document.getElementById('navbarSupportedContent')?.classList.remove('show');
 }

 cerrarSession(){
  this.userService.cerrarSesion();
 }

}


