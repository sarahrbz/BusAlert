package com.fatec.busalert.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fatec.busalert.dtos.LoginRequest;
import com.fatec.busalert.dtos.UsuarioRequest;
import com.fatec.busalert.dtos.UsuarioResponse;
import com.fatec.busalert.services.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService service;

    @PostMapping
    public ResponseEntity<UsuarioResponse> cadastrar(@Valid @RequestBody UsuarioRequest request){
        
        UsuarioResponse response = service.cadastrar(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UsuarioResponse> login(@Valid @RequestBody LoginRequest request){
        UsuarioResponse response = service.login(request);

        return ResponseEntity.ok(response);
    }
}
