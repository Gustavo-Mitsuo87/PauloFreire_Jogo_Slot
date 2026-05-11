// game-controller.js
// Único responsável por ouvir o clique e coordenar os módulos.
// Nenhum outro arquivo deve ter addEventListener no btn-girar.

import state from "./state.js";
import { girar } from "./game.js";

const btnGirar = document.getElementById("btn-girar");
const saldoEl = document.getElementById("saldoDisplay");
const multEl = document.getElementById("multiplicador");

let apostaRodada = 0;
let resultadoAtual = null;

// ─── Único listener do botão ───────────────────────────────────────────────
btnGirar.addEventListener("click", () => {

    // Pega apostaNum do escopo do main.js via função exportada
    const aposta = window.getAposta();

    // 1. Validações — se qualquer uma falhar, nada mais acontece
    if (aposta < 10) {
        alert("Aposta mínima é 10!");
        return;
    }

    if (!state.rodada(aposta)) {
        alert("Aposta acima do saldo!");
        return;
    }

    // 2. Chegou aqui: tudo válido
    if (saldoEl) saldoEl.textContent = state.getSaldoAtual();
    state.salvarEstado();

    apostaRodada = aposta;

    // 3. Gera resultado (game.js) e passa para o effects.js
    resultadoAtual = girar();
    window.setResultado(resultadoAtual);    // effects.js já expõe essa função

    // 4. Dispara a animação (effects.js expõe iniciarAnimacao)
    btnGirar.disabled = true;
    window.iniciarAnimacao();
});

// ─── Reage ao fim da animação (disparado pelo effects.js) ─────────────────
document.addEventListener("fimAnimacao", () => {

    if (!resultadoAtual) return;

    if (resultadoAtual.ganhou) {
        state.atualizacaoSaldo(true, apostaRodada, resultadoAtual.multiplicador);
        window.ativarEfeitoMultiplicador(resultadoAtual.multiplicador); // main.js expõe isso
    } else {
        state.atualizacaoSaldo(false, apostaRodada, 1);
    }

    state.salvarEstado();

    if (saldoEl) saldoEl.textContent = state.getSaldoAtual();
    if (multEl)  multEl.textContent  = resultadoAtual.multiplicador + "x";

    if (state.getSaldoAtual() <= 0) {
        window.fimDeJogo(
            `<h2>! SALDO INSUFICIENTE !</h2>`,
            `<p>Saldo final: ${state.getSaldoAtual()}</p>`
        );
    }

    resultadoAtual = null;
    btnGirar.disabled = false;
});