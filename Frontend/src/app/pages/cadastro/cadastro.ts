import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { UsuarioRequest } from '../../models/usuario-request';

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



  constructor(private auth: Auth) {}

  cadastrar() {

    const usuario: UsuarioRequest = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      senha: this.senha
    };

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }

    this.auth.cadastrar(usuario)
      .subscribe({
        next: (response) => {
          console.log('Usuário cadastrado:', response);
          alert('Cadastro realizado com sucesso!');
        },

        error: (error) => {
          console.error(error);
          alert('Erro ao cadastrar usuário');
        }
      });
  }
}
