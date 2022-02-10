import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { Login } from '../../models/login';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  public statusReq: number = 0;
  public title: string = "Inicia sesión :)";
  public login: Login;

  constructor(private router: Router, private userServices: UsuariosService){
    this.login = new Login('','',true)
  }

  ngOnInit(): void {
  }

  resetStatus(){
    this.statusReq = 0;
  }

  onSubmit(form: any){
    /* of(this.userServices.getLogin(this.login)).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    }); */
    this.userServices.getLogin(this.login).subscribe({
      next: (response) => {
        this.statusReq = 1;
        //Save user credentials in local storage
        localStorage.setItem('token', response.idToken);
        localStorage.setItem('infoLogin', JSON.stringify(response));
        this.router.navigate(['/cuentas_ahorro/consulta']);
        form.reset();
      },
      error: (e) => {
        this.statusReq = 2;
      }
    });
  }


}
