package com.recetas.recetas_backend.controller;

import com.recetas.recetas_backend.model.Receta;
import com.recetas.recetas_backend.repository.RecetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recetas")
@CrossOrigin(origins = "*")
public class RecetaController {
    @Autowired
    private RecetaRepository recetaRepository;

    @GetMapping
    public List<Receta> getAllRecetas() {
        return recetaRepository.findAll();
    }

    @PostMapping
    public Receta createReceta(@RequestBody Receta receta) {
        return recetaRepository.save(receta);
    }
}
