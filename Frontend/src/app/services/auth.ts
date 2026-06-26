import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { UsuarioRequest } from '../models/usuario-request';
import { UsuarioResponse } from '../models/usuario-response';
import { LoginRequest } from '../models/login-request';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  cadastrar(usuario: UsuarioRequest) {
    return this.http.post<UsuarioResponse>(
      this.apiUrl,
      usuario
    );
  }

  login(login: LoginRequest) {
    return this.http.post<UsuarioResponse>(
      `${this.apiUrl}/login`,
      login
    );
  }

  alterarSenha(id: number, dados: any) {
  return this.http.put(
    `http://localhost:8080/usuarios/${id}/senha`,
    dados
  );
}
}
