<?php
require_once "config.php";
header('Content-Type: text/html; charset=utf-8');
$valido['success'] = array(
    'success' => false,
    'mensaje' => "",
    'idC' => "",
    'nombre' => "",
    'precio' => "",
    'cantidad' => "",
    'proovedor' => "",
    'unidad' => "",
    'categoria' => ""
);
if ($_POST) {
    $id = $_POST['id'];
    $sql = "SELECT * FROM tabla WHERE id=$id";
    $res = $cx->query($sql);
    $row = $res->fetch_array();
    $valido['success'] = true;
    $valido['mensaje'] = "si";
    $valido['id'] = $row[0];
    $valido['nombre'] = $row[1];
    $valido['precio'] = $row[2];
    $valido['cantidad'] = $row[3];
    $valido['proovedor'] = $row[4];
    $valido['unidad'] = $row[5];
    $valido['categoria'] = $row[6];
} else {
    $valido['success'] = false;
    $valido['mensaje'] = "NO";
}

echo json_encode($valido);
