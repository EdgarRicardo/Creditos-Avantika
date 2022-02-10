import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { CuentasAhorroComponent } from './components/cuentas-ahorro/cuentas-ahorro.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'consulta/:tipo', component: ConsultasComponent
  },
  {
    path: 'transacciones/:tipo', component: TransaccionesComponent
  },
  {
    path: 'cuentas_ahorro/altas', component: CuentasAhorroComponent
  },
  {
    path: '**', redirectTo: '/'
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
