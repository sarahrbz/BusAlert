package com.fatec.busalert.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.busalert.dtos.UsuarioRequest;
import com.fatec.busalert.dtos.UsuarioResponse;
import com.fatec.busalert.services.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioResponse> cadastrar( @RequestBody UsuarioRequest request){
        
        UsuarioResponse response = service.cadastrar(request);

        return ResponseEntity.ok(response);
    }
}
