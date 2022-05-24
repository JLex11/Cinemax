<?php
/* -------------------------------- Pelicula -------------------------------- */
class Pelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '1') {
            $sql = "SELECT\n"
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
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
            /* $info_campos[1] = [$valor->name, "casilla"];
            $info_campos[2] = [$valor->max_length, "max-length"];
            $info_campos[3] = [$valor->length, "length"];
            $info_campos[4] = [$valor->charsetnr, "charsetnr"];
            $info_campos[5] = [$valor->flags, "flags"];
            $info_campos[6] = [$valor->type, "type"]; */
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
    }

    public static function editar($idpelicula, $titulooriginal, $titulolatino, $foto, $lanzamiento, $duracion, $resena, $estado, $idtipo, $idpais) {
        include "../Connection/conexion.php";
        
        $sql = "UPDATE pelicula SET\n"
        . "titulooriginal = '$titulooriginal',\n"
        . "titulolatino = '$titulolatino',\n"
        . "foto = '$foto',\n"
        . "lanzamiento = '$lanzamiento',\n"
        . "duracion = '$duracion',\n"
        . "resena = '$resena',\n"
        . "estado = '$estado'\n"
        . "idtipo = '$idtipo',\n"
        . "idpais = '$idpais',\n"
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
            $sql = "SELECT\n"
            . "idestadisticas AS 'id estadisticas',\n"
            . "cantvistas AS vistas,\n"
            . "cantlikes AS likes,\n"
            . "cantcomentarios AS comentarios\n"
            . "FROM estadisticas ORDER BY estado ASC";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
    }
}

/* ---------------------------------- Actor --------------------------------- */
class Actor {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '61') {
            $sql = "SELECT\n"
            . "idactor AS 'id actor',\n"
            . "nombre, fechanacimiento AS 'fecha nacimiento',\n"
            . "descripcion,\n"
            . "foto,\n"
            . "estado\n"
            . "FROM `actor`";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);
        return $datosAndInfo;
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
            $sql = "SELECT\n"
            . "iddirector AS 'id director',\n"
            . "nombre,\n"
            . "fechanacimiento AS 'fecha nacimiento',\n"
            . "descripcion,\n"
            . "foto,\n"
            . "estado \n"
            . "FROM director";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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
            $sql = "SELECT\n"
            . "idgenero AS 'id genero',\n"
            . "nombre,\n"
            . "estado\n"
            . "FROM genero";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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

/* --------------------------------- GeneroPelicula --------------------------------- */
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

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
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

/* --------------------------------- Usuario --------------------------------- */
class Usuario {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '181') {
            $sql = "SELECT * FROM usuario";
        }

        $datos = array();
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysqli_num_rows($consulta);
        for ($i = 0; $i < $rows; $i++) {
            $datos[$i] = $consulta->fetch_assoc();
        }

        $info_campos = array();
        $infocampos = $consulta->fetch_fields();
        $i = 0;
        foreach ($infocampos as $valor) {
            $info_campos[$i] = array(
                "table"=>$valor->table,
                "name"=>$valor->name,
                "max_length"=>$valor->max_length,
                "length"=>$valor->length,
                "charsetnr"=>$valor->charsetnr,
                "flags"=>$valor->flags,
                "type"=>$valor->type
            );
            $i++;
        }

        $datosAndInfo = array("datos"=>$datos, "info_campos"=>$info_campos);

        return $datosAndInfo;
    }

}

?>