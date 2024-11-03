let ul = document.querySelector(`ul`)
function openmenu(){
   ul.classList.add(`open`)
}
function closemenu(){
   ul.classList.remove(`open`)
}


document.addEventListener("DOMContentLoaded", function () {
    rendereventodts();

    // Função para renderizar os eventodts com botões de remoção
    function rendereventodts() {
        // Limpa a lista para evitar duplicações ao renderizar
        const eventodtsContainer = document.getElementById("eventodts");
        eventodtsContainer.innerHTML = "";

        // Carrega os eventodts do localStorage
        const eventodts = JSON.parse(localStorage.getItem("eventodts")) || [];

        if (eventodts.length === 0) {
            eventodtsContainer.innerHTML = "<p>Nenhum eventodt publicado.</p>";
        } else {
            // Cria o HTML para cada eventodt com um botão de remoção
            eventodts.forEach((eventodt, index) => {
                const eventodtDiv = document.createElement("div");
                eventodtDiv.classList.add("eventodt");

                eventodtDiv.innerHTML = `
                    <h3>${eventodt.titulo}</h3>
                    <p><strong>Autor:</strong> ${eventodt.autor}</p>
                    <p><strong>Descrição:</strong> ${eventodt.descricao}</p>
                    <small>Publicado em: ${eventodt.date}</small>
                    <p>...</p>
                    ${eventodt.link ? `<p><a href="${eventodt.link}" class="cta-btn" target="_blank">Acessar eventodt</a></p>` : ""}
                    
                    <hr>
                `;

                eventodtsContainer.appendChild(eventodtDiv);
            });
        }
    }

    // Função para remover um eventodt pelo índice
    window.removeeventodt = function (index) {
        let eventodts = JSON.parse(localStorage.getItem("eventodts")) || [];

        // Remove o eventodt do array e atualiza o localStorage
        eventodts.splice(index, 1);
        localStorage.setItem("eventodts", JSON.stringify(eventodts));

        // Renderiza novamente os eventodts atualizados
        rendereventodts();
        alert("eventodt removido com sucesso!");
    };
});
