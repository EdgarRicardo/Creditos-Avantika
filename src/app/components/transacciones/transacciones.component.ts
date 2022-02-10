import { Component, OnInit, DoCheck } from '@angular/core';
import { TransaccionesService } from '../../services/transacciones.service';
import { CuentasAhorroService } from '../../services/cuentas-ahorro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaccion } from '../../models/transaccion';
import { UsuariosService } from '../../services/usuarios.service';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.less']
})
export class TransaccionesComponent implements OnInit, DoCheck {
  esDeposito: boolean = false;
  tipo: string= "Déposito";
  cuentas: any;
  transaccion: Transaccion;
  statusReq: number = 0;
  ultimoTipo: string;
  constructor(private router : Router,
    private route: ActivatedRoute,
    private transaccionesServ: TransaccionesService,
    private cuentas_a: CuentasAhorroService,
    private userServ: UsuariosService) {
      this.transaccion = new Transaccion(this.getDate(),0,'','TERM235','','u-231');
      this.ultimoTipo = this.route.snapshot.params.tipo;
    }

  ngOnInit(): void {
    this.updateTipo();
  }

  ngDoCheck(): void {
    if(this.ultimoTipo!=this.route.snapshot.params.tipo){
      this.ultimoTipo = this.route.snapshot.params.tipo;
      this.updateTipo();
    }
  }

  resetStatus(){
    this.statusReq = 0;
  }

  updateTipo(){
    this.tipo = "Retiro";
    if(this.route.snapshot.params.tipo=='deposito')
      this.tipo = "Deposito";
    this.transaccion.tipo = this.tipo;
    this.getCuentas();
  }

  getCuentas(){
    this.cuentas_a.consulta().subscribe({
      next: (response) => {
        this.cuentas = Object.values(response);
        if(this.tipo != "Deposito")
          this.cuentas  = this.cuentas .filter(function(data:any) {
            if(data.saldo>0)
              return data
          });
        console.log(this.cuentas);

      },
      error: (e) => {
        if(e.status == 401)
          this.userServ.errorToken();
      }
    });
  }

  onSubmit(form: any){
      this.transaccionesServ.transaccion(this.transaccion).subscribe({
        next: (response) => {
          this.statusReq = 1;
          form.reset();
          this.transaccion = new Transaccion(this.getDate(),0,'','TERM235',this.tipo,'u-231');
        },
        error: (e) => {
          this.statusReq = 2;
          if(e.status == 401)
              this.userServ.errorToken();
        }
      });
  }

  getDate(){
    var today = new Date();
    return today.toISOString();
  }
}
