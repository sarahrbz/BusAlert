import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  standalone: false,
  templateUrl: './recuperar-senha.html',
  styleUrl: './recuperar-senha.css',
})
export class RecuperarSenha {
  email = '';

  constructor(private router: Router) {}

enviar() {
  if(!this.email.trim()){
    alert('Por favor, informe um e-mail.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(this.email)) {
    alert('Informe um e-mail válido.');
    return;
  }
  alert(`Link enviado para ${this.email}`);

  setTimeout(() => {
    this.router.navigate(['/login']);
  }, 2000);
}
}
