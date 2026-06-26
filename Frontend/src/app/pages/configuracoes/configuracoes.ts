import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  standalone: false,
  templateUrl: './configuracoes.html',
  styleUrl: './configuracoes.css',
})
export class Configuracoes implements OnInit{
  alerta5km = true;
  alerta3km = true;
  alerta500m = true;

  somNotificacao = true;
  vibracao = true;
  localizacaoPermitida = false;

verificarPermissaoLocalizacao() {
  navigator.permissions
    .query({ name: 'geolocation' as PermissionName })
    .then((result) => {
      this.localizacaoPermitida =
        result.state === 'granted';
    });
}

  ngOnInit(): void {
    const config = localStorage.getItem('configAlertas');

    if (config) {
      const dados = JSON.parse(config);

      this.alerta5km = dados.alerta5km;
      this.alerta3km = dados.alerta3km;
      this.alerta500m = dados.alerta500m;
      this.somNotificacao = dados.somNotificacao;
      this.vibracao = dados.vibracao;
    }

    this.verificarPermissaoLocalizacao();
  }

  salvarConfiguracoes() {
    localStorage.setItem(
      'configAlertas',
      JSON.stringify({
        alerta5km: this.alerta5km,
        alerta3km: this.alerta3km,
        alerta500m: this.alerta500m,
        somNotificacao: this.somNotificacao,
        vibracao: this.vibracao
      })
    );
  }
}
