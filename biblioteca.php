<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Biblioteca</title>
    <link rel="stylesheet" href="bl.css">
</head>
<body>
    
        <h2>Biblioteca de Livros</h2>
        <hr>
        <section id="livros-disponiveis">
        <h2>Livros Disponíveis</h2>
        <div class="livros-container">
            <?php
            // Diretório onde os livros estão armazenados
            $dir = 'file-dados';

            // Verifica se o diretório existe
            if (is_dir($dir)) {
                // Abre o diretório e percorre os arquivos
                if ($dh = opendir($dir)) {
                    while (($file = readdir($dh)) !== false) {
                        // Exibe apenas arquivos PDF
                        if ($file != '.' && $file != '..' && pathinfo($file, PATHINFO_EXTENSION) == 'pdf') {
                            $filePath = "$dir/$file"; // Caminho completo do arquivo
                            $fileName = pathinfo($file, PATHINFO_FILENAME); // Nome do arquivo sem extensão
                            ?>

                            <div class="livro-item">
                                <h3><?php echo htmlspecialchars($fileName); ?></h3>
                                <p>Acesse o livro para mais detalhes.</p>
                                <a href="<?php echo htmlspecialchars($filePath); ?>" class="acessar-livro" target="_blank">Acessar Livro</a>
                            </div>

                            <?php
                        }
                    }
                    closedir($dh);
                }
            } else {
                echo "<p>Diretório de livros não encontrado.</p>";
            }
            ?>
        </div>
    </section>
    
</body>
</html>
