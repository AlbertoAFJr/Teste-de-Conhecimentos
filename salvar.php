<?php
// Conexão com o banco de dados
$conn = new mysqli('localhost', 'root', '', 'minha_base_de_dados');

// Verifica se houve erro na conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se é uma solicitação para listar valores
if (isset($_GET['listar'])) {
    $sql = "SELECT id, valor FROM valores";
    $result = $conn->query($sql);

    $valores = [];
    while($row = $result->fetch_assoc()) {
        $valores[] = $row;
    }

    echo json_encode($valores);
    exit();
}

// Salva o valor no banco de dados
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $valor = $_POST['valor'];
    $sql = "INSERT INTO valores (valor) VALUES ('$valor')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

$conn->close();
?>
