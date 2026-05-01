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
            fimDeJogo(`<h2>Acabou seu tempo!</h2>
                    <p>Saldo final: ${state.getSaldoAtual()}</p>`);
        }
    }, 1000);
}

function fimDeJogo(mensagem) {
    const modal = document.getElementById("modalFim");
    const mensagemEl = document.getElementById("mensagem");

    if (modal) {
        modal.style.display = "flex";
    }
    if (mensagemEl) {
        mensagemEl.innerHTML = mensagem;
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
            fimDeJogo(`<h2>💸 Saldo insuficiente!</h2>`);
            return;
        }

        const resultado = girar();

        if (resultado.ganhou) {
            state.atualizacaoSaldo(true, aposta, resultado.multiplicador);
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
                <h2>💀 Já era pro betinha!</h2>
                <p>Saldo final: ${state.getSaldoAtual()}</p>
            `);
        }
    });
}