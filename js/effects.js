const reels = document.querySelectorAll(".reel-track");
const btnGirar = document.getElementById("btn-girar");

reels.forEach((track, i) => {

    const imagensOriginais = track.querySelectorAll(".imagem_reel");

    const altura = 150;
    let posicao = 0;

    imagensOriginais.forEach(img => {
        track.appendChild(img.cloneNode(true));
    });

    const totalImgs = track.querySelectorAll(".imagem_reel").length;


    

    function animar_giro() {

        posicao += 1 + i;

        track.style.transform = `translateY(-${posicao}px)`;

        if (posicao >= altura * (totalImgs / 2)) {
            posicao = 0;
        }

        requestAnimationFrame(animar_giro);
    }
    if (btnGirar) {
    btnGirar.addEventListener("click", () => {
    animar_giro();
    })}
});

