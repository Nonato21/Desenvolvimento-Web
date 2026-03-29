<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../conexao.php';

function inserepessoa($nome, $tipo, $cpf_cnpj)
{
    $con = conecta();
    $sql = "insert into pessoa(nome, tipo_pessoa, cpf_cnpj) values ('$nome', '$tipo','$cpf_cnpj')";
    return $con->query($sql);
}



$retorno = [];
$nome = $_POST["nome"];
$tipo = $_POST["tipo"] ?? "";
$cpf_cnpj = $_POST["cpf_cnpj"];

$erro = "";

if ($nome == "") {
    $erro = "O campo nome não pode estar vazio";

} else if ($cpf_cnpj == "") {
    $erro = "O CPF/CNPJ não pode estar vazio";
}


function valida_cpf($cpf)
{
    $cpf = preg_replace('/[^0-9]/', '', $cpf);

    if (strlen($cpf) < 11)
        return false;

    if (preg_match('/(\d)\1{10}/', $cpf))
        return false;

    $soma = 0;
    for ($i = 0; $i < 9; $i++) {
        $soma += $cpf[$i] * (10 - $i);
    }

    $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
    if ($resultado != $cpf[9])
        return false;

    $soma = 0;
    for ($i = 0; $i < 10; $i++) {
        $soma += $cpf[$i] * (11 - $i);
    }

    $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
    if ($resultado != $cpf[10])
        return false;

    return true;
}

function valida_cnpj($cnpj)
{
    $cnpj = preg_replace('/[^0-9]/', '', $cnpj);

    if (strlen($cnpj) < 14)
        return false;

    if (preg_match('/(\d)\1{13}/', $cnpj))
        return false;

    $tamanho = strlen($cnpj) - 2;
    $numeros = substr($cnpj, 0, $tamanho);
    $digitos = substr($cnpj, $tamanho);

    $soma = 0;
    $pos = $tamanho - 7;

    for ($i = $tamanho; $i >= 1; $i--) {
        $soma += $numeros[$tamanho - $i] * $pos--;
        if ($pos < 2)
            $pos = 9;
    }

    $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
    if ($resultado != $digitos[0])
        return false;

    $tamanho++;
    $numeros = substr($cnpj, 0, $tamanho);

    $soma = 0;
    $pos = $tamanho - 7;

    for ($i = $tamanho; $i >= 1; $i--) {
        $soma += $numeros[$tamanho - $i] * $pos--;
        if ($pos < 2)
            $pos = 9;
    }

    $resultado = ($soma % 11 < 2) ? 0 : 11 - ($soma % 11);
    if ($resultado != $digitos[1])
        return false;

    return true;
}
if ($erro == "") {
    if ($tipo === "Fisica" && !valida_cpf($cpf_cnpj)) {
        $erro = "CPF inválido";
    } else if ($tipo === "Juridica" && !valida_cnpj($cpf_cnpj)) {
        $erro = "CNPJ inválido";

    }
}


if($erro != ""){
    echo json_encode([
        "status" => "erro",
        "mensagem" => $erro
    ]);
    exit;
}

if (inserepessoa($nome, $tipo, $cpf_cnpj)) {
    $retorno["status"] = "ok";
    $retorno["mensagem"] = "Inserção realizada com sucesso";
} else {
    $retorno["status"] = "erro";
    $retorno["mensagem"] = "Erro ao inserir pessoa";
}

echo json_encode($retorno);
?>