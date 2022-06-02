<?php
class DbTables
{
    public static function listar()
    {
        include "../Connection/conexion.php";

        $query = "SELECT * FROM tables_opc";

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        return $datos;
    }
}

/* -------------------------------- Pelicula -------------------------------- */
class Pelicula
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '1') {
            $query = "SELECT\n"
                . "    pelicula.idpelicula AS 'id pelicula',\n"
                . "    pelicula.titulooriginal AS 'titulo original',\n"
                . "    pelicula.titulolatino AS 'titulo latino',\n"
                . "    pelicula.foto,\n"
                . "    pelicula.lanzamiento,\n"
                . "    pelicula.duracion,\n"
                . "    pelicula.resena,\n"
                . "    pelicula.estado,\n"
                . "    tipo.tipo,\n"
                . "    pais.nombre AS pais,\n"
                . "    estadisticas.cantvistas AS vistas,\n"
                . "    estadisticas.cantlikes AS likes,\n"
                . "    estadisticas.cantcomentarios AS comentarios\n"
                . "FROM\n"
                . "    pelicula\n"
                . "INNER JOIN tipo ON pelicula.idtipo = tipo.idtipo\n"
                . "INNER JOIN pais ON pelicula.idpais = pais.idpais\n"
                . "LEFT JOIN estadisticaspelicula ON pelicula.idpelicula = estadisticaspelicula.idpelicula\n"
                . "LEFT JOIN estadisticas ON estadisticaspelicula.idestadisticas = estadisticas.idestadisticas\n"
                . "ORDER BY pelicula.estado ASC;";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE pelicula");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idpelicula, $titulooriginal, $titulolatino, $foto, $lanzamiento, $duracion, $resena, $estado, $idtipo, $idpais)
    {
        include "../Connection/conexion.php";
        $datos = array();
        
        $titulooriginal = ucfirst(strtolower($titulooriginal));
        $titulolatino = ucfirst(strtolower($titulolatino));
        $resena = ucfirst(strtolower($resena));
        $estado = ucfirst(strtolower($estado));

        if (empty($foto)) {
            $query = "UPDATE pelicula SET titulolatino = '$titulolatino', titulooriginal = '$titulooriginal', lanzamiento = '$lanzamiento', duracion = '$duracion', resena = '$resena', estado = '$estado', idtipo = '$idtipo', idpais = '$idpais' WHERE idpelicula = '$idpelicula'";
        } else {
            $codigo = date("His");
            $foto = "../foto/pelicula/" . $codigo.$foto;
            copy($_FILES["foto"]["tmp_name"], $foto);
            $query = "UPDATE pelicula SET titulolatino = '$titulolatino', titulooriginal = '$titulooriginal', foto = '$foto', lanzamiento = '$lanzamiento', duracion = '$duracion', resena = '$resena', estado = '$estado', idtipo = '$idtipo', idpais = '$idpais' WHERE idpelicula = '$idpelicula'";
        }

        mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- Estadisticas -------------------------------- */
class Estadisticas
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '21') {
            $query = "SELECT\n"
            . "idestadisticas AS 'id estadisticas',\n"
            . "cantvistas AS vistas,\n"
            . "cantlikes AS likes,\n"
            . "cantcomentarios AS comentarios\n"
            . "FROM estadisticas ORDER BY estado ASC";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE estadisticas");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }
}

/* -------------------------- Estadisticas Pelicula -------------------------- */
class EstadisticasPelicula
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '41') {
            $query = "SELECT * FROM estadisticaspelicula ORDER BY estado ASC;";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE estadisticaspelicula");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }
}

