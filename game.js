const imagens_src = ["/Icones/Estrela.png", "/Icones/cerejinha.webp", "/Icones/Icone_da_casa.png", "/Icones/LemonFoot.webp", "/Icones/Uvas.webp"];
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const img3 = document.getElementById("img3");
const btnRoletar = document.getElementById("btnRoletar")

//Tem que fazer o código de forma que o Daniel consiga fazer a animação
//A animação tem que ser: Sem clicar, as 3 casas ficam girando, ao clicar, vai ser um de cada vez até fechar a trinca

//1. Adicionar probabilidade
//2. Fazer com que o código possa se adaptar á uma animação
//3. ANimação: 3 carroseis de imagem com velocidades diferentes que serão travadas. 1 Roletada: trava o primeiro e depois os outros com delay. 2 Roletada: 

//loop para gerar número
btnRoletar.addEventListener("click", () => {
    let sorteados = [];
    while (sorteados.length < 3) {
        // Esse código usa o Math.random, que sorteia um número entre 0 e 1, e o parseInt 
        let numero_sorteado = parseInt(Math.random() * 5) 
        sorteados.push(numero_sorteado);
        
    }   
    img1.src = imagens_src[sorteados[0]]
    img2.src = imagens_src[sorteados[1]]
    img3.src = imagens_src[sorteados[2]]
})