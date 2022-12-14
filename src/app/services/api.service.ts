import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArcotelCliente } from '../models/arcotelCliente';
import { Cliente } from '../models/cliente';
import { ContratoArcotel } from '../models/contratoArcotel';
import { detalleCliente } from '../models/detalleCliente';
import { ServicioBombero } from '../models/servicioBombero';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
private urlEndPoint:string='http://panaderiasistema.somee.com/WCFproductos.svc/listaclientes';
private urlEndPoint2:string='http://www.panaderiasistema.somee.com/WCFproductos.svc/cantidadcomprasucursal'
private urlEndPoint3:string='http://panaderiasistema.somee.com/WCFproductos.svc/cliente'


private urlEndPointBombero:string='http://bomberoscba.somee.com/Service1.svc/servicio';

private arcotelEndPoint:string='http://arcoteln.somee.com/service1.svc/Devolver_Personas_Por_Cedula' 
private arcotelEndPoint2:string='http://arcoteln.somee.com/Service1.svc/Devolver_Costo_Contrato_Servicio'


private httpHeaders=new HttpHeaders({
  'Content-type':'application/json'
});

  constructor(private http:HttpClient,private router:Router) { }


  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }

  getClientesById(cedula):Observable<detalleCliente[]>{
    return this.http.get<detalleCliente[]>(`${this.urlEndPoint2}/${cedula}`)
  }

  getClienteById2(cedula):Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.urlEndPoint3}/${cedula}`)
  }

  getClienteArcotelByCedula(cedula):Observable<ArcotelCliente[]>{
    return this.http.get<ArcotelCliente[]>(`${this.arcotelEndPoint}/${cedula}`)
  }

  getContratosArcotelByCedula(cedula):Observable<ContratoArcotel[]>{
    return this.http.get<ContratoArcotel[]>(`${this.arcotelEndPoint2}/${cedula}`)
  }

  getServicioBomberoByCedula(cedula):Observable<ServicioBombero[]>{
    return this.http.get<ServicioBombero[]>(`${this.urlEndPointBombero}/${cedula}`)
  }
}
