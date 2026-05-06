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
    } 
    else if (mult === 3) { //Quando o multiplicador for 3 ele usa a função efeitoExplosão Com o valor da multiplicação
        efeitoExplosao(mult);
        
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
    }, 1000);
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
        efeitoWin.style.display = "flex";

        winTexto.classList.add("explodir-jackpot");

        setTimeout(() => {
            efeitoWin.style.display = "none";
            winTexto.classList.remove("explodir")

        }, 2000)
    }, 8000);
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


const saldoEl = document.getElementById("saldoDisplay"); // Card da aposta
if (saldoEl) {
    saldoEl.textContent = state.getSaldoAtual();
}

// temporizador
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

const btnMenos = document.getElementById("btnMenos");
const btnMais = document.getElementById("btnMais");
let apostaNum = 10;
const apostaEl = document.getElementById("aposta");

if (apostaEl) {
    apostaEl.textContent = apostaNum;
}

if (btnMenos) {
    btnMenos.addEventListener("click", () => {
        if (apostaNum > 10) {
            apostaNum -= 10;
            if (apostaEl) {
                apostaEl.textContent = apostaNum;
            }
        }
    });
}

if (btnMais) {
    btnMais.addEventListener("click", () => {
        if (apostaNum + 10 <= state.getSaldoAtual()) {
            apostaNum += 10;
            if (apostaEl) {
                apostaEl.textContent = apostaNum;
            }
        }
    });
}

// botão girar aqui na main
const btnGirar = document.getElementById("btn-girar");

if (btnGirar) {
    btnGirar.addEventListener("click", () => {
        const aposta = apostaNum;
        const multEl = document.getElementById("multiplicador");

        // valida aposta mínima
        if (aposta < 10) {
            alert("Aposta mínima é 10!");
            return;
        }

        if (!state.rodada(aposta)) { // valida o saldo e desconta do viciado
            alert ("Aposta acima do saldo");
            return;
        }

        const resultado = girar();

        if (resultado.ganhou) {
            state.atualizacaoSaldo(true, aposta, resultado.multiplicador);

            
            ativarEfeitoMultiplicador(resultado.multiplicador);
        }
        state.salvarEstado();

        if (saldoEl) {
            saldoEl.textContent = state.getSaldoAtual();
        }

        // atualiza multiplicador
        if (multEl) {
            multEl.textContent = resultado.multiplicador + "x";
        }

        // fim de jogo
        if (state.getSaldoAtual() <= 0) {
            fimDeJogo(`
                <h2>! SALDO INSUFICIENTE !</h2>`,
                `<p>Saldo final: ${state.getSaldoAtual()}</p>
            `);
        }
    });
}