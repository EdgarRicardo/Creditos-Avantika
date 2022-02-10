import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  title= "Registra a un nuevo cliente";
  error="Error hay dar de alta";
  public statusReq: number = 0;
  public cliente: Cliente;

  constructor(private userServices: UsuariosService) {
    this.cliente = new Cliente('','','',18,'');
  }

  ngOnInit(): void {
  }

  resetStatus(){
    this.statusReq = 0;
  }

  counter(i: number) {
    return new Array(i);
  }

  onSubmit(form: any){
    this.userServices.newCliente(this.cliente).subscribe({
      next: (response) => {
        this.statusReq = 1;
        form.reset();
        this.cliente.edad = 18;
      },
      error: (e) => {
        let keyError = Object.keys(e.error.errors)[0];
        this.error = e.error.errors[keyError][0];
        this.statusReq = 2;
      }
    });
  }

}
