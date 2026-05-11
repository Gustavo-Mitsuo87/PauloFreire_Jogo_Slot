import state from "./state.js";
import { girar } from "./game.js";

// ===== EFEITOS VISUAIS =====
const efeitoWin = document.getElementById("efeitoWin");
const winTexto = document.getElementById("winTexto");
const jackpot = document.getElementById("jackpot");
const video = document.getElementById("videoJackpot");



function ativarEfeitoMultiplicador(mult) {
    if (mult === 2) { //Quando o multiplicador for 2 ele usa a função efeitoSimples Com o valor da multiplicação
        efeitoSimples(mult);
        impactarReels();
        chuvaConfetti();
        efeitoPulsarSimples()
        
    } 
    else if (mult === 3) { //Quando o multiplicador for 3 ele usa a função efeitoExplosão Com o valor da multiplicação
        efeitoExplosao(mult);
        impactarReels();
        chuvaContinuaConfetti();
        flashTela();
        efeitoPulsarSimples()
        
        
    }  
    else if (mult >= 5) { //Quando o multiplicador for 3ele usa a função efeitoJackpot Com o valor da multiplicação
        efeitoJackpot(mult);
        
    }
}

//Função efeitoSimples, o conteudo do Wintexto será o valor da mult registrado e adicionara um X

//A classe efeitoWin vira display flex assim aparecendo na tela, depois de 800 milisegundos ele some

function efeitoSimples(mult) { 
    winTexto.textContent = mult + "x";
    efeitoWin.style.display = "flex";

    setTimeout(() => {
        efeitoWin.style.display = "none";
    }, 800);
}

//Função efeitoExplosão, o conteudo de winTexto é substituido pelo valor da mult com um "X"

//efeitoWin vira flex para aparecer na tela e adiciona a classe explodir para tem uma animação do texto aparecendo na tela
//A classe explodir esta com uma animação do proprio css que quando adicionada ja é acionado o efeito.

function efeitoExplosao(mult) {
    winTexto.textContent = mult + "x";
    efeitoWin.style.display = "flex";

    winTexto.classList.add("explodir");

    setTimeout(() => {
        efeitoWin.style.display = "none";
        winTexto.classList.remove("explodir");
    }, 2500);
}

//Função efeitoJackpot, o conteudo de winTexto é substituido pelo valor da mult com um "X"

//jackpot vira flex para aparecer na tela, o video vaui para o inicio e da play, fica na tela por 10 segundos/10100Milisegundos.

function efeitoJackpot() {
    jackpot.style.display = "flex";

    video.currentTime = 0;
    video.play();

    setTimeout(() => {
        jackpot.style.display = "none";

        winTexto.textContent = "JACKPOT \n5X";
        flashTela();
        chuvaContinuaConfettiJackpot();

        efeitoWin.style.display = "flex";

        winTexto.classList.add("explodir-jackpot");

        setTimeout(() => {
            efeitoWin.style.display = "none";
            winTexto.classList.remove("explodir")

        }, 7000)
    }, 8000);
}



function chuvaConfetti() {
    confetti({
        particleCount: 300, // Quantidade de confetti
        spread: 360, // Amplitude angular dos confetti
        startVelocity: 70, // Velocidade que ele irá lançar os confetti
        gravity: 0.7, //Gravidade do confetti quanto maior mais rapido quanto menor mais lento
        scalar: 1.5, // Tamanho dos confetti 

        colors: [ // Cor dos confetti
            '#FFD700',
            '#ff0000',
            '#ffffff',
            '#ffae00'
        ],
        shapes: ['circle'], // Formato dos confetti

        origin: { //Origem que eles serão lançados
            x: 0.5,
            y: 0.5
        }

    });
}
function chuvaContinua() {

    const duration = 5000; // Duração da chuva
    const end = Date.now() + duration; // Quando será finalizado a chuva

    const interval = setInterval(() => {

        if (Date.now() > end) { // Se a data atual for maior ele limpa o intervalo e para os confetti
            clearInterval(interval);
            return;
        }

        confetti({ 
            particleCount: 20, // Quntidade de particula de confetti
            spread: 120, // raio dos confetti
            origin: { // Origem dos confeti. Aleatória deixar mais divertido e ele se espalhar pela tela
                x: Math.random(), 
                y: Math.random() - 0.2
            }
        });

    }, 200);
}
function chuvaContinuaConfetti() {
     const duration = 2500;
    const end = Date.now() + duration;

    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 100,
            spread: 360,

            colors: [
            '#FFD700',
            '#ff0000',
            '#ffffff',
            '#ffae00'
        ],


            shapes: ['circle'],
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });

    }, 200);
}
function chuvaContinuaConfettiJackpot() {
     const duration = 4000;
    const end = Date.now() + duration;

    const interval = setInterval(() => {

        if (Date.now() > end) {
            clearInterval(interval);
            return;
        }

        confetti({
            particleCount: 450,
            spread: 360,
            shapes: ['circle'],

            colors: [
            '#FFD700',
            '#ff0000',
            '#ffffff',
            '#ffae00'
        ],


            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });

    }, 200);
}

