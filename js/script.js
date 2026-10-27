
const { DateTime } = luxon;

// Seleccionar los elementos del HTML
const formulario = document.getElementById("formularioEdad");
const campoFecha = document.getElementById("fechaNacimiento");
const resultado = document.getElementById("resultado");

// Obtener la fecha actual
const hoy = DateTime.now().startOf("day");

// Crear el calendario personalizado
flatpickr(campoFecha, {
    dateFormat: "d/m/Y",
    maxDate: "today",
    allowInput: false,
    disableMobile: true
});

// Escuchar el envío del formulario
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // Obtener la fecha escrita o seleccionada
    const fechaTexto = campoFecha.value;

    // Convertir el texto en una fecha usando Luxon
    const nacimiento = DateTime.fromFormat(
        fechaTexto,
        "dd/MM/yyyy"
    ).startOf("day");

    // Validar la fecha
    if (
        fechaTexto === "" ||
        !nacimiento.isValid ||
        nacimiento > hoy
    ) {
        resultado.textContent =
            "Por favor, selecciona una fecha de nacimiento válida.";
        resultado.className = "error";
        return;
    }

    // Calcular la diferencia entre las fechas
    const edad = hoy.diff(nacimiento, [
        "years",
        "months",
        "days"
    ]).toObject();

    // Obtener los años, meses y días completos
    const anios = Math.floor(edad.years);
    const meses = Math.floor(edad.months);
    const dias = Math.floor(edad.days);

    // Mostrar el resultado
    resultado.className = "";

    resultado.innerHTML = `
        You are <strong>${anios} years,
        ${meses} months and ${dias} days</strong> old
    `;
});
