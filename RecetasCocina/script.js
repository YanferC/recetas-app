document.addEventListener("DOMContentLoaded", function () {
    const recetasContainer = document.querySelector(".recetas-container");
    const recetaForm = document.getElementById("receta-form");

    // Función para cargar recetas desde la API
    function cargarRecetas() {
        fetch("http://localhost:8081/api/recetas")
            .then(response => response.json())
            .then(data => {
                recetasContainer.innerHTML = "";
                data.forEach(receta => {
                    const recetaHTML = `
                    <article class="receta">
                        <img src="${receta.imagen}" alt="${receta.nombre}">
                        <h3>${receta.nombre}</h3>
                        <p>${receta.descripcion}</p>
                        <a href="detalle.html?id=${receta.id}">Ver Receta</a>
                    </article>
                `;
                    recetasContainer.innerHTML += recetaHTML;
                });
            })
            .catch(error => console.error("Error al obtener recetas:", error));
    }

    // Cargar recetas al iniciar
    cargarRecetas();

    // Evento para manejar el envío del formulario
    recetaForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar que la página se recargue

        const nuevaReceta = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            imagen: document.getElementById("imagen").value,
            categoria: document.getElementById("categoria").value,
            tiempoPreparacion: parseInt(document.getElementById("tiempo").value)
        };

        // Enviar la receta al backend con una solicitud POST
        fetch("http://localhost:8081/api/recetas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevaReceta)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Receta agregada:", data);
                cargarRecetas(); // Recargar la lista de recetas
                recetaForm.reset(); // Limpiar el formulario
            })
            .catch(error => console.error("Error al agregar receta:", error));
    });
});



/*
fetch("http://localhost:8080/api/recetas")
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error("Error al obtener recetas:", error));*/


// URL base de tu backend
const API_URL = 'http://localhost:8081/api/auth';

// Mostrar/ocultar formularios de login y registro
document.getElementById('showRegister').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function (e) {
    e.preventDefault();
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginContainer').style.display = 'block';
});

// Manejar el formulario de login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(response => response.json()) // Parsear la respuesta como JSON
        .then(data => {
            alert(data.mensaje); // Mostrar el mensaje del backend
            if (data.mensaje === "Login exitoso") {
                window.location.href = 'index.html'; // Redirigir a la página de recetas
            }
        })
        .catch(error => console.error('Error:', error));
});

// Manejar el formulario de registro
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;

    fetch('http://localhost:8081/api/auth/registro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password }),
    })
        .then(response => response.json()) // Parsear la respuesta como JSON
        .then(data => {
            alert(data.mensaje); // Mostrar el mensaje del backend
            if (data.mensaje === "Usuario registrado exitosamente") {
                document.getElementById('registerContainer').style.display = 'none';
                document.getElementById('loginContainer').style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
});