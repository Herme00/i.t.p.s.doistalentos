<?php
// Diretório para salvar os arquivos
$diretorio = 'file-dados/';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Validações básicas
    $titulo = htmlspecialchars($_POST['titulo']);
    $autor = htmlspecialchars($_POST['autor']);
    $descricao = htmlspecialchars($_POST['descricao']);
    $livro = $_FILES['livro'];

    // Verifica se o arquivo é um PDF
    if ($livro['type'] !== 'application/pdf') {
        die('O arquivo deve ser um PDF.');
    }

    // Define o caminho completo do arquivo
    $caminhoArquivo = $diretorio . basename($livro['name']);

    // Move o arquivo para o diretório especificado
    if (move_uploaded_file($livro['tmp_name'], $caminhoArquivo)) {
        // Cria um array com os detalhes do livro
        $livroData = [
            'titulo' => $titulo,
            'autor' => $autor,
            'descricao' => $descricao,
            'caminho' => $caminhoArquivo,
            'data' => date('Y-m-d H:i:s')
        ];

        // Lê o arquivo JSON existente, se houver
        $arquivoJson = 'file-dados/livros.json';
        if (file_exists($arquivoJson)) {
            $livros = json_decode(file_get_contents($arquivoJson), true);
        } else {
            $livros = [];
        }

        // Adiciona o novo livro
        $livros[] = $livroData;

        // Salva os dados atualizados no arquivo JSON
        file_put_contents($arquivoJson, json_encode($livros, JSON_PRETTY_PRINT));

        echo 'Livro publicado com sucesso!';
    } else {
        echo 'Erro ao fazer upload do livro.';
    }
} else {
    echo 'Método de requisição inválido.';
}
?>
