import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { UsuarioRequest } from '../../models/usuario-request';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';



  constructor(private auth: Auth, private router: Router, private toast: ToastService) {}

  cadastrar() {

    const usuario: UsuarioRequest = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    if (this.senha !== this.confirmarSenha) {
      this.toast.mostrarToast('As senhas não coincidem');
      return;
    }

    if(!this.email.trim()){
      this.toast.mostrarToast('Por favor, informe um e-mail.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.email)) {
      this.toast.mostrarToast('Informe um e-mail válido.');
      return;
    }

    this.auth.cadastrar(usuario)
      .subscribe({
        next: (response) => {

          this.toast.mostrarToast('Cadastro realizado com sucesso!');
        },

        error: (error) => {
          console.error(error);
          this.toast.mostrarToast('Erro ao cadastrar usuário');
        }
      });

      setTimeout(() => {
    this.router.navigate(['/login']);
  }, 2000);
  }

  loginGoogle() {

  this.toast.mostrarToast(
    'Cadastro com Google será implementado em versão futura.'
  );

}

loginApple() {

  this.toast.mostrarToast(
    'Cadastro com Apple será implementado em versão futura.'
  );

}
}
