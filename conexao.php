<?php

function conecta()
{
    $host = 'localhost';
    $port = '3306';
    $db   = 'exintegracao';
    $user = 'root';
    $pass = 'root';

    try {
        return new PDO(
            "mysql:host=$host;port=$port;dbname=$db;charset=utf8",
            $user,
            $pass,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
    } catch (PDOException $e) {
        die("Erro na conexão com o banco.");
    }
}

?>