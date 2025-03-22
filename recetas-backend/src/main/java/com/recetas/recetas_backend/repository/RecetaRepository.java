package com.recetas.recetas_backend.repository;

import com.recetas.recetas_backend.model.Receta;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecetaRepository extends JpaRepository<Receta, Long> {
    //@EntityGraph(attributePaths = {"recetaIngredientes", "recetaIngredientes.ingrediente"})
    /*@Query("SELECT r FROM Receta r JOIN FETCH r.receta_Ingredientes ri JOIN FETCH ri.ingrediente")
    List<Receta> findAllWithIngredientes();*/

}
