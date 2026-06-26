import { RotaMonitoramento } from './pages/rota-monitoramento/rota-monitoramento';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Perfil } from './pages/perfil/perfil';
import { RotasFavoritas } from './pages/rotas-favoritas/rotas-favoritas';
import { SelecaoRota } from './pages/selecao-rota/selecao-rota';
import { Mapa } from './pages/mapa/mapa';
import { Notificacoes } from './pages/notificacoes/notificacoes';
import { HistoricoViagens } from './pages/historico-viagens/historico-viagens';
import { Configuracoes } from './pages/configuracoes/configuracoes';

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
  },
  {
    path: 'rota-monitoramento',
    component: RotaMonitoramento
  },
  {
    path: 'selecao-rota',
    component: SelecaoRota
  },
  {
    path: 'mapa',
    component: Mapa
  },
  {
    path: 'notificacoes',
    component: Notificacoes
  },
  {
    path: 'minhas-viagens',
    component: HistoricoViagens
  },
  {
    path: 'configuracoes',
    component: Configuracoes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
