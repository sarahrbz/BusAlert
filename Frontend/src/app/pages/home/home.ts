import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{

   usuario: any;

  ngOnInit(): void {
    const usuarioSalvo =
      localStorage.getItem('usuario');

    if (usuarioSalvo) {
      this.usuario = JSON.parse(usuarioSalvo);
    }
  }
}
