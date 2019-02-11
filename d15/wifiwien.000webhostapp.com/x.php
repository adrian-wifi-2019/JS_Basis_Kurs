<?php
  header( 'Access-Control-Allow-Origin: *' );
  header( 'Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept' );

  sleep(1);

if ( !isset( $_POST['x'] ) ) { echo 'x is not defined'; exit; }

  // tut was
 if ( !is_numeric($_POST['x']) ) { echo 'keine Zahl.'; exit; }
 else {

   echo '{"x2":'.$_POST['x'] * $_POST['x'].'}';

 }

  // echo 'Hallo ich Server! Deine Daten: '.$_POST['x'];
