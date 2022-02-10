export class Transaccion{
  constructor(
    public fechaUtlimaAct: string,
    public monto: number,
    public numeroCuenta: string,
    public terminal: string,
    public tipo: string,
    public usuario: string,
  ){}
}
