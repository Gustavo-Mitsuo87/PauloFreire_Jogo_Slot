const reels = document.querySelectorAll(".reel-track");
const btnGirar = document.getElementById("btn-girar");

let resultadoVisual = null;

window.setResultado = function(resultado) {
    resultadoVisual = resultado;
};

reels.forEach((track, i) => {

    const imagensOriginais = track.querySelectorAll(".imagem_reel");
    const altura = imagensOriginais[0].offsetHeight;

    let posicao = 0;
    let velocidade = 0;

    let animando = false;
    let desacelerando = false;
    let alvo = 0;

    imagensOriginais.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });

    const totalImgs = imagensOriginais.length;
    const limite = altura * totalImgs;

    function animar_giro() {

        if (!animando) return;

        if (!desacelerando) {
            posicao += velocidade;

            if (posicao >= limite) {
                posicao -= limite;
            }
        } else {

            let distancia = alvo - posicao;

            if (distancia < 0) {
                distancia += limite;
            }

            velocidade = distancia * 0.08;

            if (velocidade > 40) velocidade = 40;
            if (velocidade < 0.5) velocidade = 0.5;

            posicao += velocidade;

            if (posicao >= limite) {
                posicao -= limite;
            }

            if (distancia <= 1) {
                posicao = alvo;
                animando = false;
                desacelerando = false;

                if (i === reels.length - 1) {
                    btnGirar.disabled = false;
                    document.dispatchEvent(new Event("fimAnimacao"));
                }
            }
        }

        track.style.transform = `translate3d(0,-${Math.round(posicao)}px,0)`;
        requestAnimationFrame(animar_giro);
    }

    function paradaSuave() {

        let indiceFinal;

        if (resultadoVisual) {
            const src = resultadoVisual.imagens[i];

            const index = Array.from(imagensOriginais)
                .findIndex(img => img.getAttribute("src") === src);

            indiceFinal = index >= 0 ? index : 0;
        } else {
            indiceFinal = Math.floor(Math.random() * totalImgs);
        }

        alvo = indiceFinal * altura + 75;
        desacelerando = true;
    }

    btnGirar.addEventListener("click", () => {

        if (animando) return;

        btnGirar.disabled = true;

        animando = true;
        desacelerando = false;

        velocidade = 30 + (i * 5);

        animar_giro();

        setTimeout(() => {
            paradaSuave();
        }, 1000 + (i * 500));

    });

});