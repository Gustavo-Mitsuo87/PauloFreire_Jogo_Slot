const reels = document.querySelectorAll(".reel-track");
const btnGirar = document.getElementById("btn-girar");

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

    const indiceFinal = 2;

    function animar_giro() {

        if (!animando) return;

        if (!desacelerando) {

            posicao += velocidade;

            if (posicao >= limite) {
                posicao -= limite;
            }
        }

        else {

            let distancia = alvo - posicao;

            if (distancia < 0) {
                distancia += limite;
            }

            velocidade = distancia * 0.08;

            if (velocidade > 40) {
                velocidade = 40;
            }

            if (velocidade < 0.5) {
                velocidade = 0.5;
            }

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
                }
            }
        }

        track.style.transform = `translate3d(0,-${Math.round(posicao)}px,0)`;

        requestAnimationFrame(animar_giro);
    }

    function paradaSuave() {

        desacelerando = true;

        alvo = indiceFinal * altura + 75;
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

        }, 10000 + (i * 3000));

    });

});