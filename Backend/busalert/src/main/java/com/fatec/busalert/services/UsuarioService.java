package com.fatec.busalert.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fatec.busalert.dtos.UsuarioRequest;
import com.fatec.busalert.dtos.UsuarioResponse;
import com.fatec.busalert.entities.Usuario;
import com.fatec.busalert.repositories.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository repository;


    public UsuarioResponse cadastrar(UsuarioRequest request){
        
        if (repository.findByEmail(request.email()).isPresent()) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        Usuario usuario = new Usuario();

        usuario.setNome(request.nome());
        usuario.setEmail(request.email());
        usuario.setSenha(request.senha());

        Usuario usuarioSalvo = repository.save(usuario);

        return new UsuarioResponse(
                usuarioSalvo.getId(),
                usuarioSalvo.getNome(),
                usuarioSalvo.getEmail()
        );

    }
    
}
