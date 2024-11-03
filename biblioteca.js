let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
}
function closemenu(){
   ul.classList.remove(`open`)
}


document.addEventListener("DOMContentLoaded", function () {
    renderbookdts();

    // Função para renderizar os livrodts com botões de remoção
    function renderbookdts() {
        // Limpa a lista para evitar duplicações ao renderizar
        const bookdtsContainer = document.getElementById("bookdts");
        bookdtsContainer.innerHTML = "";

        // Carrega os livrodts do localStorage
        const livrodts = JSON.parse(localStorage.getItem("livrodts")) || [];

        if (livrodts.length === 0) {
            bookdtsContainer.innerHTML = "<p>Nenhum livrodt publicado.</p>";
        } else {
            // Cria o HTML para cada livrodt com um botão de remoção
            livrodts.forEach((livrodt, index) => {
                const bookdtDiv = document.createElement("div");
                bookdtDiv.classList.add("livrodt");

                bookdtDiv.innerHTML = `
                <div class="livro-item">
                    <h3>${livrodt.titulo}</h3>
                    <p><strong>Autor:</strong> ${livrodt.autor}</p>
                    <p><strong>Ano:</strong> ${livrodt.ano}</p>
                    <p><strong>Descrição:</strong> ${livrodt.descricao}</p>
                    
                    <p>...</p>
                    ${livrodt.link ? `<p><a href="${livrodt.link}" class="acessar" target="_blank">Acessar livro</a></p><p>...</p>` : ""}
                    
                    
                </div>
                   
                `;

                bookdtsContainer.appendChild(bookdtDiv);
            });
        }
    }

    // Função para remover um livrodt pelo índice
    window.removebookdt = function (index) {
        let livrodts = JSON.parse(localStorage.getItem("livrodts")) || [];

        // Remove o livrodt do array e atualiza o localStorage
        livrodts.splice(index, 1);
        localStorage.setItem("livrodts", JSON.stringify(livrodts));

        // Renderiza novamente os livrodts atualizados
        renderbookdts();
        alert("livrodt removido com sucesso!");
    };
});
