package com.recetas.recetas_backend.model;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "recetas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre",nullable = false)
    private String nombre;

    @Column(name="descripcion", columnDefinition = "TEXT")
    private String descripcion;
    @Column(name="imagen")
    private String imagen;
    @Column(name="categoria")
    private String categoria;
    @Column(name="tiempoPreparacion")
    private Integer tiempoPreparacion;

    /*@OneToMany(mappedBy = "receta",  fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<RecetaIngrediente> receta_Ingredientes;*/


}
