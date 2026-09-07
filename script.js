const entradaRaza = document.getElementById('entradaRaza');
const botonBuscar = document.getElementById('botonBuscar');
const mensaje = document.getElementById('mensaje');
const resultados = document.getElementById('resultados');

const url = 'https://dog.ceo/api/breed';

botonBuscar.addEventListener('click', () => {
  buscar();
});

entradaRaza.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') {
    buscar();
  }
});

async function buscar() {
  const raza = entradaRaza.value.trim().toLowerCase();

  if (raza === '') {
    verMensaje('Escribe una raza antes de buscar', true);
    resultados.innerHTML = '';
    return;
  }

  resultados.innerHTML = '';
  verMensaje('Buscando perritos :D');

  try {
    const respuesta = await fetch(`${url}/${raza}/images/random/12`);
    const datos = await respuesta.json();

    if (datos.status === 'error') {
      verMensaje(`No se encontró la raza "${raza}". Intenta con otra (Akita, poodle, husky, ...)`, true);
      return;
    }

    verPerros(datos.message, raza);
    verMensaje(`Se muestran los resultados para "${raza}" `);

  } catch (error) {
    verMensaje('Ocurrió un error al conectar con la API. Intenta de nuevo.', true);
    console.error('Error en la búsqueda:', error);
  }
}

function verPerros(imagenes, raza) {
  resultados.innerHTML = '';

  imagenes.forEach((imagen) => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'tarjeta';

    tarjeta.inne