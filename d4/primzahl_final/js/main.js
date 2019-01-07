'use strict';

window.onload = function(){
  var startWert = 2;
  var endWert = 100;


  function isPrimzahl(zahl){
    for(var j = 2; j <= zahl/2; j++){
      if( zahl % j === 0)
        return false;
    }
    return true;
  }

  document.getElementById('btn_eingabe').addEventListener('click', function(){
    var benutzereingabe = document.getElementById('eingabe').value;
    benutzereingabe = parseInt(benutzereingabe);
    console.log(benutzereingabe);

    var element = document.getElementById('ausgabe');
    var elternContainer = document.querySelector('body > div:nth-child(1)');
    var feedbackBild = elternContainer.querySelector('body > div > img');

    if( isNaN(benutzereingabe) ){
      element.innerText = 'Geben sie bitte eine gültige Zahl an.';
    } else if ( isPrimzahl(benutzereingabe) ) {  // benutzereingabe ist ein valider numerischer Wert
      element.innerText = benutzereingabe + ' ist eine Primzahl!';
      elternContainer.style.backgroundColor = "lavender";
      feedbackBild.src = 'images/hakerl.png';
    } else {
      element.innerText = benutzereingabe + ' ist keine Primzahl';
      elternContainer.style.backgroundColor = "orangered";
      feedbackBild.src = 'images/kreuzerl.png';
    }

  });

  document.getElementById('btn_zufall').addEventListener('click', function(){
    document.getElementById('eingabe').value = zufallsGanzzahl(2,100);
    document.getElementById('btn_eingabe').click();
  });



} // Ende onload
