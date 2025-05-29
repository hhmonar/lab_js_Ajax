// script.js
window.onload = () => {
  document.getElementById('url').value = window.location.href;
};

function mostrarSeccion(id) {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function volver() {
  document.querySelectorAll('.seccion').forEach(sec => sec.classList.add('hidden'));
}

function limpiarEntrada(inputId, outputId) {
  document.getElementById(inputId).value = "";
  const salida = document.getElementById(outputId);
  salida.innerText = "";
  salida.style.color = "";
}

function limpiarEntradaMultiple(inputIds, outputId) {
  inputIds.forEach(id => document.getElementById(id).value = "");
  const salida = document.getElementById(outputId);
  salida.innerText = "";
  salida.style.color = "";
}


function verificarPalindromo() {
  const entrada = document.getElementById("palabra");
  const salida = document.getElementById("resultadoPalindromo");
  const palabra = entrada.value.trim().toLowerCase().replace(/\s/g, '');

  if (palabra === "") {
    salida.innerText = "Por favor ingresa una palabra.";
    salida.style.color = "red";
    return;
  }

  const invertida = palabra.split('').reverse().join('');
  const esPalindromo = palabra === invertida;

  salida.innerText = esPalindromo ? "✅ Es un palíndromo" : "❌ No es un palíndromo";
  salida.style.color = esPalindromo ? "green" : "red";
}

function mostrarMayor() {
  const aInput = document.getElementById("num1");
  const bInput = document.getElementById("num2");
  const salida = document.getElementById("resultadoMayor");

  const a = parseFloat(aInput.value);
  const b = parseFloat(bInput.value);

  if (isNaN(a) || isNaN(b)) {
    salida.innerText = "Por favor ingresa ambos números.";
    salida.style.color = "red";
    return;
  }

  const resultado = a > b ? `✅ El mayor es ${a}` : b > a ? `✅ El mayor es ${b}` : "❗ Son iguales";
  salida.innerText = resultado;
  salida.style.color = a === b ? "#ffa500" : "green";
}

function mostrarVocales() {
  const entrada = document.getElementById("fraseVocales");
  const salida = document.getElementById("resultadoVocales");
  const frase = entrada.value.trim().toLowerCase();

  if (frase === "") {
    salida.innerText = "Por favor ingresa una frase.";
    salida.style.color = "red";
    return;
  }

  const vocales = frase.match(/[aeiouáéíóúü]/g);
  if (vocales) {
    salida.innerText = "✅ Vocales encontradas: " + [...new Set(vocales)].join(', ');
    salida.style.color = "green";
  } else {
    salida.innerText = "❌ No hay vocales";
    salida.style.color = "red";
  }
}

function contarVocales() {
  const entrada = document.getElementById("fraseConteo");
  const salida = document.getElementById("resultadoConteo");
  const frase = entrada.value.trim().toLowerCase();

  if (frase === "") {
    salida.innerText = "Por favor ingresa una frase.";
    salida.style.color = "red";
    return;
  }

  const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  let total = 0;

  for (let char of frase) {
    if (conteo.hasOwnProperty(char)) {
      conteo[char]++;
      total++;
    }
  }

  if (total === 0) {
    salida.innerText = "❌ No hay vocales";
    salida.style.color = "red";
  } else {
    let resultado = Object.entries(conteo)
      .map(([v, c]) => `${v}: ${c}`)
      .join(', ');
    salida.innerText = "✅ " + resultado;
    salida.style.color = "green";
  }
}


function mostrarContenido() {
  const url = document.getElementById("url").value;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.onreadystatechange = () => {
    document.getElementById("estado").innerText = xhr.readyState + ' - ' + xhrStatusText(xhr.readyState);
    if (xhr.readyState === 4) {
      document.getElementById("contenido").innerText = xhr.responseText;
      document.getElementById("codigoEstado").innerText = xhr.status + ' ' + xhr.statusText;
      document.getElementById("cabeceras").innerText = xhr.getAllResponseHeaders();
    }
  };
  xhr.send();
}

function xhrStatusText(state) {
  return ["No iniciada", "Conectando", "Recibiendo", "Procesando", "Completada"][state] || "";
}

function limpiarAJAX() {
  document.getElementById("contenido").innerText = "";
  document.getElementById("estado").innerText = "";
  document.getElementById("cabeceras").innerText = "";
  document.getElementById("codigoEstado").innerText = "";
}
