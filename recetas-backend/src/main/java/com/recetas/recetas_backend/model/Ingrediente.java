package com.recetas.recetas_backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "ingredientes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Ingrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nombre",nullable = false)
    private String nombre;
    @Column(name="cantidad")
    private double cantidad;
    @Column(name="unidadMedida")
    private String unidadMedida;

    @OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL)
    private List<RecetaIngrediente> recetaIngredientes;

}
