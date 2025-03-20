document.addEventListener("DOMContentLoaded", function () {
    const recetaId = new URLSearchParams(window.location.search).get("id");
    const recetaContainer = document.getElementById("receta-detalle");
    const eliminarBtn = document.getElementById("eliminar-receta");
    const calificarForm = document.getElementById("calificar-form");
    const comentariosContainer = document.getElementById("comentarios");

    if (!recetaId) {
        recetaContainer.innerHTML = "<p>Error: No se encontró la receta.</p>";
        return;
    }

    // Función para cargar detalles de la receta
    function cargarReceta() {
        fetch(`http://localhost:8081/api/recetas/${recetaId}`)
            .then(response => response.json())
            .then(receta => {
                recetaContainer.innerHTML = `
                    <h2>${receta.nombre}</h2>
                    <img src="${receta.imagen}" alt="${receta.nombre}" class="img-fluid">
                    <p><strong>Categoría:</strong> ${receta.categoria}</p>
                    <p><strong>Tiempo de preparación:</strong> ${receta.tiempoPreparacion} min</p>
                    <h3>Ingredientes</h3>
                    <ul>${receta.ingredientes.map(ing => `<li>${ing}</li>`).join("")}</ul>
                    <h3>Preparación</h3>
                    <p>${receta.pasos}</p>
                `;
                cargarComentarios();
            })
            .catch(error => {
                console.error("Error al obtener receta:", error);
                recetaContainer.innerHTML = "<p>Error al cargar la receta.</p>";
            });
    }

    // Función para eliminar receta
    eliminarBtn.addEventListener("click", function () {
        if (confirm("¿Seguro que quieres eliminar esta receta?")) {
            fetch(`http://localhost:8081/api/recetas/${recetaId}`, { method: "DELETE" })
                .then(response => {
                    if (response.ok) {
                        alert("Receta eliminada con éxito.");
                        window.location.href = "index.html";
                    } else {
                        alert("Error al eliminar la receta.");
                    }
                })
                .catch(error => console.error("Error al eliminar receta:", error));
        }
    });

    // Función para cargar comentarios
    function cargarComentarios() {
        fetch(`http://localhost:8081/api/recetas/${recetaId}/comentarios`)
            .then(response => response.json())
            .then(comentarios => {
                comentariosContainer.innerHTML = comentarios.length > 0
                    ? comentarios.map(com => `<p><strong>${com.usuario}:</strong> ${com.texto}</p>`).join("")
                    : "<p>No hay comentarios aún.</p>";
            })
            .catch(error => console.error("Error al cargar comentarios:", error));
    }

    // Función para calificar receta
    calificarForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const puntuacion = document.getElementById("puntuacion").value;
        const comentario = document.getElementById("comentario").value;

        const nuevaCalificacion = {
            recetaId,
            puntuacion: parseInt(puntuacion),
            texto: comentario
        };

        fetch(`http://localhost:8081/api/recetas/${recetaId}/comentarios`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaCalificacion)
        })
            .then(response => response.json())
            .then(() => {
                alert("¡Gracias por tu comentario!");
                cargarComentarios();
                calificarForm.reset();
            })
            .catch(error => console.error("Error al enviar calificación:", error));
    });

    // Cargar la receta al iniciar
    cargarReceta();
});
