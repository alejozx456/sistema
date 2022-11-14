import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ArcotelCliente } from 'src/app/models/arcotelCliente';
import { Cliente } from 'src/app/models/cliente';
import { detalleCliente } from 'src/app/models/detalleCliente';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle-clientes',
  templateUrl: './detalle-clientes.component.html',
  styleUrls: ['./detalle-clientes.component.css']
})
export class DetalleClientesComponent implements OnInit {

  public columnsToDisplay=['sucursal','cantidadCompra','ciudad']
  public datasource:any=new MatTableDataSource();
  @ViewChild(MatPaginator) paginator:MatPaginator;


  public datos:detalleCliente[];
  public nombreCliente:string;
  public apellidoCliente:string;
  public operadoraCliente:string;
  public cliente:Cliente[];



  public datosArcotel:ArcotelCliente[];
  public cedulaClienteArcotel:string;
  public nombreClienteArcotel:string;
  public apellidoClienteArcotel:string;
  public correoClienteArcotel:string;
  public direccionClienteArcotel:string;
  public estadoCivilClienteArcotel:string;
  public generoClienteArcotel:string;


  constructor(private activateRoute:ActivatedRoute,private api:ApiService) { }

  ngOnInit(): void {
    this.getDataArcotel();
    this.getDataPanificadora();
    this.getDataPanificadora2();
  }


  getDataPanificadora(){
    this.activateRoute.paramMap.subscribe(params=>{
      let cedula=+params.get('cedula');
      this.api.getClientesById(cedula).subscribe(response=>{
        this.datos=response
        console.log(this.datos);
        
        this.datasource.data=this.datos;
        this.datasource.paginator=this.paginator;
        for (const cate of this.datos){
         this.nombreCliente=cate.NOM_CLIE;
         this.apellidoCliente=cate.APELL_CLIE;
         
        }
      })
    })

  }

  getDataPanificadora2(){
    this.activateRoute.paramMap.subscribe(params=>{
      let cedula=+params.get('cedula');
      this.api.getClienteById2(cedula).subscribe(response=>{
        this.cliente=response;
        console.log(this.cliente);
        for(const cate of this.cliente){
          this.operadoraCliente=cate.OPERADORA;
        }
      })
    })
  }


  getDataArcotel(){
    this.activateRoute.paramMap.subscribe(params=>{
      let cedula=+params.get('cedula');
      this.api.getClienteArcotelByCedula(cedula).subscribe(response=>{
        this.datosArcotel=response;
        console.log(this.datosArcotel);
        for(const cate1 of this.datosArcotel){
          this.cedulaClienteArcotel=cate1.Cedula_Persona;
          this.nombreClienteArcotel=cate1.Nombre_Persona;
          this.apellidoClienteArcotel=cate1.Apellido_Persona;
          this.correoClienteArcotel=cate1.Correo_Persona;
          this.direccionClienteArcotel=cate1.Direccion;
          this.estadoCivilClienteArcotel=cate1.Estado_Civil_Persona;
          this.generoClienteArcotel=cate1.Genero_Persona;

         
        }
      })
    })
  }


  calculacionTotal() {
    let sum: number = 0;
    if (this.datasource)
      for (let row of this.datasource.data) {
         sum += row.cantidadCompra;
      }
    return sum;
  }
}
