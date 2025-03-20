package com.recetas.recetas_backend.controller;

import com.recetas.recetas_backend.model.LoginRequest;
import com.recetas.recetas_backend.model.Usuario;
import com.recetas.recetas_backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrarUsuario(@RequestBody Usuario usuario) {
        Map<String, String> response = new HashMap<>();
        if (usuarioService.buscarPorEmail(usuario.getEmail()).isPresent()) {
            response.put("mensaje", "El email ya está registrado");
            return ResponseEntity.badRequest().body(response);
        }
        usuarioService.registrarUsuario(usuario);
        response.put("mensaje", "Usuario registrado exitosamente");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();
        Optional<Usuario> usuario = usuarioService.buscarPorEmail(loginRequest.getEmail());
        if (usuario.isPresent() && usuarioService.verificarPassword(loginRequest.getPassword(), usuario.get().getPassword())) {
            response.put("mensaje", "Login exitoso");
            return ResponseEntity.ok(response);
        }
        response.put("mensaje", "Credenciales inválidas");
        return ResponseEntity.badRequest().body(response);
    }
}