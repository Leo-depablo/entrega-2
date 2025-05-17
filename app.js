const coordenadaFija = [21.426868801769462, 39.84303394569408];

function gradosARadianes(grados) {
  return (grados * Math.PI) / 180;
}

function calcularDistancia(coord1, coord2) {
  const R = 6371;
  const dLat = gradosARadianes(coord2[0] - coord1[0]);
  const dLon = gradosARadianes(coord2[1] - coord1[1]);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(gradosARadianes(coord1[0])) *
      Math.cos(gradosARadianes(coord2[0])) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Capturar formulario y resultado
const form = document.getElementById("formCoordenadas");
const resultadoDiv = document.getElementById("resultado");
const ayudaBtn = document.getElementById("ayuda");

// Evento para mostrar ayuda
ayudaBtn.addEventListener("click", () => {
  window.open("https://www.google.com/maps", "_blank");
});

// Evento para calcular la distancia
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const latitud = parseFloat(document.getElementById("latitud").value);
  const longitud = parseFloat(document.getElementById("longitud").value);

  const coordUsuario = [latitud, longitud];
  const distancia = calcularDistancia(coordenadaFija, coordUsuario);

  // Mostrar resultado
  resultadoDiv.innerText = `La distancia hasta la mezquita es de ${distancia.toFixed(
    2
  )} km.`;

  // Guardar en localStorage
  const datos = {
    latitud,
    longitud,
    distancia: distancia.toFixed(2),
    fecha: new Date().toLocaleString(),
  };
  localStorage.setItem("ultimaConsulta", JSON.stringify(datos));
});

// Mostrar última distancia si existe
window.addEventListener("DOMContentLoaded", () => {
  const datosGuardados = localStorage.getItem("ultimaConsulta");
  if (datosGuardados) {
    const datos = JSON.parse(datosGuardados);
    resultadoDiv.innerText = `Última distancia calculada: ${datos.distancia} km (el ${datos.fecha})`;
  }
});
