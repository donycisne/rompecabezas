
// Representación de la grilla. Cada nro representa a una pieza.
// El 9 es la posición vacía
var grilla = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

// Aca vamos a ir guardando la posición vacía
var posicionVacia = {
  fila:2,
  columna:2
};

var mezclarVeces = 60;

// Esta función va a chequear si el Rompecabezas esta en la posición ganadora
function chequearSiGano(){

  var posicionInicial = 1;
  for (var i = 0; i < grilla.length; i++) {
    for (var j = 0; j < grilla.length; j++) {
      if (grilla[i][j] === posicionInicial) {
        posicionInicial++;
      }
    }
  }
  return posicionInicial === 10;
}

// la hacen los alumnos, pueden mostrar el cartel como prefieran. Pero es importante que usen
// esta función
function mostrarCartelGanador(){
  var mensaje = document.getElementById("mensaje");
  mensaje.style.display = "block";
}

function ocultarCartelGanador() {
  mensaje.style.display = 'none';
}

// Intercambia posiciones grilla y en el DOM
function intercambiarPosiciones(fila1, columna1, fila2, columna2){

  var posicion1 = grilla[fila1][columna1];
  var posicion2 = grilla[fila2][columna2];

  grilla[fila1][columna1] = posicion2;
  grilla[fila2][columna2] = posicion1;

  var pieza1 = document.getElementById(`pieza-${posicion1}`);
  var pieza1Clon = pieza1.cloneNode(true);

  var pieza2 = document.getElementById(`pieza-${posicion2}`);
  var pieza2Clon = pieza2.cloneNode(true);

  var rompecabeza = pieza1.parentNode;
  rompecabeza.replaceChild(pieza2Clon, pieza1);
  rompecabeza = pieza2.parentNode;
  rompecabeza.replaceChild(pieza1Clon, pieza2);
  
}

// Cambiar de Rompecabezas
function cambiarRompecabeza() {
  var rompecabeza = [10, 20, 30, 40, 50, 60];
  var cambiar = rompecabeza[Math.floor(Math.random()*rompecabeza.length)];
  for(var i = 1; i < 10; i++){
    document.getElementById(`picture`).src=`img/${cambiar}.png`;
    document.getElementById(`modelo`).src=`img/${cambiar}.png`;
    document.getElementById(`pieza-${i}`).src=`img/${cambiar+i}.png`;    
  }
  mezclarPiezas(mezclarVeces);
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila,nuevaColumna){
  posicionVacia.fila = nuevaFila;
  posicionVacia.columna = nuevaColumna;
}

// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna){
  return(fila  >=0 && fila <=2 && columna >=0 && columna <=2)
}

// Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando
// su posición con otro elemento
function moverEnDireccion(direccion){

  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Intercambia pieza blanca con la pieza que está arriba suyo
  if(direccion == 40){
    nuevaFilaPiezaVacia = posicionVacia.fila+1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está abajo suyo
  else if (direccion == 38) {
    nuevaFilaPiezaVacia = posicionVacia.fila-1;
    nuevaColumnaPiezaVacia = posicionVacia.columna;
  }
  // Intercambia pieza blanca con la pieza que está a su izq
  else if (direccion == 39) {
    nuevaColumnaPiezaVacia = posicionVacia.columna+1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }
  // Intercambia pieza blanca con la pieza que está a su der
  else if (direccion == 37) {
    nuevaColumnaPiezaVacia = posicionVacia.columna-1;
    nuevaFilaPiezaVacia = posicionVacia.fila;
  }

  // Se chequea si la nueva posición es válida, si lo es, se intercambia 
  if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
    intercambiarPosiciones(posicionVacia.fila, posicionVacia.columna,
    nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
  }
}

// Extras, ya vienen dadas

function mezclarPiezas(veces){
  if(veces<=0){return;}
  var direcciones = [40, 38, 39, 37];
  var direccion = direcciones[Math.floor(Math.random()*direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function(){
    mezclarPiezas(veces-1);
  },100);
}

function capturarTeclas(){
  document.body.onkeydown = (function(evento) {
    if(evento.which == 40 || evento.which == 38 || evento.which == 39 || evento.which == 37){
      moverEnDireccion(evento.which);

      var gano = chequearSiGano();
      if(gano){
        setTimeout(function(){
          mostrarCartelGanador();  
        },500);
      } 
      evento.preventDefault();
    }
  })
}

function iniciar(){
  mezclarPiezas(mezclarVeces);
  capturarTeclas();
}


iniciar();

