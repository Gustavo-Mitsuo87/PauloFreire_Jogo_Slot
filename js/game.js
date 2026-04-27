//Código feito por Guilherme Oliveira Gomes
//Aqui eu uso 2 tipos de lista apenas para efeitos visuais mais aleatórios

//VOCE QUE ESTÁ LENDO ISSO, AQUI VAI INSTRUÇÕES PARA ADAPTAR AO FRONT:
//Se vc está lendo isso, é porque está precisando adaptar o front com o back, o que imagino que deve ser chato. Mas n se preocupe, estou aqui apenas como um disclaimer. Em geral vc só vai precisar msm adaptar questões de DOM(tipo pegar imagens com id) e etc, porque a lógica em si está boa, e caso tenha dúvida de como adaptar, me chame no zap zap
const imagens_src = [
  "./assets/Estrela.png",
  "./assets/cerejinha.webp",
  "./assets/Icone_da_casa.png",
  "./assets/LemonFoot.webp",
  "./assets/Uvas.webp",
];
const img1 = document.getElementById("reel1");
const img2 = document.getElementById("reel2");
const img3 = document.getElementById("reel3");
const btnRoletar = document.getElementById("btn-girar");
const saida_texto = document.getElementById("saida");

//Essa função serve para decidir o tipo do resultado que terá, e poder manipular a máquina e o usuário a partir disso
function roletar_tipo() {
  let tipo = parseInt(Math.random() * 100);
  //Aqui estou sorteando o tipo de resultado, podendo ser:
  //Perda total(3 imagens diferentes): 55%
  //Quase vitória(2 imagens iguais e 1 diferente): 30%
  //Vitória pequena(3 imagens iguais mas de baixo valor): 10%
  //Vitória média(3 imagens de valor médio): 4%
  //O JACKPOT(3 imagens de grande valor): 1%
  if (tipo < 55) return "Perda total";
  if (tipo < 85) return "Quase-vitória";
  if (tipo < 95) return "Vitória pequena";
  if (tipo < 99) return "Vitória Média";
  return "JACKPOT";
}
//Function que sorteia números aleatórios de um array
function randomChoice(array) {
  return array[randomInt(0, array.length - 1)];
}
//Function que sorteia números aleatórios dentro de um intervalo que eu passo nos parâmetros, considerando os extremos
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Aqui a atribuição feita para das imagens para as vitórias pequenas, médias e jackpots
const img_comuns = ["./assets/cerejinha.webp", "./assets/Uvas.webp"];
const img_medias = ["./assets/Estrela.png", "./assets/LemonFoot.webp"];
const img_jackpot = ["./assets/Icone_da_casa.png"];
btnRoletar.addEventListener("click", () => {
  let num_1;
  let html;

  let tipo_resultado = roletar_tipo();
  switch (tipo_resultado) {
    case "Perda total":
      img1.src = randomChoice(img_comuns);
      img2.src = randomChoice(img_medias);
      img3.src = img_jackpot[0];
      html = `<p>Perda total.</p>`;
      saida_texto.innerHTML = html;
      break;
    //Aqui ele sorteia 2 números aleatórios, mas eu garanto que eles sejam diferentes para que não tenha 3 imagens iguais e o sistema entender que foi uma quase vitória
    case "Quase-vitória":
      num_1 = randomInt(0, 4);
      let num_2 = randomInt(0, 4);
      if (num_2 === num_1) {
        while (num_2 === num_1) {
          num_2 = randomInt(0, 4);
        }
      }
      //Esse embaralhar serve puramente pars deixar o quase vitória mais randômico visualmente para não haver percepções de padrões. O sort. ordena os elementos a partir de valores negativos e positivos, e utilizar o Math.random() nesse sentido serve para falar que ou ele pode alterar a ordem, ou não, sendo isso de forma randômica
      let embaralhar = [num_1, num_1, num_2];
      embaralhar.sort(() => Math.random() - 0.5);
      img1.src = imagens_src[embaralhar[0]];
      img2.src = imagens_src[embaralhar[1]];
      img3.src = imagens_src[embaralhar[2]];
      html = `<p>Quase vitória.</p>`;
      saida_texto.innerHTML = html;
      break;

    case "Vitória pequena":
      num_1 = randomChoice(img_comuns);
      img1.src = num_1;
      img2.src = num_1;
      img3.src = num_1;
      html = `<p>Vitória Pequena.</p>`;
      saida_texto.innerHTML = html;
      break;

    case "Vitória Média":
      num_1 = randomChoice(img_medias);
      img1.src = num_1;
      img2.src = num_1;
      img3.src = num_1;
      html = `<p>Vitória Média.</p>`;
      saida_texto.innerHTML = html;
      break;

    case "JACKPOT":
      img1.src = img_jackpot[0];
      img2.src = img_jackpot[0];
      img3.src = img_jackpot[0];
      html = `<p>JACKPOT!!!!!!.</p>`;
      saida_texto.innerHTML = html;
      break;
  }
});
