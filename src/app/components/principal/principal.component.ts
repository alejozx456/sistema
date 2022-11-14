import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/models/cliente';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {


  public columnsToDisplay=['cedula','nombre','apellido','telefono']
  public datasource:any=new MatTableDataSource();
  public clientes:Cliente[];
  public listacopiar:any[];

  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getDataClientes();
  }

  getDataClientes(){
    this.api.getClientes().subscribe((response:any)=>{
      
      this.clientes=response;
      this.listacopiar=response;
      this.datasource.data=this.clientes;
      this.datasource.paginator=this.paginator;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  mostrarcopia(){
    console.log(this.listacopiar)
  }
}
