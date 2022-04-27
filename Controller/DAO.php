<?php

class Pelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '1') {
            $sql = "SELECT "
            . "pelicula.idpelicula,\t"
            . "pelicula.titulooriginal,\t"
            . "pelicula.titulolatino,\t"
            . "pelicula.foto,\t"
            . "pelicula.lanzamiento,\t"
            . "pelicula.duracion,\t"
            . "pelicula.resena,\t"
            . "pelicula.estado,\t"
            . "tipo.tipo,\t"
            . "pais.nombre AS pais\t"
            . "FROM pelicula\t"
            . "INNER JOIN tipo ON pelicula.idtipo = tipo.idtipo\t"        
            . "INNER JOIN pais ON pelicula.idpais = pais.idpais;";
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
}

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
}

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
}

?>