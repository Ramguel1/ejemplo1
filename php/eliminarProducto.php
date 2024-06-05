<?php
require_once "config.php";
$valido['success'] = array('success' => false, 'mensaje' => "");

if ($_POST) {
    $id = $_POST['id'];
    $sqle = "DELETE FROM tabla WHERE id=$id";
    if ($cx->query($sqle)) {
        $valido['success'] = true;
        $valido['mensaje'] = "Si";
    } else {
        $valido['success'] = false;
        $valido['mensaje'] = "no";
    }
} else {
    $valido['success'] = false;
    $valido['mensaje'] = "ay";
}

echo json_encode($valido);
