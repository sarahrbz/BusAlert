import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import * as L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: ''
});
@Component({
  selector: 'app-rota-monitoramento',
  standalone: false,
  templateUrl: './rota-monitoramento.html',
  styleUrl: './rota-monitoramento.css',
})
export class RotaMonitoramento implements OnInit {

  rotaSelecionada: any;

  map: any;
  busMarker: any;
  destinationMarker: any;
  rotaPolyline: any;

  indiceAtual = 0;
  destino: any;

  simulacaoAtiva = false;
  viagemFinalizada = false;
  intervaloSimulacao?: any;

  distanciaRestante = 0;
  progressoViagem = 0;

  statusViagem = 'Aguardando início da viagem';
  proximoAlerta = '5 km';
  alertaAtual = '';
  mostrarAlerta = false;

  alerta5kmEmitido = false;
  alerta3kmEmitido = false;
  alerta500mEmitido = false;

  configAlertas = {
  alerta5km: true,
  alerta3km: true,
  alerta500m: true,
  somNotificacao: true,
  vibracao: true
};

  busIcon = L.divIcon({
    html: '<i class="fas fa-bus"></i>',
    className: 'bus-map-icon',
    iconSize: [38, 38],
    iconAnchor: [19, 19]
  });

  destinationIcon = L.divIcon({
    html: '<i class="fas fa-location-dot"></i>',
    className: 'destination-map-icon',
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  constructor(
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    const config = localStorage.getItem('configAlertas');

if (config) {
  this.configAlertas = JSON.parse(config);
}

    const rota =
      localStorage.getItem('rotaSelecionada');

    if (rota) {

      this.rotaSelecionada =
        JSON.parse(rota);


      this.buscarPercursoReal();
    }

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
  buscarPercursoReal() {

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${this.rotaSelecionada.origemLng},${this.rotaSelecionada.origemLat};` +
      `${this.rotaSelecionada.destinoLng},${this.rotaSelecionada.destinoLat}` +
      `?overview=full&geometries=geojson`;

    console.log(url);
    this.http.get<any>(url).subscribe({

      next: (res) => {
        console.log(res);
        console.log(res.routes[0]);
        console.log(res.routes[0].geometry.coordinates.length);
        const coordenadas =
          res.routes[0].geometry.coordinates;

        this.rotaSelecionada.percurso =
          coordenadas.map((coord: any) => {
            return {
              lat: coord[1],
              lng: coord[0]
            };
          });

        this.prepararRota();

        setTimeout(() => {
          this.inicializarMapa();
        }, 100);
      },

      error: () => {
        alert('Não foi possível carregar o trajeto real.');
      }
    });
  }

  prepararRota() {

    this.indiceAtual = 0;

    this.destino =
      this.rotaSelecionada.percurso[
      this.rotaSelecionada.percurso.length - 1
      ];

    const inicio =
      this.rotaSelecionada.percurso[0];

    this.distanciaRestante =
      this.calcularDistanciaRestantePercurso();

    this.progressoViagem = 0;
    this.statusViagem = 'Aguardando início da viagem';
    this.proximoAlerta = '5 km';
    this.alertaAtual = '';

    this.alerta5kmEmitido = false;
    this.alerta3kmEmitido = false;
    this.alerta500mEmitido = false;
  }

  inicializarMapa() {

    const inicio =
      this.rotaSelecionada.percurso[0];

    this.map =
      L.map('map').setView(
        [inicio.lat, inicio.lng],
        14
      );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap'
      }
    ).addTo(this.map);

    const pontos =
      this.rotaSelecionada.percurso.map(
        (ponto: any) => [ponto.lat, ponto.lng]
      );

    this.rotaPolyline =
      L.polyline(
        pontos,
        {
          color: '#5e72ff',
          weight: 5
        }
      ).addTo(this.map);

    this.busMarker =
      L.marker(
        [inicio.lat, inicio.lng],
        {
          icon: this.busIcon
        }
      ).addTo(this.map);

    this.destinationMarker =
      L.marker(
        [this.destino.lat, this.destino.lng],
        {
          icon: this.destinationIcon
        }
      ).addTo(this.map);

    this.map.fitBounds(
      this.rotaPolyline.getBounds(),
      {
        padding: [30, 30]
      }
    );
  }

  iniciarSimulacao() {

    if (this.simulacaoAtiva) {
      return;
    }

    this.simulacaoAtiva = true;
    this.viagemFinalizada = false;

    this.statusViagem =
      'Ônibus em deslocamento';

    this.intervaloSimulacao =
      setInterval(() => {

        this.indiceAtual++;

        if (
          this.indiceAtual >=
          this.rotaSelecionada.percurso.length
        ) {

          this.finalizarViagem();
          return;
        }

        const pontoAtual =
          this.rotaSelecionada.percurso[
          this.indiceAtual
          ];

        this.atualizarPosicaoOnibus(
          pontoAtual
        );

        this.distanciaRestante =
          this.calcularDistanciaRestantePercurso();

        this.atualizarProgresso();

        this.atualizarStatus();

        this.verificarAlertas();

        this.cdr.detectChanges();

      }, 2000);
  }

  atualizarPosicaoOnibus(pontoAtual: any) {

    this.busMarker.setLatLng([
      pontoAtual.lat,
      pontoAtual.lng
    ]);

    this.map.panTo([
      pontoAtual.lat,
      pontoAtual.lng
    ]);
  }

  atualizarDistancia(pontoAtual: any) {

    this.distanciaRestante =
      this.calcularDistancia(
        pontoAtual.lat,
        pontoAtual.lng,
        this.destino.lat,
        this.destino.lng
      );
  }

  atualizarProgresso() {

    this.progressoViagem =
      (
        this.indiceAtual /
        (this.rotaSelecionada.percurso.length - 1)
      ) * 100;
  }

  atualizarStatus() {

    if (this.distanciaRestante > 5) {

      this.statusViagem =
        'Ônibus em deslocamento';

      this.proximoAlerta =
        '5 km';

    } else if (this.distanciaRestante > 3) {

      this.statusViagem =
        'Prepare-se, sua parada está se aproximando';

      this.proximoAlerta =
        '3 km';

    } else if (this.distanciaRestante > 0.5) {

      this.statusViagem =
        'Fique atento, sua parada está próxima';

      this.proximoAlerta =
        '500 m';

    } else if (this.distanciaRestante > 0) {

      this.statusViagem =
        'Sua parada está chegando!';

      this.proximoAlerta =
        'agora';
    }
  }

  verificarAlertas() {

    if (this.configAlertas.alerta5km &&
      this.distanciaRestante <= 5 &&
      !this.alerta5kmEmitido
    ) {

      this.alerta5kmEmitido = true;

      this.alertaAtual =
        'Sua parada está a aproximadamente 5 km.';
      this.mostrarAlerta = true;

      this.mostrarNotificacao(
        'BusAlert',
        this.alertaAtual
      );
    }

    if ( this.configAlertas.alerta3km &&
      this.distanciaRestante <= 3 &&
      !this.alerta3kmEmitido
    ) {

      this.alerta3kmEmitido = true;

      this.alertaAtual =
        'Sua parada está a aproximadamente 3 km.';
        this.mostrarAlerta = true;

      this.mostrarNotificacao(
        'BusAlert',
        this.alertaAtual
      );
    }

    if ( this.configAlertas.alerta500m &&
      this.distanciaRestante <= 0.5 &&
      !this.alerta500mEmitido
    ) {

      this.alerta500mEmitido = true;

      this.alertaAtual =
        'Sua parada está muito próxima. Prepare-se para descer!';
          this.mostrarAlerta = true;
      this.mostrarNotificacao(
        'BusAlert',
        this.alertaAtual
      );
    }
  }

  fecharAlerta() {

    this.mostrarAlerta = false;

  }

  finalizarViagem() {

    this.simulacaoAtiva = false;
    this.viagemFinalizada = true;

    this.distanciaRestante = 0;
    this.progressoViagem = 100;

    this.statusViagem =
      'Você chegou ao destino';

    this.proximoAlerta =
      'finalizado';

    this.alertaAtual =
      'Você chegou ao seu destino.';

    if (this.intervaloSimulacao) {
      clearInterval(this.intervaloSimulacao);
    }

    this.mostrarNotificacao(
      'BusAlert',
      'Você chegou ao destino.'
    );

    this.cdr.detectChanges();
  }

  mostrarNotificacao(
    titulo: string,
    mensagem: string
  ) {

    if (
      'Notification' in window &&
      Notification.permission === 'granted'
    ) {

      new Notification(
        titulo,
        {
          body: mensagem
        }
      );
    }
  }

  calcularDistancia(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {

    const R = 6371;

    const dLat =
      (lat2 - lat1) * Math.PI / 180;

    const dLon =
      (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) *
      Math.sin(dLat / 2) +

      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *

      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c =
      2 * Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return R * c;
  }

  calcularDistanciaRestantePercurso(): number {

    let distancia = 0;

    for (
      let i = this.indiceAtual;
      i < this.rotaSelecionada.percurso.length - 1;
      i++
    ) {

      const atual =
        this.rotaSelecionada.percurso[i];

      const proximo =
        this.rotaSelecionada.percurso[i + 1];

      distancia += this.calcularDistancia(
        atual.lat,
        atual.lng,
        proximo.lat,
        proximo.lng
      );
    }

    return distancia;
  }

}
