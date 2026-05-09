function roletar_tipo() {
  let tipo = Math.floor(Math.random() * 100);

  if (tipo < 30) return "Perda total";
  if (tipo < 60) return "Quase-vitória";
  if (tipo < 80) return "Vitória pequena";
  if (tipo < 95) return "Vitória Média";
  return "JACKPOT";
}

const imagens = [
  "./assets/Estrela.png",
  "./assets/cerejinha.webp",
  "./assets/Icone_da_casa.png",
  "./assets/LemonFoot.webp",
  "./assets/Uvas.webp"
];

function girar() {
  const tipo = roletar_tipo();

  let resultadoImgs = [];

  switch (tipo) {
    case "Perda total":
      resultadoImgs = [imagens[0], imagens[1], imagens[2]];
      return { ganhou: false, multiplicador: 1, imagens: resultadoImgs };

    case "Quase-vitória":
      resultadoImgs = [imagens[1], imagens[1], imagens[2]];
      return { ganhou: false, multiplicador: 1, imagens: resultadoImgs };

    case "Vitória pequena":
      resultadoImgs = [imagens[0], imagens[0], imagens[0]];
      return { ganhou: true, multiplicador: 2, imagens: resultadoImgs };

    case "Vitória Média":
      resultadoImgs = [imagens[3], imagens[3], imagens[3]];
      return { ganhou: true, multiplicador: 3, imagens: resultadoImgs };

    case "JACKPOT":
      resultadoImgs = [imagens[2], imagens[2], imagens[2]];
      return { ganhou: true, multiplicador: 5, imagens: resultadoImgs };
  }
}

export { girar };