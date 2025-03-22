document.addEventListener("DOMContentLoaded", () => {
    // 1️⃣ Obtener el ID de la receta desde la URL
    const params = new URLSearchParams(window.location.search);
    const recetaId = params.get("id");

    if (!recetaId) {
        alert("No se encontró el ID de la receta.");
        return;
    }

    // 2️⃣ Hacer una petición a la API para obtener los detalles de la receta
    fetch(`http://localhost:8081/api/recetas/${recetaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("No se pudo obtener la receta.");
            }
            return response.json();
        })
        .then(data => {
            // 3️⃣ Rellenar los elementos del HTML con la información de la receta
            document.getElementById("nombre-receta").textContent = data.nombre;
            document.getElementById("imagen-receta").src = data.imagen;
            document.getElementById("lista-ingredientes").innerHTML = data.ingredientes
                .map(ing => `<li>${ing.cantidad} ${ing.unidad} de ${ing.nombre}</li>`)
                .join("");

            // Aquí puedes agregar la lógica para los pasos de preparación si los tienes en la API
            // document.getElementById("lista-pasos").innerHTML = data.pasos.map(paso => `<li>${paso}</li>`).join("");
        })
        .catch(error => {
            console.error("Error al cargar la receta:", error);
            alert("Hubo un problema al cargar la receta.");
        });
});
