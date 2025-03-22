package com.recetas.recetas_backend.DTO;

import com.recetas.recetas_backend.model.Receta;

import java.util.List;
import java.util.stream.Collectors;

public class RecetaDTO {
    /*private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private List<String> ingredientes;

    public RecetaDTO() {} // Constructor vacío necesario para la serialización

    public RecetaDTO(Receta receta) {
        this.id = receta.getId();
        this.nombre = receta.getNombre();
        this.descripcion = receta.getDescripcion();
        this.imagen = receta.getImagen();
        this.ingredientes = receta.getReceta_Ingredientes()
                .stream()
                .map(ri -> ri.getIngrediente().getNombre())
                .collect(Collectors.toList());
    }*/
}
