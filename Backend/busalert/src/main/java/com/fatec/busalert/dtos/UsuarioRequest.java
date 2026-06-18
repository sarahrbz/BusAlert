package com.fatec.busalert.dtos;

public record UsuarioRequest(
    String nome,
    String email,
    String senha
) {
    
}
