import state from "./state.js";
import { girar } from "./game.js";

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
// GIRAR
// =======================
const btnGirar = document.getElementById("btn-girar");

let resultadoAtual = null;

if (btnGirar) {
    btnGirar.addEventListener("click", () => {

        if (apostaNum < 10) {
            alert("Aposta mínima é 10!");
            return;
        }

        // desconta saldo
        if (!state.rodada(apostaNum)) {
            fimDeJogo(`<h2>💸 Saldo insuficiente!</h2>`);
            return;
        }


        if (saldoEl) {
            saldoEl.textContent = state.getSaldoAtual();
        }

        state.salvarEstado();

        apostaRodada = apostaNum;

        resultadoAtual = girar();
        window.setResultado(resultadoAtual);
    });
}

// =======================
// FINAL ANIMAÇÃO
// =======================
document.addEventListener("fimAnimacao", () => {

    if (!resultadoAtual) return;

    if (resultadoAtual.ganhou) {
        state.atualizacaoSaldo(true, apostaRodada, resultadoAtual.multiplicador);
    } else {
        state.atualizacaoSaldo(false, apostaRodada, 1)
    }

    state.salvarEstado();

    if (saldoEl) {
        saldoEl.textContent = state.getSaldoAtual();
    }

    if (multEl) {
        multEl.textContent = resultadoAtual.multiplicador + "x";
    }

    if (state.getSaldoAtual() <= 0) {
        fimDeJogo(`
            <h2>💀 Já era pro betinha!</h2>
            <p>Saldo final: ${state.getSaldoAtual()}</p>
        `);
    }

    resultadoAtual = null;
});

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