document.addEventListener("DOMContentLoaded", function () {
    const recetasContainer = document.querySelector(".recetas-container");

    fetch("http://localhost:8081/api/recetas")
        .then(response => response.json())
        .then(data => {
            recetasContainer.innerHTML = "";
            data.forEach(receta => {
                const recetaHTML = `
                    <article class="receta">
                        <img src="img/${receta.imagen}" alt="${receta.nombre}">
                        <h3>${receta.nombre}</h3>
                        <p>${receta.descripcion}</p>
                        <a href="detalle.html?id=${receta.id}">Ver Receta</a>
                    </article>
                `;
                recetasContainer.innerHTML += recetaHTML;
            });
        })
        .catch(error => console.error("Error al obtener recetas:", error));
});



/*
fetch("http://localhost:8080/api/recetas")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error al obtener recetas:", error));*/
