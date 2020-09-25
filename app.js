const orden = [];
const platos = [
  {
    id: 1,
    nombre: "Pollo Asado",
    precio: 5000,
  },
  {
    id: 2,
    nombre: "Papas Fritas",
    precio: 2000,
  },
  {
    id: 3,
    nombre: "Carne Mechada",
    precio: 1200,
  },
];

const elementosDelDom = (function () {
  const divDeComidas = document.getElementById("comidas");
  const divDeOrdenes = document.getElementById("ordenes_agregadas");
  const botonDeAgregar = document.getElementById("agregar_a_orden");
  const totalDeComida = document.getElementById("precio_total");
  const propinaSugerida = document.getElementById("propina_sugerida");
  const divDePlatos = document.getElementById("platos");
  return {
    divDeComidas,
    divDeOrdenes,
    botonDeAgregar,
    totalDeComida,
    propinaSugerida,
    divDePlatos,
  };
})();

const colocarEnPantalla = (function () {
  const transformarAEtiquetas = (objeto) => {
    return `<div class="carta_de_comida">
    <div class="cabeza_de_carta">
    <h3>${objeto.nombre}</h3></div>
    <div class="pie_de_carta">${objeto.precio}</div>
    <button id="agregar_a_orden">Agregar</button>
    </div>`;
  };

  const mostrarEnPantalla = (div) => (string) => {
    div.innerHTML = "";
    div.innerHTML = string;
  };

  const reducirEtiquetas = (acc, item) => `${acc + item}`;
  const modificarArray = (fn) => (div) => (array) => {
    if (array.length === 0) return;
    const stringDeEtiquetas = array.map(fn).reduce(reducirEtiquetas);
    mostrarEnPantalla(div)(stringDeEtiquetas);
  };
  const transformarEtiquetasDeOrden = (objeto) =>
    `<div className="carta_de_ordenes"><h3>${objeto.nombre} ${objeto.precio}</h3></div>`;

  const modificarArrayDePlatos = modificarArray(transformarAEtiquetas);
  const modificarArrayDeOrdenes = modificarArray(transformarEtiquetasDeOrden);

  return {
    modificarArrayDeOrdenes,
    modificarArrayDePlatos,
    mostrarEnPantalla,
  };
})();

const {
  divDeComidas,
  divDeOrdenes,
  botonDeAgregar,
  totalDeComida,
  propinaSugerida,
  divDePlatos,
} = elementosDelDom;
const res = colocarEnPantalla.modificarArrayDePlatos(divDeComidas)(platos);

const agregarAOrden = (item) => (array) => {
  array.push(item);
};

const sumarTotalDeComida = (array) =>
  array.reduce((acc, item) => acc + parseInt(item.precio), 0);

const obtenerPropina = (porcentaje) => (valor) => (valor * porcentaje) / 100;
const obtener10 = obtenerPropina(10);

const encontrarPlato = (nombre) =>
  platos.find((item) => item.nombre === nombre);

const handleClick = (e) => {
  if (e.target.id === "agregar_a_orden") {
    const nombreDelPlato =
      e.target.parentElement.childNodes[1].childNodes[1].innerText;
    agregarAOrden(encontrarPlato(nombreDelPlato))(orden);
    colocarEnPantalla.modificarArrayDeOrdenes(divDeOrdenes)(orden);
    colocarEnPantalla.mostrarEnPantalla(totalDeComida)(
      sumarTotalDeComida(orden)
    );
    colocarEnPantalla.mostrarEnPantalla(propinaSugerida)(
      obtener10(sumarTotalDeComida(orden))
    );
  }
};
divDePlatos.onclick = handleClick;
