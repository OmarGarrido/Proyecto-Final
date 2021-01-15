import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrudComponent } from './component/crud/crud.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegistroComponent } from './component/registro/registro.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path:'home',component:HomeComponent},
  {path:'crud',component:CrudComponent},
  {path:'**',pathMatch:'full',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
