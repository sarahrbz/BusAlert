import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-perfil',
  standalone: false,
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit{
  usuario: any;
  toastTimeout: any;

  editandoPerfil = false;
  alterandoSenha = false;

senhaAtual = '';
novaSenha = '';
confirmarSenha = '';

mensagemToast = '';
mostrarToast = false;

exibirToast(mensagem: string) {
  this.mensagemToast = mensagem;
  this.mostrarToast = true;

  if (this.toastTimeout) {
    clearTimeout(this.toastTimeout);
  }

  this.toastTimeout = setTimeout(() => {
    this.mostrarToast = false;
    this.mensagemToast = '';

    this.cdr.detectChanges();
  }, 3000);
}



  constructor( private router: Router, private usuarioService: Auth, private cdr: ChangeDetectorRef){}


  alterarSenha() {
  if (this.novaSenha !== this.confirmarSenha) {
    this.exibirToast('As senhas não coincidem.');
    return;
  }

  const dados = {
    senhaAtual: this.senhaAtual,
    novaSenha: this.novaSenha
  };



  this.usuarioService
    .alterarSenha(this.usuario.id, dados)
    .subscribe({
      next: () => {
        this.exibirToast('Senha alterada com sucesso!');

        this.senhaAtual = '';
        this.novaSenha = '';
        this.confirmarSenha = '';
        this.alterandoSenha = false;

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);

  this.exibirToast(
    error.error?.message ||
    error.error?.error ||
    'Não foi possível alterar a senha.'
  );
      }
    });
}

  ngOnInit(): void {
    const usuarioSalvo = localStorage.getItem('usuario');

    if (usuarioSalvo){
      this.usuario= JSON.parse(usuarioSalvo);
    }
  }

  salvarPerfil(){
    localStorage.setItem(
      'usuarioPerfil',
      JSON.stringify(this.usuario)
    );
    this.editandoPerfil = false;
    this.exibirToast('Perfil atualizado com sucesso!');
  }

  logout(){
    localStorage.removeItem('usuario');

    this.router.navigate(['/login'])
  }


}
