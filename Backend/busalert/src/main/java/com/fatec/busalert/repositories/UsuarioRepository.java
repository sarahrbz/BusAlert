package com.fatec.busalert.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fatec.busalert.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);
}
