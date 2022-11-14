import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleClientesComponent } from './components/detalle-clientes/detalle-clientes.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {
  path:"",component:PrincipalComponent
  },
  {
    path:"cliente/:cedula",component:DetalleClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