const flashWin = document.getElementById("flashWin");

function flashTela() {
    flashWin.classList.add("flash-ativo");

    setTimeout(() => {
        flashWin.classList.remove("flash-ativo");
    }, 400);
}

function impactarReels() {
    const reels = document.querySelectorAll(".reel");

    reels.forEach(reel => {
        reel.classList.add("reel-impact");

        setTimeout(() => {
            reel.classList.remove("reel-impact");
        }, 500);
    });
}

const cardMult = document.getElementById("cardMult")

function efeitoPulsarSimples() {
    cardMult.classList.add("efeitoPulsarSimples");

    setTimeout(() =>{
        cardMult.classList.remove("efeitoPulsarSimples");
    }, 2000)

}







// ==== PARTE DE VALORES, MULTIPLICADOR E TIMER ====

// Isso aqui é para entrar no slot
const btnEntrar = document.getElementById("btnEntrar");

if (btnEntrar) {
    btnEntrar.addEventListener("click", (e) => {
        const nome = document.getElementById('name').value;
        const saldo = Number(document.getElementById('saldoInput').value);

        if (!nome || saldo < 10) {
            alert("Preencha corretamente!");
            return;
        }
        state.reset();
        state.defineNome(nome);
        state.saldoJogador(saldo);
        state.salvarEstado();

        // document.querySelector("form").submit(); // banco de dados
        window.location.href = "slot.html";
    });
}

if (window.location.pathname.includes("slot.html")) {
    state.carregarEstado();
}

// ELEMENTOS
const saldoEl = document.getElementById("saldoDisplay");
const apostaEl = document.getElementById("aposta");
const multEl = document.getElementById("multiplicador");

// inicializa saldo
if (saldoEl) {
    saldoEl.textContent = state.getSaldoAtual();
}

// =======================
// APOSTA
// =======================
let apostaNum = 10;
let apostaRodada = 0;

if (apostaEl) {
    apostaEl.textContent = apostaNum;
}

const btnMenos = document.getElementById("btnMenos");
const btnMais = document.getElementById("btnMais");

if (btnMenos) {
    btnMenos.addEventListener("click", () => {
        if (apostaNum - 10 >= 10) {
            apostaNum -= 10;
            apostaEl.textContent = apostaNum;
        }
    });
}

if (btnMais) {
    btnMais.addEventListener("click", () => {
        if (apostaNum + 10 <= state.getSaldoAtual()) {
            apostaNum += 10;
            apostaEl.textContent = apostaNum;
        }
    });
}

// =======================
// Controller
// =======================
window.getAposta = function () { // Expõe funções para o game-controller.js usar
    return apostaNum;
};

window.ativarEfeitoMultiplicador = ativarEfeitoMultiplicador;

window.fimDeJogo = fimDeJogo;


// =======================
// MODAL
// =======================
function fimDeJogo(mensagem, mensagem2) {
    const modal = document.getElementById("modalFim");
    const mensagemEl = document.getElementById("mensagem");
    const mensagemEl2 = document.getElementById("mensagem2");


    if (modal) {
        modal.style.display = "flex";
    }
    if (mensagemEl && mensagemEl2) {
        mensagemEl.innerHTML = mensagem;
        mensagemEl2.innerHTML = mensagem2;
    }
    // bloquear cliques
    document.body.style.pointerEvents = "none";
    modal.style.pointerEvents = "all";
}

const btnVoltar = document.getElementById("btnVoltar"); // só aparece no modal 
if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        state.reset();
        window.location.href = "index.html";
    });
}

// =======================
// TIMER
// =======================
const timer = document.getElementById("timer");
if (timer) {
    let tempo = 180;

    function atualizarTimer() {
        const minutos = Math.floor(tempo / 60);
        const segundos = tempo % 60;

        timer.textContent =
            `${String(minutos).padStart(2, "0")}:${String(segundos).padStart(2, "0")}`;
    }

    atualizarTimer();

    const intervalo = setInterval(() => {
        tempo--;
        atualizarTimer();

        if (tempo <= 0) {
            clearInterval(intervalo);
            fimDeJogo(`<h2>! SEU TEMPO ACABOU !</h2>`
                    ,`<p>Saldo final: ${state.getSaldoAtual()}</p>`);
        }
    }, 1000);
}


document.getElementById("btn-sair").addEventListener("click", () => {
    fimDeJogo(`<h2>VOCÊ DESISTIU SEU BETINHA!!!</h2>`, `<p>Saldo final: ${state.getSaldoAtual()}</p>`);
});