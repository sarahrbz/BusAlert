import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit{
  usuario: any;

  constructor( private router: Router){}
  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo){
      this.usuario= JSON.parse(usuarioSalvo);
    }
  }

  logout(){
    localStorage.removeItem('usuario');

    this.router.navigate(['/login'])
  }


}
