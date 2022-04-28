<?php
//include permite invocar archivos externos
//$_SERVER invoca un archivo principal de trabajo
include $_SERVER["DOCUMENT_ROOT"] . '/Cinemax/Controller/DAO.php';

/* $opcion = $_REQUEST['opc']; */
$opc = $_REQUEST['opc'];

// !Pelicula
/* -------------------------------- Pelicula  1-20 -------------------------------- */
if ($opc == '1') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $pelicula = Pelicula::listar($opcion, $campo, $valor);
    echo json_encode($pelicula);
}

if ($opc == '2') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $pelicula = Pelicula::editar($opcion, $campo, $valor);
    echo json_encode($pelicula);
}

// !Estadisticas
/* ------------------------------ Estadisticas 21-40 ------------------------------ */
if ($opc == '21') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $estadisticas = Estadisticas::listar($opcion, $campo, $valor);
    echo json_encode($Estadisticas);
}

if ($opc == '22') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $estadisticas = Estadisticas::editar($opcion, $campo, $valor);
    echo json_encode($estadisticas);
}

/* -------------------------- Estadisticas pelicula 41-60 ------------------------- */
if ($opc == '41') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $estadisticaspelicula = EstadisticasPelicula::listar($opcion, $campo, $valor);
    echo json_encode($Estadisticas);
}

if ($opc == '42') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $estadisticaspelicula = EstadisticasPelicula::editar($opcion, $campo, $valor);
    echo json_encode($estadisticaspelicula);
}

// !Actor
/* ---------------------------------- Actor 61-80 --------------------------------- */
if ($opc == '61') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $actor = Actor::listar($opcion, $campo, $valor);
    echo json_encode($actor);
}

if ($opc == '62') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $actor = Actor::editar($opcion, $campo, $valor);
    echo json_encode($actor);
}

/* ----------------------------- Actor pelicula 81-100 ----------------------------- */
if ($opc == '81') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $actorpelicula = ActorPelicula::listar($opcion, $campo, $valor);
    echo json_encode($actorpelicula);
}

if ($opc == '82') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $actorpelicula = ActorPelicula::editar($opcion, $campo, $valor);
    echo json_encode($actorpelicula);
}

// !Director
/* -------------------------------- Director 101-120 -------------------------------- */
if ($opc == '101') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $director = Director::listar($opcion, $campo, $valor);
    echo json_encode($director);
}

if ($opc == '102') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $director = Director::editar($opcion, $campo, $valor);
    echo json_encode($director);
}

/* ---------------------------- Director pelicula 121-140 --------------------------- */
if ($opc == '121') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $directorpelicula = DirectorPelicula::listar($opcion, $campo, $valor);
    echo json_encode($directorpelicula);
}

if ($opc == '122') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $directorpelicula = DirectorPelicula::editar($opcion, $campo, $valor);
    echo json_encode($directorpelicula);
}

// !Genero
/* --------------------------------- Genero 141-160 --------------------------------- */
if ($opc == '141') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $genero = Genero::listar($opcion, $campo, $valor);
    echo json_encode($genero);
}

if ($opc == '142') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $genero = Genero::editar($opcion, $campo, $valor);
    echo json_encode($genero);
}

/* ----------------------------- Genero pelicula 161-180 ---------------------------- */
if ($opc == '161') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $generopelicula = GeneroPelicula::listar($opcion, $campo, $valor);
    echo json_encode($generopelicula);
}

if ($opc == '162') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $generopelicula = GeneroPelicula::editar($opcion, $campo, $valor);
    echo json_encode($generopelicula);
}

// !Usuario
/* --------------------------------- Usuario 181-200 -------------------------------- */

?>