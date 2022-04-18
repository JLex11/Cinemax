<?php
//include permite invocar archivos externos
//$_SERVER invoca un archivo principal de trabajo
include $_SERVER["DOCUMENT_ROOT"] . '/Cinemax/Controller/DAO.php';

$opcion = $_REQUEST['opc'];

// !Pelicula
/* -------------------------------- Pelicula  1-20 -------------------------------- */
if ($_POST['opc'] == '1') {
    $opcion = $_POST['opc'];
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

/* ----------------------------- Actor pelicula 81-100 ----------------------------- */

// !Director
/* -------------------------------- Director 101-120 -------------------------------- */

/* ---------------------------- Director pelicula 121-140 --------------------------- */

// !Genero
/* --------------------------------- Genero 141-160 --------------------------------- */

/* ----------------------------- Genero pelicula 161-180 ---------------------------- */

// !Usuario
/* --------------------------------- Usuario 181-200 -------------------------------- */

?>