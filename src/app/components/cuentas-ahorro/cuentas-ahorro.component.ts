import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { CuentasAhorro } from '../../models/cuentas_ahorro';
import { CuentasAhorroService } from '../../services/cuentas-ahorro.service';
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-cuentas-ahorro',
  templateUrl: './cuentas-ahorro.component.html',
  styleUrls: ['./cuentas-ahorro.component.less']
})
export class CuentasAhorroComponent implements OnInit {
  cuenta: CuentasAhorro;
  clientes: any;
  statusReq: number = 0;
  constructor(private userServ: UsuariosService, private cuentas_aServ: CuentasAhorroService) {

    this.cuenta = new CuentasAhorro('Activa',this.getActualDate(),-1,'',0);
  }

  ngOnInit(): void {
    this.getClientes();
  }

  resetStatus(){
    this.statusReq = 0;
  }

  onSubmit(form: any){
    this.cuentas_aServ.alta(this.cuenta).subscribe({
      next: (response) => {
        this.statusReq = 1;
        form.reset();
        this.cuenta = new CuentasAhorro('Activa',this.getActualDate(),-1,'',0);
      },
      error: (e) => {
        this.statusReq = 2;
        if(e.status == 401)
            this.userServ.errorToken();
      }
    });
  }

  getClientes(){
    this.userServ.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      },
      error: (e) => {
        alert("Problema al recuperar la lista de clientes")
      }
    });
  }

  getActualDate(){
    var today = new Date();
    return today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  }
}
