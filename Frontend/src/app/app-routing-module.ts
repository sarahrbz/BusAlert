import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Perfil } from './pages/perfil/perfil';
import { RotasFavoritas } from './pages/rotas-favoritas/rotas-favoritas';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'cadastro',
    component: Cadastro
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'recuperar-senha',
    component: RecuperarSenha
  },
  {
    path: 'perfil',
    component: Perfil
  },
  {
    path: 'rotas-favoritas',
    component: RotasFavoritas
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
