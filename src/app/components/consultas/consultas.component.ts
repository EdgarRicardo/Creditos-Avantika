import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TransaccionesService } from '../../services/transacciones.service';
import { CuentasAhorroService } from '../../services/cuentas-ahorro.service';
import {KeyValue} from '@angular/common';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.less']
})
export class ConsultasComponent implements OnInit, DoCheck{
  esTransaccion: boolean = false;
  tipo: string= "Cuentas de Ahorro";
  ultimoTipo: string;
  consulta: any;
  constructor(private router : Router,
    private route: ActivatedRoute,
    private transacciones: TransaccionesService,
    private cuentas_a: CuentasAhorroService,
    private userServ: UsuariosService) { }

  ngOnInit(): void {
    this.ultimoTipo = this.route.snapshot.params.tipo
    this.updateTipo();
    this.getConsulta();
  }

  ngDoCheck(): void {
    if(this.ultimoTipo!=this.route.snapshot.params.tipo){
      this.ultimoTipo = this.route.snapshot.params.tipo;
      this.updateTipo();
      this.getConsulta();
    }
  }

  updateTipo(){
    this.esTransaccion = false;
    this.tipo = "Cuentas de Ahorro";
    if(this.route.snapshot.params.tipo=='transacciones'){
      this.esTransaccion = true;
      this.tipo = "Transacciones";
    }
  }

  getConsulta(){
    if(this.esTransaccion)
      this.transacciones.consulta().subscribe({
        next: (response) => {
          //Save user credentials in local storage
          this.consulta = response;
        },
        error: (e) => {
          if(e.status == 401)
            this.userServ.errorToken();
        }
      });
    else
      this.cuentas_a.consulta().subscribe({
        next: (response) => {
          //Save user credentials in local storage
          this.consulta = response;
        },
        error: (e) => {
          if(e.status == 401)
            this.userServ.errorToken();
        }
      });
  }

}
