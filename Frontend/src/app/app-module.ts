import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Cadastro } from './pages/cadastro/cadastro';
import { Home } from './pages/home/home';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RecuperarSenha } from './pages/recuperar-senha/recuperar-senha';
import { Perfil } from './pages/perfil/perfil';
import { Navbar } from './components/navbar/navbar';
import { RotasFavoritas } from './pages/rotas-favoritas/rotas-favoritas';
import { RotaMonitoramento } from './pages/rota-monitoramento/rota-monitoramento';
import { SelecaoRota } from './pages/selecao-rota/selecao-rota';

@NgModule({
  declarations: [
    App,
    Login,
    Cadastro,
    Home,
    RecuperarSenha,
    Perfil,
    Navbar,
    RotasFavoritas,
    RotaMonitoramento,
    SelecaoRota,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
