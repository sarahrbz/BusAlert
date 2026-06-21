import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email = '';
  senha = '';

  constructor(
    private auth: Auth,
    private router: Router
  ) {}

  login() {

    const dados: LoginRequest = {
      email: this.email,
      senha: this.senha
    };

    this.auth.login(dados)
      .subscribe({
    next: (response) => {

      localStorage.setItem(
        'usuario',
        JSON.stringify(response)
      );

      this.router.navigate(['/home']);
    },

    error: (error) => {
      alert('Email ou senha inválidos');
    }
  });
  }

  loginGoogle() {

  alert(
    'Login com Google será implementado em versão futura.'
  );

}

loginApple() {

  alert(
    'Login com Apple será implementado em versão futura.'
  );

}
}
