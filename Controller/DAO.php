<?php

class Pelicula {
    public static function listar($opc, $campo, $valor) {
        include "../Connection/conexion.php";
        
        if ($opc == '1') {
            $sql = "SELECT * FROM pelicula";
        }
        $consulta = mysqli_query($cnn, $sql);
        $rows = mysql_num_rows($consulta);

        $i = 0;
        $datos = $consulta->fetch_assoc();
        return $datos;
    }
}

?>