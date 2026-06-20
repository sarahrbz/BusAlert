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
  senha = '';

  constructor(private auth: Auth) {}

  cadastrar() {

    const usuario: UsuarioRequest = {
      nome: this.nome,
      email: this.email,
      senha: this.senha
    };

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
