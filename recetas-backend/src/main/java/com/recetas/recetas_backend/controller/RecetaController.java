package com.recetas.recetas_backend.controller;

import com.recetas.recetas_backend.DTO.RecetaDTO;
import com.recetas.recetas_backend.model.Receta;
import com.recetas.recetas_backend.repository.RecetaRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

import java.util.*;
import java.util.stream.Collectors;

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
    /*@GetMapping
    public List<RecetaDTO> getAllRecetas() {
        return recetaRepository.findAllWithIngredientes()
                .stream()
                .map(RecetaDTO::new)
                .toList();
    }*/

    @PostMapping
    public Receta createReceta(@RequestBody Receta receta) {
        return recetaRepository.save(receta);
    }


    /*@Transactional
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> obtenerRecetaPorId(@PathVariable Long id) {
        return recetaRepository.findById(id).map(receta -> {
            Map<String, Object> response = new HashMap<>();
            response.put("id", receta.getId());
            response.put("nombre", receta.getNombre());
            response.put("descripcion", receta.getDescripcion());
            response.put("imagen", receta.getImagen());
            response.put("categoria", receta.getCategoria());
            response.put("tiempoPreparacion", receta.getTiempoPreparacion());

            // Convertir lista de ingredientes a JSON
            List<Map<String, Object>> ingredientes = receta.getReceta_Ingredientes().stream().map(ri -> {
                Map<String, Object> ingredienteMap = new HashMap<>();
                ingredienteMap.put("nombre", ri.getIngrediente().getNombre());
                ingredienteMap.put("cantidad", ri.getIngrediente().getCantidad());
                ingredienteMap.put("unidad", ri.getIngrediente().getUnidadMedida());
                return ingredienteMap;
            }).collect(Collectors.toList());

            response.put("ingredientes", ingredientes);
            return ResponseEntity.ok(response);
        }).orElse(ResponseEntity.notFound().build());
    }*/

}
