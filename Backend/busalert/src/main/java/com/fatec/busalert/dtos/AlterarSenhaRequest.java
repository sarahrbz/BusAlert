package com.fatec.busalert.dtos;

public record AlterarSenhaRequest(
    String senhaAtual,
    String novaSenha
) {
    
}
