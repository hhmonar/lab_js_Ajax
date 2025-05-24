function showSection(id) {
  document.querySelectorAll('.section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function limpiar(campos, salida) {
  campos.split(',').forEach(id => document.getElementById(id).value = '');
  document.getElementById(salida).textContent = '';
}

function esPalindromo() {
  let palabra = document.getElementById('palabra').value;
  let resultado = palabra === palabra.split('').reverse().join('') ? "Es palíndromo" : "No es palíndromo";
  document.getElementById('resultadoPalindromo').textContent = resultado;
}

function compararNumeros() {
  let n1 = parseFloat(document.getElementById('num1').value);
  let n2 = parseFloat(document.getElementById('num2').value);
  let resultado = n1 > n2 ? n1 + " es mayor" : n2 > n1 ? n2 + " es mayor" : "Son iguales";
  document.getElementById('resultadoMayor').textContent = resultado;
}

function analizarVocales() {
  let frase = document.getElementById('fraseVocales').value.toLowerCase();
  let vocalesEncontradas = frase.match(/[aeiou]/g);
  let conteo = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  if (vocalesEncontradas) {
    for (let v of vocalesEncontradas) conteo[v]++;
    let distintas = [...new Set(vocalesEncontradas)].join(', ');
    let resumen = Object.entries(conteo)
      .filter(([v, c]) => c > 0)
      .map(([v, c]) => `${v}: ${c}`).join(', ');
    document.getElementById('resultadoVocales').textContent = `Vocales encontradas: ${distintas}\nConteo: ${resumen}`;
  } else {
    document.getElementById('resultadoVocales').textContent = "No se encontraron vocales.";
  }
}

function cargarContenido() {
  let url = document.getElementById('url').value;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = () => {
    document.getElementById('estado').textContent = xhr.readyState + " - " + xhr.statusText;
    if (xhr.readyState === 4) {
      const respuesta = xhr.responseText;
      try {
        const json = JSON.parse(respuesta);
        document.getElementById('contenido').textContent = JSON.stringify(json, null, 2);
      } catch (e) {
        document.getElementById('contenido').innerHTML = respuesta;
      }
      document.getElementById('codigo').textContent = xhr.status + ' - ' + xhr.statusText;
      const headers = xhr.getAllResponseHeaders().trim().split(/\r?\n/).join('\n');
      document.getElementById('cabeceras').textContent = headers;
    }
  };
  xhr.send();
}

function limpiarAjax() {
  document.getElementById('url').value = '';
  document.getElementById('contenido').textContent = '';
  document.getElementById('estado').textContent = '';
  document.getElementById('cabeceras').textContent = '';
  document.getElementById('codigo').textContent = '';
}

window.onload = () => {
  document.getElementById('url').value = window.location.href;
};
