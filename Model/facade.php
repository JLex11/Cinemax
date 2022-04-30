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
    $idpelicula = $_POST["idpelicula"];
    $titulooriginal = $_POST["titulooriginal"];
    $titulolatino = $_POST["titulolatino"];
    $foto = "foto";
    $idtipo = $_POST["tipo"];
    $idpais = $_POST["pais"];
    $lanzamiento = $_POST["lanzamiento"];
    $duracion = $_POST["duracion"];
    $resena = $_POST["resena"];
    $estado = $_POST["estado"];
    
    $pelicula = Pelicula::editar($idpelicula, $titulooriginal, $titulolatino, $foto, $idtipo, $idpais, $lanzamiento, $duracion, $resena, $estado);
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

/* -------------------------- Estadisticas pelicula 41-60 ------------------------- */
if ($opc == '41') {
    $opcion = $opc;
    $campo = "";
    $valor = "";
    
    $estadisticaspelicula = EstadisticasPelicula::listar($opcion, $campo, $valor);
    echo json_encode($Estadisticas);
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
    $idactor = $_POST["idactor"];
    $nombre = $_POST["nombre"];
    $fechanacimiento = $_POST["fechanacimiento"];
    $descripcion = $_POST["descripcion"];
    $foto = $_POST["foto"];
    $estado = $_POST["estado"];
    
    $actor = Actor::editar($idactor, $nombre, $fechanacimiento, $descripcion, $foto, $estado);
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
    $idactorpelicula = $_POST["idactorpelicula"];
    $idactor = $_POST["idactor"];
    $idpelicula = $_POST["idpelicula"];
    $personaje = $_POST["personaje"];
    $estado = $_POST["estado"];
    
    $actorpelicula = ActorPelicula::editar($idactorpelicula, $idactor, $idpelicula, $personaje, $estado);
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
    $iddirector = $_POST["iddirector"];
    $nombre = $_POST["nombre"];
    $fechanacimiento = $_POST["fechanacimiento"];
    $descripcion = $_POST["descripcion"];
    $foto = $_POST["foto"];
    $estado = $_POST["estado"];

    $director = Director::editar($iddirector, $nombre, $fechanacimiento, $descripcion, $foto, $estado);
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
    $iddirectorpelicula = $_POST["iddirectorpelicula"];
    $iddirector = $_POST["iddirector"];
    $idpelicula = $_POST["idpelicula"];
    $estado = $_POST["estado"];
    
    $directorpelicula = DirectorPelicula::editar($iddirectorpelicula, $iddirector, $idpelicula, $estado);
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
    $idgenero = $_POST["idgenero"];
    $nombre = $_POST["nombre"];
    $estado = $_POST["estado"];
    
    $genero = Genero::editar($idgenero, $nombre, $estado);
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
    $idgeneropelicula = $_POST["idgeneropelicula"];
    $idgenero = $_POST["idgenero"];
    $idpelicula = $_POST["idpelicula"];
    $estado = $_POST["estado"];
    
    $generopelicula = GeneroPelicula::editar($idgeneropelicula, $idgenero, $idpelicula, $estado);
    echo json_encode($generopelicula);
}

// !Usuario
/* --------------------------------- Usuario 181-200 -------------------------------- */

?>