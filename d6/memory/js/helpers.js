'use strict';

function getZufallsGanzzahl(min, max){
  return Math.floor( Math.random() * (max - min + 1) ) + min;
}

// Array Sortierfunktion
function sortiereNachZufall(a, b){
  return Math.random() - .5;
}

function shuffleListe(liste){
  for(let i = liste.length - 1; i > 0; i--){
    let alterWert = liste[i];
    let zweiterIndex = getZufallsGanzzahl(0, i-1);

    liste[i] = liste[zweiterIndex];
    liste[zweiterIndex] = alterWert;
  }
}
