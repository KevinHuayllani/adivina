// Variables globales
let numeroAleatorio = Math.floor(Math.random() * 10) + 1;
let intentos = parseInt(localStorage.getItem("intentos")) || 0;
let juegoTerminado = localStorage.getItem("juegoTerminado") === "true";

// Mostrar intentos previos si existen
document.getElementById("contadorIntentos").innerText = intentos;

// Si el juego ya se ganó, mostrar pantalla de error
if (juegoTerminado) {
    mostrarError();
}

function verificarNumero() {
    if (juegoTerminado) return;

    let numeroUsuario = parseInt(document.getElementById("numero").value);
    let mensaje = document.getElementById("mensaje");
    let contadorIntentos = document.getElementById("contadorIntentos");

    // Validación de entrada
    if (numeroUsuario < 1 || numeroUsuario > 10 || isNaN(numeroUsuario)) {
        mensaje.innerHTML = `⚠️ Ingresa un número válido entre 1 y 10.`;
        return;
    }

    // Incrementar intentos y actualizar en pantalla
    intentos++;
    localStorage.setItem("intentos", intentos);
    contadorIntentos.innerText = intentos;

    if (numeroUsuario === numeroAleatorio) {
        // Guardamos el estado del juego
        localStorage.setItem("juegoTerminado", "true");
        localStorage.setItem("intentos", intentos);

        // Mostramos mensaje de victoria antes de la transición
        mensaje.innerHTML = `🎉 ¡Ganaste! Adivinaste el número ${numeroAleatorio}`;
        mensaje.classList.add("fade-in");

        // Después de 2 segundos, el mensaje desaparece y se muestra el error
        setTimeout(() => {
            mensaje.classList.add("fade-out");

            setTimeout(() => {
                mostrarError();
            }, 1500); // 1.5 segundos después de que desaparezca el mensaje
        }, 2000);
    } else {
        mensaje.innerHTML = `❌ Número incorrecto. Intento #${intentos}`;
    }
}

function mostrarError() {
    let gameContainer = document.getElementById("gameContainer");
    let errorMessage = document.getElementById("errorMessage");

    // Aplicar efecto de desvanecimiento lento
    gameContainer.classList.add("fade-out");

    setTimeout(() => {
        gameContainer.style.display = "none";
        errorMessage.style.display = "block";
        errorMessage.classList.add("fade-in");
        document.getElementById("contadorFinalIntentos").innerText = localStorage.getItem("intentos");
    }, 1000); // 2 segundos después de que el mensaje de victoria desaparezca

    // Evitar recarga de página con F5 o Ctrl+R
    window.addEventListener("keydown", function (e) {
        if (e.key === "F5" || (e.ctrlKey && e.key === "r")) {
            e.preventDefault();
        }
    });

    document.querySelector(".reload-btn").style.cursor = "not-allowed";
}

// Evitar clic derecho
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});
