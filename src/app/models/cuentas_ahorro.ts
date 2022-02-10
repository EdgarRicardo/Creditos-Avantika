export class CuentasAhorro{
  constructor(
    public estado: string,
    public fechaUtlimaAct: string,
    public idCliente: number,
    public numeroCuenta: string,
    public saldo: number
  ){}
}
