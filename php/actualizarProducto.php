<?php
require_once "config.php";
$valido['success'] = array('success' => false, 'mensaje' => "");

if ($_POST) {
    $id = $_POST['id'];
    $nom = $_POST['nombre'];
    $pre = $_POST['precio'];
    $cant = $_POST['cantidad'];
    $pro = $_POST['proovedor'];
    $uni = $_POST['unidad'];
    $ca = $_POST['categoria'];

    $sql = "UPDATE tabla SET nombre='$nom', precio='$pre', cantidad='$cant', proovedor='$pro', unidad='$uni', categoria='$ca' WHERE id=$id";

    if ($cx->query($sql)) {
        $valido['success'] = true;
        $valido['mensaje'] = "🙃";
    } else {
        $valido['success'] = false;
        $valido['mensaje'] = "No";
    }
} else {
    $valido['success'] = false;
    $valido['mensaje'] = "???mal";
}

echo json_encode($valido);
