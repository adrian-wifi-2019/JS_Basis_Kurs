<?php
  header( 'Access-Control-Allow-Origin: *' );
  header( 'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );

  $err = null;

  if ( !isset( $_GET['pageId'] ) ) {
    $err = 'pageId ist nicht definiert.';
  } else if ( !is_numeric($_GET['pageId']) ) {
    $err = 'pageId ist kein Zahlenwert.';
  }

  if ($err) {
    echo '{"fehler":"' . $err . '"}';
    exit;
  }

  if($_GET['pageId'] == 1)
    echo '<h1>JSON</h1><p>JSON ("JavaScript Object Notation") definiert ein schlankes Datenformat, in dem Informationen wie Objekte, Arrays und sonstige Variablen in lesbarer Form gespeichert werden können.</p><p>Weitere Infos <a href="https://wiki.selfhtml.org/wiki/JSON" target="_blank">hier</a>.</p>';
  else if($_GET['pageId'] == 2)
    echo '<h1>AJAX / XHR</h1><p>Ajax (Asynchronous JavaScript and Xml) ist ein Konzept, das es Webanwendungen ermöglicht, neue Daten vom Server zu erhalten und/oder dem Server für die weitere Verarbeitung zu senden, ohne dass die Seite als Ganzes neu geladen wird.</p><p>Weitere Infos <a href="https://wiki.selfhtml.org/wiki/JavaScript/XMLHttpRequest" target="_blank">hier</a>.</p>';
  else if($_GET['pageId'] == 3)
    echo '<h1>AJAX / jQuery</h1><p>jQuery.ajax() führt eine asynchrone HTTP-Anfrage auf Basis eines XHR-Objekts aus.</p><p>Weitere Infos <a href="http://api.jquery.com/jquery.ajax/" target="_blank">hier</a>.</p>';
?>