/* ---------------------------------- Actor --------------------------------- */
class Actor
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '61') {
            $query = "SELECT\n"
                . "idactor AS 'id actor',\n"
                . "nombre, fechanacimiento AS 'fecha nacimiento',\n"
                . "descripcion,\n"
                . "foto,\n"
                . "estado\n"
                . "FROM `actor`";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE actor");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idactor, $nombre, $fechanacimiento, $descripcion, $foto, $estado)
    {
        include "../Connection/conexion.php";
        $datos = array();

        $nombre = ucfirst(strtolower($nombre));
        $descripcion = ucfirst(strtolower($descripcion));
        $estado = ucfirst(strtolower($estado));

        if (empty($foto)) {
            $query = "UPDATE actor SET nombre = '$nombre', fechanacimiento = '$fechanacimiento', descripcion = '$descripcion', estado = '$estado' WHERE idactor = '$idactor'";
        } else {
            $codigo = date("His");
            $foto = "../foto/actor/" . $codigo.$foto;
            copy($_FILES["foto"]["tmp_name"], $foto);
            $query = "UPDATE actor SET nombre = '$nombre', fechanacimiento = '$fechanacimiento', descripcion = '$descripcion', foto = '$foto', estado = '$estado' WHERE idactor = '$idactor'";
        }

        mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* ----------------------------- Actor pelicula ----------------------------- */
class ActorPelicula
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '81') {
            $query = "SELECT * FROM actorpelicula";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE actorpelicula");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);
        return $datosAndInfo;
    }

    public static function editar($idactorpelicula, $idactor, $idpelicula, $personaje, $estado)
    {
        include "../Connection/conexion.php";
        $datos = array();
        
        $personaje = ucfirst(strtolower($personaje));
        
        $query = "UPDATE actorpelicula SET idactor = '$idactor', idpelicula = '$idpelicula', personaje = '$personaje', estado = '$estado' WHERE idactorpelicula = '$idactorpelicula'";
        mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- Director -------------------------------- */
class Director
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '101') {
            $query = "SELECT\n"
                . "iddirector AS 'id director',\n"
                . "nombre,\n"
                . "fechanacimiento AS 'fecha nacimiento',\n"
                . "descripcion,\n"
                . "foto,\n"
                . "estado \n"
                . "FROM director";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE director");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($iddirector, $nombre, $fechanacimiento, $descripcion, $foto, $estado)
    {
        include "../Connection/conexion.php";
        $datos = array();

        if (empty($foto)) {
            $query = "UPDATE director SET nombre = '$nombre', fechanacimiento = '$fechanacimiento', descripcion = '$descripcion', estado = '$estado' WHERE iddirector = '$iddirector'";
        } else {
            $codigo = date("His");
            $foto = "../foto/director/" . $codigo.$foto;
            copy($_FILES["foto"]["tmp_name"], $foto);
            $query = "UPDATE director SET nombre = '$nombre', fechanacimiento = '$fechanacimiento', descripcion = '$descripcion', foto = '$foto', estado = '$estado' WHERE iddirector = '$iddirector'";
        }


        mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- DirectorPelicula -------------------------------- */
class DirectorPelicula
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '121') {
            $query = "SELECT * FROM directorpelicula";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE directorpelicula");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);
        return $datosAndInfo;
    }

    public static function editar($iddirectorpelicula, $iddirector, $idpelicula, $estado)
    {
        include "../Connection/conexion.php";
        $datos = array();

        $query = "UPDATE directorpelicula SET iddirector = '$iddirector', idpelicula = '$idpelicula', estado = '$estado' WHERE iddirectorpelicula = '$iddirectorpelicula'";
        mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Genero --------------------------------- */
class Genero
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '141') {
            $query = "SELECT\n"
                . "idgenero AS 'id genero',\n"
                . "nombre,\n"
                . "estado\n"
                . "FROM genero";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE genero");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idgenero, $nombre, $estado)
    {
        include "../Connection/conexion.php";

        $query = "UPDATE genero SET nombre = '$nombre', estado = '$estado' WHERE idgenero = '$idgenero'";

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- GeneroPelicula --------------------------------- */
class GeneroPelicula
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '161') {
            $query = "SELECT * FROM generopelicula";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE generopelicula");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idgeneropelicula, $idgenero, $idpelicula, $estado)
    {
        include "../Connection/conexion.php";

        $query = "UPDATE generopelicula SET idgenero = '$idgenero', idpelicula = '$idpelicula', estado = '$estado' WHERE idgeneropelicula = '$idgeneropelicula'";

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Tipo --------------------------------- */
class Tipo
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '181') {
            $query = "SELECT idtipo, tipo FROM tipo WHERE estado = 'T'";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE tipo");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idtipo, $tipo, $estado)
    {
        include "../Connection/conexion.php";

        $query = "UPDATE generopelicula SET tipo = '$tipo', estado = '$estado' WHERE idtipo = '$idtipo'";

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Pais --------------------------------- */
class Pais
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '201') {
            $query = "SELECT idpais, nombre FROM pais WHERE estado = 'T'";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE pais");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

    public static function editar($idpais, $nombre, $estado)
    {
        include "../Connection/conexion.php";

        $query = "UPDATE generopelicula SET nombre = '$nombre', estado = '$estado' WHERE idpais = '$idpais'";

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "No hubo cambios";
        }
        else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Usuario --------------------------------- */
class Usuario
{
    public static function listar($opc, $campo, $valor)
    {
        include "../Connection/conexion.php";

        if ($opc == '241') {
            $query = "SELECT * FROM usuario";
        }

        $datos = array();
        $sql = mysqli_query($cnn, $query);
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $sql->fetch_assoc();
        }

        $table_Fields = array();
        $tableFields = $sql->fetch_fields();
        $i = 0;
        foreach ($tableFields as $valor) {
            $table_Fields[$i] = array("table" => $valor->table);
            $i++;
        }

        $describe = array();
        $sql = mysqli_query($cnn, "DESCRIBE usuario");
        $rows = mysqli_num_rows($sql);
        for ($i = 0; $i < $rows; $i++) {
            $describe[$i] = $sql->fetch_assoc();
        }
        $datosAndInfo = array("datos" => $datos, "table_Fields" => $table_Fields, "describe" => $describe);

        return $datosAndInfo;
    }

}

?>