<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../conexao.php';

function listarpessoas()
{
    $con = conecta();
    $res = $con->query('select * from pessoa');
    return $res->fetchAll(PDO::FETCH_ASSOC);

}

$lista = listarpessoas();
echo json_encode($lista);

?>