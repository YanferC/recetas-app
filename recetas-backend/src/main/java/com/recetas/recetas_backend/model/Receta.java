package com.recetas.recetas_backend.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "recetas")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Receta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    private String imagen;
    private String categoria;
    private Integer tiempoPreparacion;
}
