package com.recetas.recetas_backend.model;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "receta_ingredientes")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class RecetaIngrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "receta_id")
    private Receta receta;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id")
    private Ingrediente ingrediente;
}
