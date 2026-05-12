<?php
header('Content-Type: text/plain; charset=utf-8');

$conn = new mysqli("localhost", "root", "", "slot", 3307);

if ($conn->connect_error) {
    die("Erro conexão: " . $conn->connect_error);
}

$conn->set_charset("utf8mb4");

$nome = trim($_POST["nome"] ?? "");
$saldoInicial = intval($_POST["saldo_inicial"] ?? 0);
$saldoAtual = intval($_POST["saldo_atual"] ?? 0);

if ($nome === "" || $saldoInicial < 10) {
    die("Dados inválidos");
}

$data = date("Y-m-d H:i:s");

$stmt = $conn->prepare("
    INSERT INTO jogadas
    (nome, saldo_inicial, saldo_atual, data_hora) 
    VALUES (?, ?, ?, ?)
");

if (!$stmt) {
    die("Erro prepare: " . $conn->error);
}

$stmt->bind_param("siis", $nome, $saldoInicial, $saldoAtual, $data);

if ($stmt->execute()) {
    echo "ok";
} else {
    echo "Erro execute: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>