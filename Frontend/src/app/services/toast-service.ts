import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  mensagem = '';
  mostrar = false;

  private timeout: any;

  mostrarToast(mensagem: string) {

    this.mensagem = mensagem;
    this.mostrar = true;

    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      this.mostrar = false;
      this.mensagem = '';
    }, 3000);
  }
}
