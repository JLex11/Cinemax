<?php
/* -------------------------------- Pelicula -------------------------------- */
class Pelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '1') {
            $sql = "SELECT\n"
            . "    pelicula.idpelicula,\n" 
            . "    pelicula.titulooriginal,\n"      
            . "    pelicula.titulolatino,\n"
            . "    pelicula.foto,\n"
            . "    pelicula.lanzamiento,\n"
            . "    pelicula.duracion,\n"
            . "    pelicula.resena,\n"
            . "    pelicula.estado,\n"
            . "    tipo.tipo,\n"
            . "    pais.nombre AS pais,\n"
            . "    estadisticas.cantvistas,\n"
            . "    estadisticas.cantlikes,\n"
            . "    estadisticas.cantcomentarios\n"
            . "FROM\n"
            . "    pelicula\n"
            . "INNER JOIN tipo ON pelicula.idtipo = tipo.idtipo\n"
            . "INNER JOIN pais ON pelicula.idpais = pais.idpais\n"
            . "LEFT JOIN estadisticaspelicula ON pelicula.idpelicula = estadisticaspelicula.idpelicula\n"
            . "LEFT JOIN estadisticas ON estadisticaspelicula.idestadisticas = estadisticas.idestadisticas\n"
            . "ORDER BY pelicula.estado ASC;";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($idpelicula, $titulooriginal, $titulolatino, $foto, $idtipo, $idpais, $lanzamiento, $duracion, $resena, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE pelicula SET\n"
        . "titulooriginal = '$titulooriginal',\n"
        . "titulolatino = '$titulolatino',\n"
        . "foto = '$foto',\n"
        . "idtipo = '$idtipo',\n"
        . "idpais = '$idpais',\n"
        . "lanzamiento = '$lanzamiento',\n"
        . "duracion = '$duracion',\n"
        . "resena = '$resena',\n"
        . "estado = '$estado'\n"
        . "WHERE idpelicula = '$idpelicula'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- Estadisticas -------------------------------- */
class Estadisticas {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '21') {
            $sql = "SELECT * FROM estadisticas ORDER BY estado ASC;";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }
}

/* -------------------------- Estadisticas Pelicula -------------------------- */
class EstadisticasPelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '41') {
            $sql = "SELECT * FROM estadisticaspelicula ORDER BY estado ASC;";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }
}

/* ---------------------------------- Actor --------------------------------- */
class Actor {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '61') {
            $sql = "SELECT * FROM actor";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($idactor, $nombre, $fechanacimiento, $descripcion, $foto, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE actor SET\n"
        . "nombre = '$nombre',\n"
        . "fechanacimiento = '$fechanacimiento',\n"
        . "descripcion = '$descripcion',\n"
        . "foto = '$foto',\n"
        . "estado = '$estado\n"
        . "WHERE idactor = '$idactor'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* ----------------------------- Actor pelicula ----------------------------- */
class ActorPelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '81') {
            $sql = "SELECT * FROM actorpelicula";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($idactorpelicula, $idactor, $idpelicula, $personaje, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE actorpelicula SET\n"
        . "idactor = '$idactor',\n"
        . "idpelicula = '$idpelicula',\n"
        . "personaje = '$personaje',\n"
        . "estado = '$estado\n"
        . "WHERE idactorpelicula = '$idactorpelicula'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- Director -------------------------------- */
class Director {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '101') {
            $sql = "SELECT * FROM director";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($iddirector, $nombre, $fechanacimiento, $descripcion, $foto, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE director SET\n"
        . "nombre = '$nombre',\n"
        . "fechanacimiento = '$fechanacimiento',\n"
        . "descripcion = '$descripcion',\n"
        . "foto = '$foto\n"
        . "estado = '$estado\n"
        . "WHERE iddirector = '$iddirector'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* -------------------------------- Director -------------------------------- */
class DirectorPelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '121') {
            $sql = "SELECT * FROM directorpelicula";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($iddirectorpelicula, $iddirector, $idpelicula, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE directorpelicula SET\n"
        . "iddirector = '$iddirector',\n"
        . "idpelicula = '$idpelicula',\n"
        . "estado = '$estado\n"
        . "WHERE iddirectorpelicula = '$iddirectorpelicula'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Genero --------------------------------- */
class Genero {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '141') {
            $sql = "SELECT * FROM genero";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($idgenero, $nombre, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE directorpelicula SET\n"
        . "nombre = '$nombre',\n"
        . "estado = '$estado\n"
        . "WHERE idgenero = '$idgenero'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

/* --------------------------------- Genero --------------------------------- */
class GeneroPelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '161') {
            $sql = "SELECT * FROM generopelicula";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);

        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }
        return $datos;
    }

    public static function editar($idgeneropelicula, $idgenero, $idpelicula, $estado) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE generopelicula SET\n"
        . "idgenero = '$idgenero',\n"
        . "idpelicula = '$idpelicula',\n"
        . "estado = '$estado\n"
        . "WHERE idgeneropelicula = '$idgeneropelicula'";

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_affected_rows($cnn);
        if ($rows == 0) {
            $datos[0] = "no se actualizaron los datos";
        } else {
            $datos[0] = "se actualizo correctamente";
        }
        return $datos;
    }
}

?>