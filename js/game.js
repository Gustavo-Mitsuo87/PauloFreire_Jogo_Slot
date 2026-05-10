import { randomChoice } from "./utils.js";

function roletar_tipo() {
  let tipo = Math.floor(Math.random() * 100);

  if (tipo < 20) return "Perda total";
  if (tipo < 85) return "Quase-vitória";
  if (tipo < 95) return "Vitória pequena";
  if (tipo < 99) return "Vitória Média";
  return "JACKPOT";
}

const imagens = [
  "./assets/Estrela.png",
  "./assets/cerejinha.webp",
  "./assets/Icone_da_casa.png",
  "./assets/LemonFoot.webp",
  "./assets/Uvas.webp",
];
const imagens_comuns = ["./assets/cerejinha.webp", "./assets/Uvas.webp"];
const imagens_medias = ["./assets/Estrela.png", "./assets/LemonFoot.webp"];
const imagens_quase_vitoria = [
  "./assets/cerejinha.webp",
  "./assets/Uvas.webp",
  "./assets/Estrela.png",
  "./assets/LemonFoot.webp",
];

function girar() {
  const tipo = roletar_tipo();
  console.log(tipo);
  let resultadoImgs = [];
  let num_1;

  switch (tipo) {
    case "Perda total":
      resultadoImgs = [
        randomChoice(imagens_comuns),
        randomChoice(imagens_medias),
        imagens[2],
      ];
      console.log(resultadoImgs);
      return { ganhou: false, multiplicador: 1, imagens: resultadoImgs };

    case "Quase-vitória":
      num_1 = randomChoice(imagens_quase_vitoria);
      resultadoImgs = [num_1, num_1, imagens[2]];
      console.log(resultadoImgs);
      return { ganhou: false, multiplicador: 1, imagens: resultadoImgs };

    case "Vitória pequena":
      num_1 = randomChoice(imagens_comuns);
      resultadoImgs = [num_1, num_1, num_1];
      console.log(resultadoImgs);
      return { ganhou: true, multiplicador: 2, imagens: resultadoImgs };

    case "Vitória Média":
      num_1 = randomChoice(imagens_medias);
      resultadoImgs = [num_1, num_1, num_1];
      console.log(resultadoImgs);
      return { ganhou: true, multiplicador: 3, imagens: resultadoImgs };

    case "JACKPOT":
      resultadoImgs = [imagens[2], imagens[2], imagens[2]];
      console.log(resultadoImgs);
      return { ganhou: true, multiplicador: 5, imagens: resultadoImgs };
  }
}

export { girar };
