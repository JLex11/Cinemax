<?php
//include permite invocar archivos externos
//$_SERVER invoca un archivo principal de trabajo
include $_SERVER["DOCUMENT_ROOT"] . '/Cinemax/Controller/DAO.php';

/* $opcion = $_REQUEST['opc']; */

// !Pelicula
/* -------------------------------- Pelicula  1-20 -------------------------------- */
$opc = $_POST['opc'];
if ($opc == '1') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $pelicula = Pelicula::listar($opcion, $campo, $valor);
    echo json_encode($pelicula);
}

// !Estadisticas
/* ------------------------------ Estadisticas 21-40 ------------------------------ */

/* -------------------------- Estadisticas pelicula 41-60 ------------------------- */

// !Actor
/* ---------------------------------- Actor 61-80 --------------------------------- */
if ($opc == '61') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $actor = Actor::listar($opcion, $campo, $valor);
    echo json_encode($actor);
}

/* ----------------------------- Actor pelicula 81-100 ----------------------------- */

// !Director
/* -------------------------------- Director 101-120 -------------------------------- */
if ($opc == '101') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $director = Director::listar($opcion, $campo, $valor);
    echo json_encode($director);
}

/* ---------------------------- Director pelicula 121-140 --------------------------- */

// !Genero
/* --------------------------------- Genero 141-160 --------------------------------- */
if ($opc == '141') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $genero = Genero::listar($opcion, $campo, $valor);
    echo json_encode($genero);
}

/* ----------------------------- Genero pelicula 161-180 ---------------------------- */

// !Usuario
/* --------------------------------- Usuario 181-200 -------------------------------- */

?>