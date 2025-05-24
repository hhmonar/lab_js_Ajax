function verificarPalindromo() {
  const texto = document.getElementById('input-palindromo').value.toLowerCase().replace(/[^a-z0-9áéíóú]/gi, '');
  const resultado = texto === texto.split('').reverse().join('');
  document.getElementById('resultado-palindromo').textContent = resultado ? "Es un palíndromo" : "No es un palíndromo";
}

function compararNumeros() {
  const n1 = Number(document.getElementById('num1').value);
  const n2 = Number(document.getElementById('num2').value);
  let resultado = "";
  
  if (!isNaN(n1) && !isNaN(n2)) {
    if (n1 > n2) resultado = `El número mayor es ${n1}`;
    else if (n2 > n1) resultado = `El número mayor es ${n2}`;
    else resultado = "Ambos números son iguales";
  } else {
    resultado = "Por favor, ingresa dos números válidos.";
  }

  document.getElementById('resultado-mayor').textContent = resultado;
}

function mostrarVocales() {
  const frase = document.getElementById('input-frase').value;
  const vocales = frase.match(/[aeiouáéíóú]/gi);
  document.getElementById('vocales').textContent = vocales ? [...new Set(vocales)].join(", ") : "No se encontraron vocales.";
}

function contarVocales() {
  const frase = document.getElementById('input-frase').value.toLowerCase();
  const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0, á: 0, é: 0, í: 0, ó: 0, ú: 0 };
  
  for (let letra of frase) {
    if (conteo.hasOwnProperty(letra)) {
      conteo[letra]++;
    }
  }

  const resultado = Object.entries(conteo)
    .filter(([_, valor]) => valor > 0)
    .map(([letra, valor]) => `${letra}: ${valor}`)
    .join(", ");

  document.getElementById('conteo-vocales').textContent = resultado;
}

function mostrarContenido() {
  const urlInput = document.getElementById('url');
  const url = urlInput.value.trim() || "https://jsonplaceholder.typicode.com/posts/1";

  if (urlInput.value.trim() === "") {
    urlInput.value = url; // actualizar el campo si estaba vacío
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function () {
    const estados = ["No iniciada", "Conexión establecida", "Recibiendo", "Completada"];
    document.getElementById("estado-peticion").textContent = `Estado: ${estados[xhr.readyState] || "Desconocido"}`;

    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        document.getElementById("contenido").textContent = xhr.responseText;
        document.getElementById("codigo-respuesta").textContent = `Código: ${xhr.status} ${xhr.statusText}`;
        document.getElementById("cabeceras").textContent = xhr.getAllResponseHeaders();
      } else {
        document.getElementById("contenido").textContent = "⚠️ Error: No se pudo cargar la URL (¿CORS?). Prueba con una API pública.";
        document.getElementById("codigo-respuesta").textContent = `Código: ${xhr.status} ${xhr.statusText}`;
        document.getElementById("cabeceras").textContent = "";
      }
    }
  };

  xhr.onerror = () => alert("Error en la solicitud");

  xhr.send();
}
